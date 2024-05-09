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
import { Box, Button, Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { CircularProgress } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { Rating } from 'react-simple-star-rating'
import styles from './style.css';
import logo from '../../assets/images/userDefault.png';
import { Favorite } from "@mui/icons-material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import toast, { Toaster } from 'react-hot-toast';

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
      color: "colorBase",
    };

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + myConfig.themoviedb.token, 
      }
    };

      const handleAddToFavorites = () => {
        let btn = document.getElementById("btnAddFav");
        if(btn.classList.contains("favorito")) {
            document.getElementById("btnAddFav").classList.remove("favorito");
            toast.success("Se ha removido de favoritos")
          } else {
            document.getElementById("btnAddFav").classList.add("favorito");
            toast.success("Se ha agregado a favoritos")
        }
      }

      const handleAddToWatchlist = () => {
        let btn = document.getElementById("btnAddPending");
        if(btn.classList.contains("pendiente")) {
            document.getElementById("btnAddPending").classList.remove("pendiente");
            toast.success("Se ha removido de pendientes")
          } else {
            document.getElementById("btnAddPending").classList.add("pendiente");
            toast.success("Se ha agregado a pendientes")
        }
      }


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
    <div><Toaster position="bottom-center"/></div>
      <DefaultNavbar routes={getRoutes(user)} action={navbarAction} sticky />
      <MKBox
        width="100%"
        sx={{
          backgroundColor: "#E1F0DA",
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
                                <Box mt={2} display="flex"  justifyContent="center">
                                  <Button id="btnAddFav" sx={{marginRight:"10px"}} variant="contained" color="colorBase" onClick={handleAddToFavorites}>
                                    <Favorite /> Agregar a Favoritos
                                  </Button>
                                  <Button id="btnAddPending" variant="contained" color="colorBase" onClick={handleAddToWatchlist}>
                                    <BookmarkIcon />
                                    Agregar a Pendientes
                                  </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box color={"#708f5d"}>
                                    <Typography variant="h2" color={"#708f5d"} gutterBottom>
                                        {pelicula.title}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {pelicula.description}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Lenguaje Original: {pelicula.language}
                                        <ReactCountryFlag countryCode={pelicula.origin_country[0]} svg />
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
                                <Typography sx={{color: "#708f5d"}}  gutterBottom>
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
                                      <Typography sx={{color: "#708f5d;"}} gutterBottom>
                                        {comentario.author_details.avatar_path ? (
                                          <img className="author-photo" src={myConfig.themoviedb.pathImage + comentario.author_details.avatar_path} alt={comentario.author_name} />
                                        ) : (
                                          <img
                                            className="author-photo"
                                            src={logo}
                                          />
                                        )}
                                        <b>{comentario.author}</b>
                                      </Typography>
                                      <Typography className="comentario" sx={{color: "#708f5d;"}} gutterBottom>
                                        {comentario.content}
                                      </Typography>
                                    </Box>
                                  ))
                                ) : (
                                  <Typography sx={{color: "#708f5d;"}} gutterBottom>
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
