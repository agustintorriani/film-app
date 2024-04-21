
import { useContext, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";

// Material Kit 2 React routes
import * as definedRoutes from "routes";
import { UserContext } from "contexts/UserContext";
import { UserCtx } from "contexts/UserContext";
import LogoutPage from "pages/LandingPages/Logout";

export default function App() {
  const { user } = useContext(UserCtx);
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

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
          <Route path="/auth/logout" element={<LogoutPage />} />
          <Route path="/presentation" element={<Presentation />} />
          {getRoutes(definedRoutes.getRoutes(user))}
          <Route path="*" element={<Navigate to="/presentation" />} />
        </Routes>
      </UserContext>
    </ThemeProvider>
  );
}
