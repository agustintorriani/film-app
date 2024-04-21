import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import * as authServices from "../../services/auth";

const EmailVerificationPage = () => {
  const { token } = useParams();
  const [willRedirect, setWillRedirect] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [displayingMessage, setDisplayingMessage] = useState(
    <>
      Validando token... <CircularProgress />
    </>
  );

  function redirectOnTimerToggler(timerMs) {
    setWillRedirect(true);
    setTimeout(() => {
      setRedirect(true);
    }, timerMs);
  }

  useEffect(() => {
    if (!token) return;

    authServices
      .validateToken(token)
      .then((res) => {
        if (res?.ok) {
          setDisplayingMessage(res.message);
        }
        throw new Error(res.message);
      })
      .catch((err) => {
        setDisplayingMessage(err.message || err || "Ocurrio un error");
      })
      .finally(() => {
        redirectOnTimerToggler(5000);
      });
  }, [authServices, token]);

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <p>{displayingMessage}</p>
      <b>{willRedirect && "Redireccionando..."}</b>
    </>
  );
};

export default EmailVerificationPage;
