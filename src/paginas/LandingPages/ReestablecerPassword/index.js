import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import * as authService from "services/auth";


// Images
import bgImage from "assets/images/bg-login.jpg";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';


function ReestablecerPasswordBasic() {
  var bcrypt = require('bcryptjs');

  const [contraseña, setContraseña] = useState("");
  const [repetirContraseña, setRepetirContraseña] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token'); 
  const userId = queryParams.get('userId'); 
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleContraseñaChange(e) {
    let target = e.currentTarget;
    setContraseña(target.value);
  }

  function handleRepetirContraseñaChange(e) {
    let target = e.currentTarget;
    setRepetirContraseña(target.value);
  }

  async function handleSubmit(e) {
    if (contraseña == "" || repetirContraseña == "") {
      toast.error("Debe completar las contraseñas");
      e.preventDefault();
    } else if (contraseña != repetirContraseña) {
      toast.error('Las contraseñas no coinciden');
    } else {
      try {
        const toastId = toast.loading('Actualizando contraseña...');
        await Promise.resolve()
          .then(() => setIsSubmitting(true))
          .then(() => {
            setTimeout(() => {
              authService.resetPassword(contraseña,token,userId).then((response) => {
                toast.dismiss(toastId);
                if (response.status == 200) {
                  toast.success(response.message);
                  setIsSubmitting(false);
                  setTimeout(() => {
                    window.location.href = '/paginas/autenticacion/Ingresar';
                  }, 1000);
                } else {
                  toast.error(response.message);
                  setIsSubmitting(false);
                }    
              });
            }, 1000);
          })
      } catch (err) {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <>
      <div><Toaster position="bottom-center"/></div>
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={6} lg={5} xl={4}>
            <Card aria-disabled={isSubmitting}>
              <MKBox
                variant="gradient"
                bgColor="colorBase"
                borderRadius="lg"
                coloredShadow="colorBase"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" mt={1} >
                  Reestablecer contraseña
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Contraseña"
                      name="contraseña"
                      value={contraseña}
                      onChange={handleContraseñaChange}
                      disabled={isSubmitting}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Repetir Contraseña"
                      name="repetirContraseña"
                      value={repetirContraseña}
                      onChange={handleRepetirContraseñaChange}
                      disabled={isSubmitting}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton
                      variant="contained"
                      color="colorBase"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      fullWidth
                      sx={{ color:"#f7c600!important" }}
                    >
                      Guardar
                    </MKButton>
                  </MKBox>
                  <MKBox>
                    <MKTypography variant="button" color="text">
                      <MKTypography
                        component={Link}
                        to="/paginas/autenticacion/Ingresar"
                        variant="button"
                        color="colorBase"
                        fontWeight="medium"
                        disabled={isSubmitting}
                        textGradient
                      >
                        Volver al inicio
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </form>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      {/* <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox> */}
    </>
  );
}

export default ReestablecerPasswordBasic;
