import SignInBasic from "pages/LandingPages/SignIn";
import SignUpBasic from "pages/LandingPages/SignUp";
import { Navigate } from "react-router-dom";
import Peliculas from "pages/Peliculas";
import Estrenos from "pages/Estrenos";
import PeliculasDetalle from "pages/PeliculasDetalle";

const routes = [
  {
    name: "Home",
    route: "/home",
    component: <Navigate to="/" />,
    type: "internal",
    hideOnRegistered: false,
    hideOnNavBar: false
  }  ,
  {
    name: "Estrenos",
    route: "/pages/estrenos",
    type: "internal",
    component: <Estrenos />,
    hideOnRegistered: true,
    hideOnNavBar: false
  },
  {
    name: "Peliculas",
    route: "/pages/peliculas",
    type: "internal",
    component: <Peliculas />,
    hideOnRegistered: true,
    hideOnNavBar: false
  },
  {
    name: "Registrate",
    route: "/pages/authentication/sign-up",
    type: "internal",
    component: <SignUpBasic />,
    hideOnRegistered: true,
    hideOnNavBar: false
  },
  {
    name: 'PeliculasDetalle',
    route: "/pages/peliculasDetalle",
    type: "internal",
    component: <PeliculasDetalle />,
    hideOnRegistered: true,
    hideOnNavBar: true
  },
  {
    name: "SignIn",
    route: "/pages/authentication/sign-in",
    type: "internal",
    component: <SignInBasic />,
    hideOnRegistered: true,
    hideOnNavBar: true
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
    // return [welcomeMsg, logOut, ...routes.filter((r) => !r.hideOnRegistered)];
    return [welcomeMsg, ...routes.filter((r) => !r.hideOnRegistered && !r.hideOnNavBar)];
  }
   return routes;
}

export default routes;
