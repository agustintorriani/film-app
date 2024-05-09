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
import { useLocation } from 'react-router-dom';
import { CircularProgress } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { Rating } from 'react-simple-star-rating'
import styles from './style.css';

function PeliculasDetalle() {
    const { user } = useContext(UserCtx);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const filmId = queryParams.get('id'); // Retrieve the value of a specific query parameter
    const url = myConfig.themoviedb.url + "/movie/"+ filmId +"?language=es-ES";
    const [pelicula, setPelicula] = useState();
    const [comentarios, setComentarios] = useState([]);

    let navbarAction = {
      type: "internal",
      route: "/pages/authentication/sign-in",
      label: "Cerrar Sesión",
      color: "info",
    };

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + myConfig.themoviedb.token, 
      }
    };
  
    useEffect(() => {
      const fetchDataPelicula = async () => {
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          let [year, month, day] =  data.release_date.split('-');
          data.release_date = `${day}/${month}/${year}`;
          setPelicula(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const fetchComentarios = async () => {
        try {
          let UrlComments = myConfig.themoviedb.url + "/movie/"+ filmId + "/reviews?language=es-ES&page=1";
          const response = await fetch(UrlComments, options);
          const data = await response.json();
          setComentarios(data.results);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchDataPelicula();
      fetchComentarios();
    }, []);
  
  
  return (
    <>
      <DefaultNavbar routes={getRoutes(user)} action={navbarAction} sticky />
      <MKBox
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
          <Grid container mt={15}>
                    {pelicula ? (
                        <>
                            <Grid item xs={12} md={6}>
                                <Box display="flex" justifyContent="center">
                                    <img
                                        src={myConfig.themoviedb.pathImage + pelicula.poster_path}
                                        alt={pelicula.title}
                                        style={{ width: "auto", height: "70vh" }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box color={"#fff"}>
                                    <Typography variant="h2" color={"#fff"} gutterBottom>
                                        {pelicula.title}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {pelicula.description}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Lenguaje Original: {pelicula.language}
                                        <ReactCountryFlag countryCode="US" svg />
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Géneros: 
                                            {
                                                pelicula.genres.map((genre, index) => (
                                                    <span className="genero-title" key={index}>{genre.name}</span>
                                                ))
                                            }
                                    </Typography>
                                        
                                    <Typography variant="body1" gutterBottom>
                                        Fecha estreno: {pelicula.release_date}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Clasificación: {pelicula.adult ? "+18" : "ATP"}
                                    </Typography>
                                    Rating: 
                                    <Rating readonly="true"
                                    initialValue={
                                      (Number(pelicula.vote_average/2)).toFixed(2)
                                      }
                                        size={50}
                                        transition
                                        allowFraction
                                      />({ Number(pelicula.vote_average/2).toFixed(2)  })
                                       <Box fontSize={"0.8em"}>
                                        <b>Sinopsis:</b> {pelicula.overview}
                                      </Box>                                           
                                </Box>
                            </Grid>
                            <Grid mt={10} item>
                                <Typography sx={{color: "#fff"}}  gutterBottom>
                                        Comentarios:
                                </Typography>
                                {comentarios.length > 0 ? (
                                  comentarios.map((comentario, index) => (
                                    <Box className="comentario-container"
                                      key={index}
                                      sx={{
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        padding: "10px",
                                        marginBottom: "10px",
                                      }}
                                    >
                                      <Typography sx={{color: "#fff;"}} gutterBottom>
                                        <img className="author-photo" src={myConfig.themoviedb.pathImage + comentario.author_details.avatar_path} alt={comentario.author_name} />
                                        <b>{comentario.author}</b>
                                      </Typography>
                                      <Typography className="comentario" gutterBottom>
                                        {comentario.content}
                                      </Typography>
                                    </Box>
                                  ))
                                ) : (
                                  <Typography sx={{color: "#fff;"}} gutterBottom>
                                    No hay comentarios disponibles.
                                  </Typography>
                                )}
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center" p={4}>
                                <CircularProgress />
                            </Box>
                        </Grid>
                    )}
                </Grid>
        </Container>
        </MKBox>

      <MKBox>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default PeliculasDetalle;
