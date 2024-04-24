import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import { getRoutes } from "routes";
import footerRoutes from "footer.routes";
import { useNavigate } from 'react-router-dom';

// Images
import { useContext, useState, useEffect } from "react";
import { UserCtx } from "contexts/UserContext";

import logoImage from "assets/images/logo.png";
import { myConfig } from '../../config.js'
import styles from "./style.css";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import posterImg from "assets/images/posterTemplate.png";

function Home() {
  let navigate = useNavigate();
  const { user } = useContext(UserCtx);
  
  const url = myConfig.themoviedb.url + "movie/popular?language=es-ES&page=1";
  const [searchValue, setSearchValue] = useState("");
  const [title, setTitle] = useState("Top 20 mas populares");
  const [peliculas, setPeliculas] = useState([]);
  const [peliculasBuscador, setPeliculasBuscador] = useState([]);
  const [peliculasAMostrar, setPeliculasAMostrar] = useState([]);

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
        console.log("fetching loading...",url);
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("resultados de populares",data);
        setPeliculasAMostrar(data.results);
        console.log("peliculasAMostrar", peliculasAMostrar);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const fetchBuscador = async () => {
      try {
        let urlBuscador = myConfig.themoviedb.url + "search/multi?query="+ searchValue +"&include_adult=false&language=es-ES&page=1";
        console.log("fetching busqueda...",urlBuscador);
        const response = await fetch(urlBuscador, options);
        const data = await response.json();

        const countResults = data.results.length;
        let countKnownFor = 0;

        data.results.forEach((result) => {
          if (result.known_for) {
            countKnownFor += result.known_for.length;
          }
        });

        setTitle("Resultados de la busqueda (" + countKnownFor + ")");
        setPeliculasBuscador(data.results);
        cambiarPeliculasAMostrar(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if(searchValue.length > 0){
      fetchBuscador();
    }
  }, [searchValue]);

  useEffect(() => {
  }, [peliculasAMostrar]); // Este useEffect se ejecutará cada vez que peliculasAMostrar cambie

  useEffect(() => {
    setPeliculasAMostrar(peliculasBuscador);
  }, [peliculasBuscador]); // Este useEffect se ejecutará cada vez que peliculasAMostrar cambie

  const handleClickFilm = (event) => {
    let url = "/pages/peliculasDetalle?id=" + event.currentTarget.getAttribute("film-id");
    navigate(url, { replace: true });
  };

  const cambiarPeliculasAMostrar = (results) => {
      if(searchValue.length > 0){
        if(results.length > 0 && results[0].media_type == "person"){
          let arrPeliculas = [];
          
          results.forEach(element => {
            arrPeliculas.push(element.known_for);
          });
          setPeliculasAMostrar(arrPeliculas);
        } else {
          setPeliculasAMostrar(peliculasBuscador);
        }
      } else {
        setTitle("Top 20 mas populares");
        setPeliculasAMostrar(peliculas);
      }
  }

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      setSearchValue(document.getElementById("searcher").value.toString());
    }
  };

  let navbarAction = {
    type: "internal",
    route: "/pages/authentication/sign-in",
    label: "Ingresá",
    color: "info",
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
          <Grid container mt={12} >
            <Grid item xs={12} lg={12} height={"45px"}>
              <TextField
                fullWidth
                id="searcher"
                className="search-input"
                label="Buscar por película, genero o actor..."
                variant="outlined"
                onKeyDown={handleSearch}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography color={"#fff"} fontSize={"30px"}>
                  {title}
              </Typography>
            </Grid>
            
          </Grid>
          <Grid container >
            {
            
              peliculasAMostrar.length == 0 ? (
                <Grid item xs={12} lg={12} >
                    <Box xs={4} display="flex" textAlign={"center"} justifyContent="center" p={4}>
                        <CircularProgress />
                    </Box>
                </Grid>
              ) : (
                peliculasAMostrar.map((pelicula, index) => {
                  
                  if (pelicula!= undefined && pelicula.media_type == "person") {
                    return (
                      pelicula.known_for.map((knownForItem) => (
                        console.log("knownForItem", knownForItem),
                        <Grid item className="one" film-id={pelicula.id} key={knownForItem.id} xs={12} lg={3} onClick={handleClickFilm}>
                            <Box xs={4}
                              sx={{
                              backgroundImage: knownForItem.poster_path ? `url(${myConfig.themoviedb.pathImage + knownForItem.poster_path})` : `url(${posterImg})`,
                              backgroundSize: 'cover',
                              width: '100%',
                              height: '60vh',
                            }}
                            >
                              <Box className="image-overlay">
                                <MKTypography className="title">
                                  {knownForItem.media_type == "movie" ? knownForItem.title : knownForItem.name}
                                </MKTypography>

                                <Box sx={{alignContent:"center", height:"80%", width:"90%", textAlign:"center"}}>
                                  {knownForItem.overview?.length > 0 ? (
                                    <MKTypography className="overview">
                                      {knownForItem.overview}
                                    </MKTypography>
                                  ) : (
                                    <MKTypography className="overview">
                                      Sin descripción
                                    </MKTypography>
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          </Grid>
                      ))
                    );
                  } else if (pelicula!= undefined && (pelicula.media_type === "movie" || peliculas.media_type == undefined)) {
                    return (
                      console.log("pelicula_movie",pelicula),
                      <Grid item className="one" film-id={pelicula.id} key={pelicula.id} xs={12} lg={3} onClick={handleClickFilm}>
                        <Box xs={4}
                          sx={{
                          backgroundImage: pelicula.poster_path ? `url(${myConfig.themoviedb.pathImage + pelicula.poster_path})` : `url(${posterImg})`,
                          backgroundSize: 'cover',
                          width: '100%',
                          height: '60vh',
                        }}
                        >
                          <Box className="image-overlay">
                            <MKTypography className="title">
                              {pelicula.title != undefined ? pelicula.title : pelicula.name}
                            </MKTypography>
          
                            <Box sx={{alignContent:"center", height:"80%", width:"90%", textAlign:"center"}}>
                              {pelicula.overview?.length > 0 ? (
                                <MKTypography className="overview">
                                  {pelicula.overview}
                                </MKTypography>
                              ) : (
                                <MKTypography className="overview">
                                  Sin descripción
                                </MKTypography>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    );
                  } else {
                    return null;
                  }
                })
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

export default Home;
