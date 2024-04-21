import Fab from "@mui/material/Fab/Fab";
import Email from "@mui/icons-material/Email";
import { Link } from "react-router-dom";

const AdminBtnAccess = () => {
  return (
    <Link to="/admin/inbox">
      <Fab
        variant="extended"
        sx={{
          position: "fixed",
          bottom: 50,
          right: 50,
        }}
      >
        <Email sx={{ mr: 1 }} />
        Inbox
      </Fab>
    </Link>
  );
};

export default AdminBtnAccess;
