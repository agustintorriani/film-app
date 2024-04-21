import { Navigate } from "react-router-dom";
import LogoutPage from "pages/LandingPages/Logout";
import Peliculas from "pages/Peliculas";
// Sections

const routes = [
  {
    name: "Home",
    route: "/home",
    component: <Navigate to="/" />,
    type: "internal",
    hideOnRegistered: false,
  },
  {
    name: "Peliculas",
    route: "/pages/peliculas",
    type: "internal",
    component: <Peliculas />,
    hideOnRegistered: false,
  }
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

    let logOut = {
      name: `Cerrar sesión`,
      route: "/auth/logout",
      type: "internal",
      component: <LogoutPage />,
      hideOnRegistered: false,
      collapse: false,
      dropdown: false,
    };

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
    return [welcomeMsg, logOut, ...routes.filter((r) => !r.hideOnRegistered)];
  }
  return routes;
}

export default routes;
