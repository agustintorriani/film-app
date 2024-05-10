import { useContext, useState } from "react";

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

// Material Kit 2 React page layout routes
//import routes from "routes";
import CustomModal from "components/CustomModal/CustomModal";

// Images
import bgImage from "assets/images/bg-login.jpg";
import { UserCtx } from "contexts/UserContext";

function IngresarBasic() {
  const { user, logIn } = useContext(UserCtx);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalData, setModalData] = useState({
    open: false,
    title: "",
    text: "",
  });

  function handleValueChange(e) {
    let target = e.currentTarget;

    setLoginData((ld) => ({ ...ld, [target.name]: target.value }));
  }

  function handleModalClose() {
    setModalData({
      open: false,
      title: "",
      text: "",
    });
  }

  async function handleSubmit(e) {
    // e.preventDefault();

    // try {
    //   await Promise.resolve()
    //     .then(() => setIsSubmitting(true))
    //     .then(() => logIn(loginData));
    // } catch (err) {
    //   setModalData({
    //     open: true,
    //     title: "Error en inicio de sesion",
    //     text: err,
    //   });
    // }

    //setIsSubmitting(false);
  }

  return (
    <>
      {user && !isSubmitting && <Navigate to="/" />}
      <CustomModal open={modalData.open} modalData={modalData} handleClose={handleModalClose} />
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
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
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
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Iniciar Sesión
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
                      label="Email o teléfono"
                      name="email"
                      value={loginData.email}
                      onChange={handleValueChange}
                      disabled={isSubmitting}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Contraseña"
                      name="password"
                      value={loginData.password}
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
                      // onClick={handleSubmit}
                      // disabled={isSubmitting}
                      component={Link}
                      to="/paginas/inicio"
                      fullWidth
                    >
                      Iniciar Sesión
                    </MKButton>
                  </MKBox>
                  <MKBox mt={1} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      ¿Primera vez en FilmApp?{" "}
                      <MKTypography
                        component={Link}
                        to="/paginas/autenticacion/registrar"
                        variant="button"
                        color="colorBase"
                        fontWeight="medium"
                        disabled={isSubmitting}
                        textGradient
                      >
                        ¡Registrate!
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

export default IngresarBasic;
