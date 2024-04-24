
import { useContext, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Home from "layouts/pages/home";

// Material Kit 2 React routes
import * as definedRoutes from "routes";
import { UserContext } from "contexts/UserContext";
import { UserCtx } from "contexts/UserContext";
// import LogoutPage from "pages/LandingPages/Logout";
import * as authServices from "./services/auth";

export default function App() {
  const { user } = useContext(UserCtx);
  const { pathname } = useLocation();
  const { sessionId } = useContext(UserCtx);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    authServices
      .getSessionId()
      .then((res) => {
      })
      .catch((err) => {
        console.log("err", err);
        //setDisplayingMessage(err.message || err || "Ocurrio un error");
      })
      .finally(() => {
        //redirectOnTimerToggler(5000);
      });
  }, [authServices, sessionId]);


  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.route} />;
      }

      return null;
    });


  return (
    <ThemeProvider theme={theme}>
      <UserContext>
        <CssBaseline />
        <Routes>
          {/* <Route path="/auth/logout" element={<LogoutPage />} /> */}
          <Route path="/home" element={<Home />} />
          {getRoutes(definedRoutes.getRoutes(user))}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </UserContext>
    </ThemeProvider>
  );
}
