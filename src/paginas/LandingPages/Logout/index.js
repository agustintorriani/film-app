import { useContext, useEffect } from "react";
import { UserCtx } from "contexts/UserContext";
import { Navigate } from "react-router-dom";

const LogoutPage = () => {
  const { setUser } = useContext(UserCtx);
  // XD
  useEffect(() => () => setUser(null), []);
  return <Navigate to="/" />;
};

export default LogoutPage;
