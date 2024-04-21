import React from "react";
import { Modal, Box, Fade, Typography, Backdrop } from "@mui/material";
import PropTypes from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({ open, handleClose, modalData }) => {
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h4" component="h2">
              {modalData.title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {modalData.text}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

CustomModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  style: PropTypes.any,
  modalData: PropTypes.object,
};

export default CustomModal;
