import MKTypography from "components/MKTypography";

const date = new Date().getFullYear();

export default {
  brand: {},
  socials: [],
  menus: [],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      Todos los derechos reservados. Copyright &copy; {date}
    </MKTypography>
  ),
};
