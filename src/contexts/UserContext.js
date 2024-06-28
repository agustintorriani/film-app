import React, { useState, createContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ModalOnAuth from "components/CustomModal/CustomModal";
import AdminAccess from "components/AdminBtnAccess";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import jwtDecode from "jwt-decode";
import * as authServices from "services/auth";
import { any } from "prop-types";
import { myConfig } from "config";

export const UserCtx = createContext({
  user: null,
  sessionId: null,
  setUser: () => {},
  logIn: () => {},
  register: () => {},
  logOut: () => {},
  getSessionId: () => {},
});

export const UserContext = ({ children }) => {
  const location = useLocation();
  let [pathname, setPathname] = useState(location.pathname);
  const [sessionId, setSessionId] = useState(null);
  let navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [modalData, setModalData] = useState({
    open: false,
    title: "",
    text: "",
  });

  function handleClose() {
    setModalData({ open: false, title: "", text: "" });
  }

  async function logIn({ email, password }) {
    
    authServices
      .login(email, password)
      .then(async (res) => {
        if (res.status === 200 && res.data.token) {
          toast.success("Login exitoso")
          let data = await jwtDecode(res.data.token);
          navigate("/paginas/inicio", { replace: true });  
          return { ...data, token: res.data.token };
        }
        if (!res.success) {
          toast.error("Verifique credenciales ingresadas")
        } else if(res.status === 500) {
        toast.error("Error inesperado, intente mas tarde")
        }
      })
      // .then({
      //  setUser(res.data.user);
      // })
      .catch((err) =>
        toast.error("Error en inicio de sesion")
      );
  }

  async function register({ nombre, apellido, email, password }) {
    authServices
      .register(nombre, apellido, email, password)
      .then(async (res) => {
        if (res.email) {
          return setModalData({
            open: true,
            title: res.message || "Usuario creado",
            text: (
              <>
                <Link to={"/paginas/autenticacion/ingresar"} onClick={handleClose}>
                  Inicie sesion
                </Link>{" "}
                con las credenciales proporcionadas {res.email ? `para ${res.email}` : ""}
              </>
            ),
          });
        }

        throw res.message || "Error inesperado, intente mas tarde";
      })
      .catch((err) =>
        setModalData({
          open: true,
          title: "Error en inicio de sesion",
          text: err.message || err,
        })
      );
  }

  async function getSessionId() {
    authServices
    .getSessionId()
    .then(async (res) => {
        setSessionId(res.guest_session_id);
      throw res.message || "Error inesperado, intente mas tarde";
    })
    .catch((err) =>
      setModalData({
        open: true,
        title: "Error en inicio de sesion",
        text: err.message || err,
       }),
    )
  }

  async function logOut() {
    setUser(null);
  }

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  return (

    <UserCtx.Provider
      value={{
        user,
        sessionId,
        logIn,
        logOut,
        register,
        setUser,
        getSessionId,
      }}
    >
      <div><Toaster position="bottom-center"/></div>
      {user?.isAdmin && pathname !== "/admin/inbox" && <AdminAccess />}
      <ModalOnAuth open={modalData.open} modalData={modalData} handleClose={handleClose} />
      {children}
    </UserCtx.Provider>
  );
};

UserContext.propTypes = {
  children: any,
};
