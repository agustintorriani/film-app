import IngresarBasic from "paginas/LandingPages/Ingresar";
import RegistrarBasic from "paginas/LandingPages/Registrar";
import { Navigate } from "react-router-dom";
import Estrenos from "paginas/Estrenos";
import PeliculasDetalle from "paginas/PeliculasDetalle";
import Generos from "paginas/Generos";
import Listas from "paginas/Listas";
import OlvideMiContraseñaBasic from "paginas/LandingPages/OlvideMiContraseña";
import ReestablecerPasswordBasic from "paginas/LandingPages/ReestablecerPassword";

const routes = [
  {
    name: "Inicio",
    route: "/inicio",
    type: "internal",
    hideOnRegistered: false,
    hide: true
  },
  {
    name: "Géneros",
    route: "/paginas/generos",
    type: "internal",
    component: (
      <div
        style={{backgroundColor: 'white'}} // Default background color
        onMouseEnter={(e) => { // Change background color on hover
          e.currentTarget.style.backgroundColor = '##000000'; // Light grey color
        }}
        onMouseLeave={(e) => { // Restore default background color on mouse leave
          e.currentTarget.style.backgroundColor = 'white';
        }}
      >
        <Generos />
      </div>
    ),
    hideOnRegistered: true,
    hide: false
  },
  {
    name: "Estrenos",
    route: "/paginas/estrenos",
    type: "internal",
    component: <Estrenos />,
    hideOnRegistered: true,
    hide: false
  },
  {
    name: "Mis Listas",
    route: "/paginas/listas",
    type: "internal",
    component: <Listas />,
    hideOnRegistered: true,
    hide: false
  },
  {
    name: "Registrate",
    route: "/paginas/autenticacion/registrar",
    type: "internal",
    component: <RegistrarBasic />,
    hideOnRegistered: true,
    hide: true
  },
  {
    name: "Reestablecer Password",
    route: "/paginas/autenticacion/reestablecer-password",
    type: "internal",
    component: <ReestablecerPasswordBasic />,
    hideOnRegistered: true,
    hide: true
  },
  {
    name: "Olvide mi Contraseña",
    route: "/paginas/autenticacion/OlvideMiContraseña",
    type: "internal",
    component: <OlvideMiContraseñaBasic />,
    hideOnRegistered: true,
    hide: true
  },
  {
    name: 'PeliculasDetalle',
    route: "/paginas/peliculasDetalle",
    type: "internal",
    component: <PeliculasDetalle />,
    hideOnRegistered: true,
    hide: true
  },
  {
    name: "SignIn",
    route: "/paginas/autenticacion/ingresar",
    type: "internal",
    component: <IngresarBasic />,
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
