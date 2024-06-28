import { useState } from "react";

// react-router-dom components
import { Link, Navigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// @mui icons

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import * as authService from "services/auth";
import { useNavigate } from 'react-router-dom';

// Images
import bgImage from "assets/images/bg-login.jpg";
import toast, { Toaster } from 'react-hot-toast';

function OlvideMiContraseñaBasic() {

  const [email, setEmail] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  let navigate = useNavigate();

  function handleValueChange(e) {
    let target = e.currentTarget;
    setEmail(target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const toastId = toast.loading('Enviando email de recupero de contraseña...');

    try {
      await Promise.resolve()
        .then(() => setIsSubmitting(true))
        .then(() => authService.sendEmailResetPassword(email).then((response) => {
          toast.dismiss(toastId);
          
          if(response.success){
            toast.success(response.message);
            setTimeout(() => {
              navigate("/", { replace: true })
            }, 2000);
          } else {
            toast.error(response.message);
            setIsSubmitting(false);
            }
        })
      )
    } catch (err) {
      setIsSubmitting(false);
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
                  Olvidé mi contraseña
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
                      type="email"
                      label="Email"
                      name="email"
                      value={email}
                      onChange={handleValueChange}
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
                      // component={Link}
                      // to="/paginas/inicio"
                      fullWidth
                      sx={{ color:"#f7c600!important" }}
                    >
                      Enviar
                    </MKButton>
                  </MKBox>
                  <MKBox textAlign="center">
                    <MKTypography variant="button" color="text">
                      * Se te enviará un email con un link para recuperar tu contraseña
                    </MKTypography>
                  </MKBox>
                  <MKBox mt={1} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      <MKTypography
                        component={Link}
                        to="/"
                        variant="button"
                        color="colorBase"
                        fontWeight="medium"
                        disabled={isSubmitting}
                        textGradient
                      >
                        Volver
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

export default OlvideMiContraseñaBasic;
