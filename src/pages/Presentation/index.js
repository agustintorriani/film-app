import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKSocialButton from "components/MKSocialButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import { getRoutes } from "routes";
import footerRoutes from "footer.routes";

// Images
import { useContext, useState, useEffect } from "react";
import { UserCtx } from "contexts/UserContext";

import logoImage from "assets/images/logo.png";
import { myConfig } from '../../config.js'
import styles from "./style.css";
import { Box, Typography } from "@mui/material";


function Presentation() {
  const { user } = useContext(UserCtx);
  const { sessionId } = useContext(UserCtx);
  
  const url = myConfig.themoviedb.url + "/movie/popular?language=es-ES&page=1";
  const [peliculas, setPeliculas] = useState([]);
  const [generos, setGeneros] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + myConfig.themoviedb.token, 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setPeliculas(data.results);
        console.log("pelis",data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  let navbarAction = {
    type: "internal",
    route: "/pages/authentication/sign-in",
    label: "Ingresá",
    color: "info",
  };

  const detallePelicula = (ctrl) => {
    console.log("detallePelicula", ctrl);
  }

  const handleClick = (value) => {
    console.log("value",value);
  };

  return (
    <>
      <DefaultNavbar routes={getRoutes(user)} action={navbarAction} sticky />
      

      <MKBox
        minHeight="250vh"
        width="100%"
        sx={{
          backgroundColor: "#1e6091",
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "top",
        }}
      >
        <Container>
          <Grid container mt={20}>
            <Typography color={"#fff"} fontSize={"30px"}>
                      Mas populares
            </Typography>
          </Grid>
          <Grid container >
            {
            peliculas.map((pelicula) => (
            <Grid item className="one" film-id={pelicula.id} key={pelicula.id} xs={12} lg={3} onClick = {handleClick}>
              <Box xs={4}
                sx={{
                backgroundImage: `url(${myConfig.themoviedb.pathImage + pelicula.poster_path})`,
                backgroundSize: 'cover',
                width: '100%',
                height: '45vh',
              }}
               >

                <Box className="image-overlay">
                  <MKTypography className="title">
                    {pelicula.title}
                  </MKTypography>

                  <Box sx={{alignContent:"center", height:"80%", width:"90%", textAlign:"center"}}>
                    <MKTypography className="overview">
                      {pelicula.overview}
                    </MKTypography>
                  </Box>

                 
                </Box>

              </Box>
            </Grid>
            ))}

          </Grid>
        </Container>
      </MKBox>
      <MKBox>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Presentation;
