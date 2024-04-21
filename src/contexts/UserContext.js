import React, { useState, createContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ModalOnAuth from "components/CustomModal/CustomModal";
import AdminAccess from "components/AdminBtnAccess";

import jwtDecode from "jwt-decode";
import * as authServices from "services/auth";
import { any } from "prop-types";

export const UserCtx = createContext({
  user: null,
  setUser: () => {},
  logIn: () => {},
  register: () => {},
  logOut: () => {},
});

export const UserContext = ({ children }) => {
  const location = useLocation();
  let [pathname, setPathname] = useState(location.pathname);

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
        if (res.status === 200 && res.token) {
          let data = await jwtDecode(res.token);
          return { ...data, token: res.token };
        }
        if (res) {
          throw "Verifique credenciales ingresadas";
        }

        throw "Error inesperado, intente mas tarde";
      })
      .then(setUser)
      .catch((err) =>
        setModalData({
          open: true,
          title: "Error en inicio de sesion",
          text: err.message || err,
        })
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
                <Link to={"/pages/authentication/sign-in"} onClick={handleClose}>
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
        logIn,
        logOut,
        register,
        setUser,
      }}
    >
      {user?.isAdmin && pathname !== "/admin/inbox" && <AdminAccess />}
      <ModalOnAuth open={modalData.open} modalData={modalData} handleClose={handleClose} />
      {children}
    </UserCtx.Provider>
  );
};

UserContext.propTypes = {
  children: any,
};
