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
import { Box, CircularProgress, Typography } from "@mui/material";
import style from "./style.css";
import { useNavigate } from "react-router-dom";
import HorizontalScroll from "react-scroll-horizontal"
import dataPelis from '../../assets/dataPelis.json';
import { string } from "prop-types";


function Listas() {
  const { user } = useContext(UserCtx);
  const { sessionId } = useContext(UserCtx);

  const [peliculas, setPeliculas] = useState(dataPelis.results);
  const [generos, setGeneros] = useState([{id: 99997, name:"Vistos recientemente"},{id: 99999, name:"Favoritos"},{id: 99998, name:"Pendientes"}]);
  const [generosString, setGenerosString] = useState("");
  let navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(true);

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
        let genStr = "";
        generos.forEach(element => {
           genStr += element.id + "|";
         });
         genStr = genStr.slice(0, -1);
         setGenerosString(genStr);
        // console.log("gen",genStr);
        // const response = await fetch(urlGeneros, options);
        // const data = await response.json();
        
        // setGeneros(data.genres);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [generosString]);



  useEffect(() => {
    const fetchPorGenero = async () => {
        // let urlPeliculasPorGenero = myConfig.themoviedb.url + "discover/movie?include_adult=false&include_video=false&language=es-ES&page="+i+"&sort_by=popularity.desc&with_genres="+generosString;
        // console.log("urlgen",urlPeliculasPorGenero);
        try {
          // const response = await fetch(urlPeliculasPorGenero, options);
          // const data = await response.json();
          // setPeliculas(dataPelis.results);
          console.log("datapelis",peliculas);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };
    fetchPorGenero();
  }, []);


  let navbarAction = {
    type: "internal",
    route: "/",
    label: "Cerrar Sesión",
    color: "colorBase",
  };

  const handleClickFilm = (event) => {
    let url = "/paginas/peliculasDetalle?id=" + event.currentTarget.getAttribute("film-id");
    navigate(url, { replace: true });
  };

  let nom = "";

  return (
    <>
      <DefaultNavbar routes={getRoutes(user)} action={navbarAction} sticky />

      <MKBox
        minHeight="150vh"
        width="100%"
        sx={{
          backgroundColor: "#141414",
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "top",
        }}
      >
        <Container sx={{paddingTop:"3em"}}>
           {
           isLoading == true ? (
            <Grid item xs={12} lg={12} >
                <Box xs={4} display="flex" textAlign={"center"} justifyContent="center" p={4}>
                    <CircularProgress style={{ color:"#f7c600" }}/>
                </Box>
            </Grid>
          ) : ( generos.filter((item) => item.id == 99999 || item.id == 99998 || item.id == 99997).map((genero) => (
            <Box key={genero.id}>
              <Typography variant="h3" sx={{ marginTop: 4, marginBottom: 2, color:"#f7c600" }}>
                {/* {genero.name} ({genero.id}) Resultados: { peliculas.filter((pelicula) => pelicula.genre_ids.includes(genero.id)).length} */}
                {genero.name} ({ peliculas.filter((pelicula) => pelicula.genre_ids.includes(genero.id)).length})
              </Typography>
              <HorizontalScroll className="scroll-container">
                { peliculas.filter((pelicula) => pelicula.genre_ids.includes(genero.id))
                  .map((pelicula) => (
                    <Grid item className="one" film-id={pelicula.id} key={pelicula.id} xs={12} lg={3} onClick={handleClickFilm}>
                        <Box xs={4}
                          sx={{
                          backgroundImage: `url(${myConfig.themoviedb.pathImage + pelicula.poster_path})`,
                          backgroundSize: 'cover',
                          backgroundPosition: "center",
                          width: '350px',
                          height: '100%',
                          }}
                        >
                        <Box className="image-overlay">
                          <MKTypography className="title">
                            {pelicula.title}
                          </MKTypography>

                          <Box sx={{alignContent:"center", height:"80%", width:"90%", textAlign:"center"}}>
                              {pelicula.overview.length > 0 ? (
                                <MKTypography  sx={{color:"#fff"}} className="overview">
                                  {pelicula.overview}
                                </MKTypography>
                                ) : (
                                <MKTypography sx={{color:"#fff"}} className="overview">
                                  Sin descripción
                                </MKTypography>
                                )}
                                </Box>
                              </Box>
                        </Box>
                      </Grid>
                  ))}
              </HorizontalScroll>
            </Box>
          )))}

        </Container>
      </MKBox>


      <MKBox>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Listas;
