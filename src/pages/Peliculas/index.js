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
import { Box, Typography } from "@mui/material";
import style from "./style.css";

function Peliculas() {
  const { user } = useContext(UserCtx);
  const { sessionId } = useContext(UserCtx);

  const [peliculas, setPeliculas] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState({});

  const Genero = (id,descripcion) => {return {id: 0, descripcion: ""}};

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + myConfig.themoviedb.token, 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        let urlGeneros = myConfig.themoviedb.url + "/genre/movie/list?language=es";
      try {
        const response = await fetch(urlGeneros, options);
        const data = await response.json();
        setGeneros(data.genres);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);



  useEffect(() => {
            const fetchPorGenero = async () => {
                let urlPeliculasPorGenero = myConfig.themoviedb.url + "/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc&with_genres=10752";
              try {
                const response = await fetch(urlPeliculasPorGenero, options);
                const data = await response.json();
                setPeliculas(data.results);
                console.log("peliss",peliculas);
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            };
            fetchPorGenero();
          }, []);

//   function obtenerPorGenero(genero) {
//     useEffect(() => {
//         const fetchPorGenero = async () => {
//             let urlPeliculasPorGenero = myConfig.themoviedb.url + "/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc&with_genres=12";
//           try {
//             const response = await fetch(urlPeliculasPorGenero, options);
//             const data = await response.json();
//             setPeliculas(data.results);
//           } catch (error) {
//             console.error("Error fetching data:", error);
//           }
//         };
//         fetchPorGenero();
//       }, []);
//   }


  let navbarAction = {
    type: "internal",
    route: "/pages/authentication/sign-in",
    label: "Ingresá",
    color: "info",
  };

  const handleMostrarPorGenero = (event) => {
    setGeneroSeleccionado(Genero(
        event.currentTarget.getAttribute("genre-id"),
        event.currentTarget.getAttribute("genre-id")
    ));

    console.log("generoSeleccionado",generoSeleccionado);
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
                      Géneros
            </Typography>
          </Grid>
          {<Grid container  sx={{
                justifyContent: "center",
            }} >
            {
            generos.map((genero) => (
            <Grid item className="genre-tag" onClick = {handleMostrarPorGenero} genre-id={genero.id} key={genero.id}>
              <Box xs={4}
                sx={{
                height: '3vh',
              }}
               >
                <Box>
                  <MKTypography className="genre-title">
                    {genero.name}
                  </MKTypography>
                </Box>
              </Box>
            </Grid>
            ))}

          </Grid> }

          <Grid container mt={20}>
            <Typography color={"#fff"} fontSize={"30px"}>
                      Bélicas
            </Typography>
          </Grid>
          <Grid container >
            {
            peliculas.map((pelicula) => (
            <Grid item className="one" film-id={pelicula.id} key={pelicula.id} xs={12} lg={3}>
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

export default Peliculas;
