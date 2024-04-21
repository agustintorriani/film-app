/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React components
import TransparentBlogCard from "examples/Cards/BlogCards/TransparentBlogCard";
import BackgroundBlogCard from "examples/Cards/BlogCards/BackgroundBlogCard";

// Images
import post1 from "assets/images/examples/testimonial-6-2.jpg";
import post2 from "assets/images/FDS-Servers.png";
//import post3 from "assets/images/examples/blog-9-4.jpg";
import post4 from "assets/images/FDS-CasoExito.png";

function Places() {
  return (
    <MKBox component="section" py={2}>
      <Container>
        <Grid container item xs={12} lg={6}>
          <MKTypography variant="h3" mb={6}>
            Más acerca de mi
          </MKTypography>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={3}>
            <TransparentBlogCard
              image={post1}
              title="Implementaciones"
              description="Instalaciones e Implementaciones de sucursales en todo el país"
              action={{
                type: "internal",
                route: "#",
                color: "info",
                label: "",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TransparentBlogCard
              image={post2}
              title="Servidores On Premise"
              description="Responsable de configurar, mantener y monitorear los servidores que forman parte de una red o sistema informático"
              action={{
                type: "internal",
                route: "#",
                color: "info",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <BackgroundBlogCard
              image={post4}
              title="Caso de éxito"
              description="Aplicando soluciones de Veam Backup al respaldo de toda la infraestructura."
              action={{
                type: "external",
                route: "https://www.youtube.com/watch?v=eOACvjOw-5I",
                label: "Lee más",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Places;
