import { Typography } from "@mui/material";

const date = new Date().getFullYear();

export default {
  brand: {},
  socials: [],
  menus: [],
  copyright: (
    <Typography variant="button" fontWeight="regular" color="#fff" >
      Todos los derechos reservados. Copyright &copy; {date}
    </Typography>
  ),
};
