import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "8px",
    border:"none",
    p: 4,
    width: "80%",
    maxWidth: "500px",
    maxHeight: "90vh",
    overflow: "auto",
  };

function EditModel({ value, onUpdate, editModalOpen, handleEditClose }) {
  const [editFormData, setEditFormData] = useState({
    title: value.title,
    description: value.description,
    fromDate: value.fromDate,
    toDate: value.toDate,
  });

  const handleInputChange = (e) => {
    const { name, value: inputValue } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: inputValue,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(editFormData);  
    }
    handleEditClose(); 
  };

  return (
    <Modal
      open={editModalOpen}
      onClose={handleEditClose}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
    >
      <Box sx={modalStyle}>
        <div className="modal-header flex_between mb10">
          <Typography id="edit-modal-title" variant="h6" component="h2" sx={{color:"#ff4500"}} >
            Edit Training
          </Typography>
          <CloseIcon onClick={handleEditClose} className="close-icon" />
        </div>

        <form
          onSubmit={handleEditSubmit}
          className="edit-form"
        >
        <div className="form-group mb10 ">
            <label htmlFor="title" >Title</label>
            <TextField
            sx={{width:"100%"}}
              fullWidth
              id="title"
              name="title"
              value={editFormData.title}
              onChange={handleInputChange}
              required
              variant="outlined"
              size="small"
            />
          </div>

          <div className="form-group mb10">
            <label htmlFor="description">Description</label>
            <TextField
              fullWidth
              id="description"
              name="description"
              value={editFormData.description}
              onChange={handleInputChange}
              required
              variant="outlined"
              multiline
              rows={4}
            />
          </div>

          <div className="form-row mb10">
            <div className="form-group half flex_between">
              <label htmlFor="fromDate">Valid </label>
              <TextField
                
                id="fromDate"
                name="fromDate"
                value={editFormData.fromDate}
                onChange={handleInputChange}
                required
                variant="outlined"
                placeholder="DD/MM/YYYY"
                size="small"
              />
           
              <TextField
                
                id="toDate"
                name="toDate"
                value={editFormData.toDate}
                onChange={handleInputChange}
                required
                variant="outlined"
                placeholder="DD/MM/YYYY"
                size="small"
              />
            </div>
          </div>

          <div className="form-actions flex_between">
          <Button variant="outlined" onClick={handleEditClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                bgcolor: "#ff4500",
                "&:hover": { bgcolor: "#ff4500dd" },
                mr: 2,
              }}
            >
              Save Changes
            </Button>
         
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default EditModel;
