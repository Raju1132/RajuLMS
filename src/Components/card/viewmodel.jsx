import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
  width: "80%",
  maxWidth: "500px",
  maxHeight: "90vh",
  overflow: "auto",
};

const ViewModulesModal = ({
  open,
  handleClose,
  value,
  getStatusColor,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="view-modal-title"
      aria-describedby="view-modal-description"
    >
      <Box sx={modalStyle}>
        <div className="modal-header flex_between mb10">
          <Typography variant="h6">{value.title}</Typography>
          <CloseIcon onClick={handleClose} className="close-icon" />
        </div>
        <div className="modal-content mb10">
          <div className="detail-row flex_between mb10">
            <Typography variant="body2">
              {value.fromDate} - {value.toDate}
            </Typography>
          </div>

          <div className="detail-row flex_between mb10">
            <Typography variant="subtitle1" className="detail-label">
              No. Modules: {7}
            </Typography>
          </div>

          <div className="detail-row flex_between mb10">
            <Typography variant="subtitle1" className="detail-label">
              Status:
            </Typography>
            <div
              className="Status"
              style={{ backgroundColor: getStatusColor(value.status) }}
            >
              {value.status}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ViewModulesModal;
