import { Link, Navigate } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Material Kit 2 React example components
//import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// import SimpleFooter from "examples/Footers/SimpleFooter";

// Images
 import bgImage from "assets/images/bg-login.jpg";
import { useContext, useState } from "react";
import { UserCtx } from "contexts/UserContext";
import CustomModal from "components/CustomModal/CustomModal";
import toast, { Toaster } from 'react-hot-toast';
import * as authService from "services/auth";

function RegistrarBasic() {
  const navigate = useNavigate();
  const { user, register } = useContext(UserCtx);
  const [modalData, setModalData] = useState({
    open: false,
    title: "",
    text: "",
  });

  const [registrationData, setRegistrationData] = useState({
    email: "",
    usuario: "",
    password: "",
    repeatPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleModalClose() {
    setModalData({
      open: false,
      title: "",
      text: "",
    });
  }

  function onChangeHandler(e) {
    let target = e.currentTarget;
    setRegistrationData((rd) => ({ ...rd, [target.name]: target.value }));
  }

  async function handleSubmit(e) {
    if (registrationData.password != registrationData.repeatPassword) {
      toast.error("Las contraseñas no coinciden");
      e.preventDefault();
    } else if (registrationData.email == "" || registrationData.password == "" || registrationData.repeatPassword == "" || registrationData.usuario == "") {
      toast.error('Faltan campos obligatorios');
    } else {
        e.preventDefault();
        const toastId = toast.loading('Registrando usuario...');

        try {
          await Promise.resolve()
            .then(() => setIsSubmitting(true))
            .then(() => {
                authService.register(registrationData).then((response) => {
                    setTimeout(() => {
                      toast.dismiss(toastId);
                      if (response.success) {
                        toast.success(response.message);
                          setTimeout(() => {
                            navigate("/paginas/inicio");
                          }, 2000);
                      } else {
                        toast.error(response.message);
                        setIsSubmitting(false);
                        }
                    }, 2000);
                    
                });
                
            });
        } catch (err) {
          toast.error('Ups, ocurrió un error en el registro');
          setIsSubmitting(false);
        }
    }
  }

  return (
    <>
      <div><Toaster position="bottom-center"/></div>
      {user && <Navigate to="/" />}
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
            <Card>
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
                  Registrate
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" onSubmit={handleSubmit}>
                  <MKBox mb={2}>
                    <MKInput required
                      label="Usuario"
                      name="usuario"
                      value={registrationData.usuario}
                      onChange={onChangeHandler}
                      disabled={isSubmitting}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput required
                      type="email"
                      value={registrationData.email}
                      onChange={onChangeHandler}
                      disabled={isSubmitting}
                      label="Email"
                      name="email"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput required
                      type="password"
                      value={registrationData.password}
                      onChange={onChangeHandler}
                      disabled={isSubmitting}
                      label="Contraseña"
                      name="password"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput required
                      type="password"
                      value={registrationData.repeatPassword}
                      onChange={onChangeHandler}
                      disabled={isSubmitting}
                      label="Repetir Contraseña"
                      name="repeatPassword"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton
                      type="submit"
                      variant="contained"
                      color="colorBase"
                      coloredShadow="colorBase"
                      fullWidth
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      sx={{ color:"#f7c600!important" }}
                    >
                      Registrarme
                    </MKButton>
                  </MKBox>
                  <MKBox mt={1} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      ¿Ya estás registrado?{" "}
                      <MKTypography
                        component={Link}
                        to="/paginas/autenticacion/ingresar"
                        variant="button"
                        color="colorBase"
                        fontWeight="medium"
                        disabled={isSubmitting}
                        textGradient
                      >
                        ¡Ingresá!
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>

      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        {/* <SimpleFooter light /> */}
      </MKBox>
    </>
  );
}

export default RegistrarBasic;
