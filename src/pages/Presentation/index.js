import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKSocialButton from "components/MKSocialButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Presentation page sections
import Information from "pages/Presentation/sections/Information";
import DesignBlocks from "pages/Presentation/sections/DesignBlocks";
import Pages from "pages/Presentation/sections/Pages";
import Testimonials from "pages/Presentation/sections/Testimonials";
import Download from "pages/Presentation/sections/Download";

// Routes
import { getRoutes } from "routes";
import footerRoutes from "footer.routes";

// Images
import { useContext, useState, useEffect } from "react";
import { UserCtx } from "contexts/UserContext";

import logoImage from "assets/images/logo.png";
import { myConfig } from '../../config.js'

function Presentation() {
  const { user } = useContext(UserCtx);
  
  const url = myConfig.themoviedb.url + "genre/movie/list?language=es";
  const [generos, setGeneros] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + myConfig.themoviedb.token, 
    }
  };

 function getGeneros(){
      if(generos.length == 0){
        fetch(url, options)
        .then(res => res.json())
        .then((json) => { 
            setGeneros(json);
        })
        .catch(err => console.error('error:' + err));
      }
    }

    useEffect(() => {
         getGeneros();
         console.log("generos",generos); 
        // }, []);
    });

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
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKBox
                minHeight="50vh"
                width="100%"
                sx={{
                  backgroundImage: `url(${logoImage})`,
                  backgroundPosition: "top",
                  display: "grid",
                  placeItems: "center",
                }}
              >
            </MKBox>
            <MKBox>
            <div className="body">
                    { generos.map((dataObj, index) => {
                      return (
                        <div>{dataObj.name}</div>
                      );
                    })}
                </div>
            </MKBox>
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
