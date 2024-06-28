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
import { Favorite, PeopleOutline } from "@mui/icons-material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import toast, { Toaster } from 'react-hot-toast';
import * as userListServices from "services/userList";



function PeliculasDetalle() {
    const { user } = useContext(UserCtx);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const filmId = queryParams.get('id'); // Retrieve the value of a specific query parameter
    const url = myConfig.themoviedb.url + "/movie/"+ filmId +"?language=es-ES";
    const [pelicula, setPelicula] = useState();
    const [comentarios, setComentarios] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    let navbarAction = {
      type: "internal",
      route: "/",
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

    

      
    async function handleAddToFavorites(e) {
      e.preventDefault();
      try {
        await Promise.resolve()
          .then(() => setIsSubmitting(true))
          .then(() => {
            let registro = {
              userId: window.sessionStorage.getItem("userId"),
              listId: 1,
              film: {
                id: pelicula.id,
                title: pelicula.title,
                poster_path: pelicula.poster_path,
                overview: pelicula.overview,
              }              
            }            
            
            userListServices.addToList(registro)
          } )
          .then((res) => {
            let btn = document.getElementById("btnAddFav");
            if(btn.classList.contains("favorito")) {
                  btnAdd(btn,false,"favorito");
                toast.success("Se ha removido de favoritos")
              } else {
                  btnAdd(btn,true,"favorito");
                toast.success("Se ha agregado a favoritos")
            }
          })
      } catch (err) {
        toast.success("Se ha producido un error al agregar a favoritos") 
      }
      setIsSubmitting(false);
    }

    async function handleAddToWatchlist(e) {
      e.preventDefault();
      try {
        await Promise.resolve()
          .then(() => setIsSubmitting(true))
          .then(() => {
            let registro = {
              userId: window.sessionStorage.getItem("userId"),
              listId: 2,
              film: {
                id: pelicula.id,
                title: pelicula.title,
                poster_path: pelicula.poster_path,
                overview: pelicula.overview,
              }              
            }            
            
            userListServices.addToList(registro)
          } )
          .then((res) => {
            let btn = document.getElementById("btnAddPending");
              if(btn.classList.contains("pendiente")) {
                  btnAdd(btn,false,"pendiente");
                  toast.success("Se ha removido de pendientes")
                } else {
                  btnAdd(btn,true,"pendiente");
                  toast.success("Se ha agregado a pendientes")
              }
          })
      } catch (err) {
        toast.success("Se ha producido un error al agregar a favoritos") 
      }
      setIsSubmitting(false);
    }


    async function handleAddToViews(e) {
      e.preventDefault();
      try {
        await Promise.resolve()
          .then(() => setIsSubmitting(true))
          .then(() => {
            let registro = {
              userId: window.sessionStorage.getItem("userId"),
              listId: 3,
              film: {
                id: pelicula.id,
                title: pelicula.title,
                poster_path: pelicula.poster_path,
                overview: pelicula.overview,
              }              
            }            
            
            userListServices.addToList(registro)
          } )
          .then((res) => {
            let btn = document.getElementById("btnAddViews");
            if(btn.classList.contains("visto")) {
                btnAdd(btn,false,"visto");
                toast.success("Se ha removido de vistos")
              } else {
                btnAdd(btn,true,"visto");
                toast.success("Se ha agregado a vistos")
            }
          })
      } catch (err) {
        toast.success("Se ha producido un error al agregar a favoritos") 
      }
      setIsSubmitting(false);
    }


    function btnAdd(btn, option, clase){
        if(option){
          btn.classList.add(clase);
        } else {
          btn.classList.remove(clase);
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

      const obtenerListasPorPelicula = async () => {
        try {
          await userListServices.getListByFilm(window.sessionStorage.getItem("userId"), filmId).then((res) => {
            if (res.some(obj => obj.listId === 1)) {
                btnAdd(document.getElementById("btnAddFav"),true,"favorito");
            }
  
            if (res.some(obj => obj.listId === 2)) {
              btnAdd(document.getElementById("btnAddPending"),true,"pendiente");
            }
  
            if (res.some(obj => obj.listId === 3)) {
              btnAdd(document.getElementById("btnAddViews"),true,"visto");
            }
          });
        } catch (error) {
          console.log("ocurrio un error",error);
        }
      }

      fetchDataPelicula();
      fetchComentarios();
      obtenerListasPorPelicula();
    }, []);
  
  
  return (
    <>
    <div><Toaster position="bottom-center"/></div>
      <DefaultNavbar routes={getRoutes(user)} action={navbarAction} sticky />
      <MKBox
        width="100%"
        sx={{
          backgroundColor: "#141414",
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "flex",
          placeItems: "top",
        }}
      >
        <Container>
          <Grid container mt={15}>
                    {pelicula ? (
                        <>
                            <Grid item xs={12} md={7}>
                                <Box display="flex" justifyContent="center">
                                    <img
                                        src={myConfig.themoviedb.pathImage + pelicula.poster_path}
                                        alt={pelicula.title}
                                        style={{ width: "auto", height: "60vh" }}
                                    />
                                </Box>
                                <Box  mt={2} display="flex" justifyContent="center">
                                  <Button id="btnAddFav" sx={{marginRight:"10px"}} variant="contained" color="colorBase" onClick={handleAddToFavorites}>
                                    <Favorite /> Agregar a Favoritos
                                  </Button>
                                  <Button  id="btnAddPending" sx={{marginRight:"10px"}} variant="contained" color="colorBase" onClick={handleAddToWatchlist}>
                                    <BookmarkIcon />
                                    Agregar a Pendientes
                                  </Button>
                                  <Button  id="btnAddViews" variant="contained" color="colorBase" onClick={handleAddToViews}>
                                    <BookmarkIcon />
                                    Agregar a Vistos
                                  </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Box color={"#f7c600"}>
                                    <Typography variant="h2" color={"#f7c600"} gutterBottom>
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
                                <Typography sx={{color: "#f7c600"}}  gutterBottom>
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
                                      <Typography sx={{color: "#f7c600;"}} gutterBottom>
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
                                      <Typography className="comentario" sx={{color: "#f7c600;"}} gutterBottom>
                                        {comentario.content}
                                      </Typography>
                                    </Box>
                                  ))
                                ) : (
                                  <Typography sx={{color: "#f7c600;"}} gutterBottom>
                                    No hay comentarios disponibles.
                                  </Typography>
                                )}
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center" p={4}>
                                <CircularProgress style={{ color:"#f7c600" }}/>
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
