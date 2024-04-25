import SignInBasic from "pages/LandingPages/SignIn";
import SignUpBasic from "pages/LandingPages/SignUp";
import { Navigate } from "react-router-dom";
import Estrenos from "pages/Estrenos";
import PeliculasDetalle from "pages/PeliculasDetalle";
import Generos from "pages/Generos";

const routes = [
  {
    name: "Home",
    route: "/home",
    type: "internal",
    hideOnRegistered: false,
    hide: true
  },
  {
    name: "Géneros",
    route: "/pages/generos",
    type: "internal",
    component: <Generos />,
    hideOnRegistered: true,
    hide: false
  },
  {
    name: "Estrenos",
    route: "/pages/estrenos",
    type: "internal",
    component: <Estrenos />,
    hideOnRegistered: true,
    hide: false
  },
  {
    name: "Registrate",
    route: "/pages/authentication/sign-up",
    type: "internal",
    component: <SignUpBasic />,
    hideOnRegistered: true,
    hide: false
  },
  {
    name: 'PeliculasDetalle',
    route: "/pages/peliculasDetalle",
    type: "internal",
    component: <PeliculasDetalle />,
    hideOnRegistered: true,
    hide: true
  },
  {
    name: "SignIn",
    route: "/pages/authentication/sign-in",
    type: "internal",
    component: <SignInBasic />,
    hideOnRegistered: true,
    hide: true
  },
];

export function getRoutes(user) {
  if (user) {
    let welcomeMsg = {
      name: `Hola ${user.name}!`,
      route: "#",
      type: "internal",
      component: null,
      hideOnRegistered: false,
      collapse: false,
      dropdown: false,
    };

    // let logOut = {
    //   name: `Cerrar sesión`,
    //   route: "/auth/logout",
    //   type: "internal",
    //   component: <LogoutPage />,
    //   hideOnRegistered: false,
    //   collapse: false,
    //   dropdown: false,
    // };

    if (user.accountVerified && user.isAdmin) {
      welcomeMsg.name = (
        <>
          {welcomeMsg.name} <b>ADMIN</b>
        </>
      );
    }

    if (!user.accountVerified) {
      welcomeMsg.name = (
        <>
          {welcomeMsg.name}{" "}
          <sub>
            <sup>
              <b>Validacion email pendiente</b>
            </sup>
          </sub>
        </>
      );
    }
    // si hay usuario, omitiremos algunas opciones como las de registro
    //return [welcomeMsg, logOut, ...routes.filter((r) => !r.hideOnRegistered)];
    return [welcomeMsg, ...routes.filter((r) => !r.hideOnRegistered)];
  }
   return routes;
}

export default routes;
