import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ThemeProvider,
  createTheme,
  IconButton,
  Modal,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import "./TrainingCard.css";
import UploadModulesModel from "../../Components/card/uploadmodel";
import QuizUploadModal from "../../Components/card/quizuploadmodel.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff4500", // Using the specified primary color
    },
  },
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "90%",
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

function TrainingCard({ value }) {
  // States for existing modals
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [quizUploadOpen, setQuizUploadOpen] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);
  
  // New states for module management
  const [courseContent, setCourseContent] = useState(value.content || []);
  const [addModuleOpen, setAddModuleOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const [newModule, setNewModule] = useState({
    week: "",
    topic: "",
    details: "",
  });

  // New states for edit functionality
  const [editModuleOpen, setEditModuleOpen] = useState(false);
  const [moduleToEdit, setModuleToEdit] = useState(null);
  const [editedModule, setEditedModule] = useState({
    week: "",
    topic: "",
    details: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Handle add module modal
  const handleAddModuleOpen = () => setAddModuleOpen(true);
  const handleAddModuleClose = () => setAddModuleOpen(false);

  // Handle input change for new module form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewModule({
      ...newModule,
      [name]: value
    });
  };

  // Handle input change for edit module form
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedModule({
      ...editedModule,
      [name]: value
    });
  };

  // Submit new module
  const handleAddModuleSubmit = () => {
    // Validate inputs
    if (!newModule.week || !newModule.topic || !newModule.details) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields",
        severity: "error"
      });
      return;
    }

    
    // Create new module object
    const moduleToAdd = {
      ...newModule,
    };

    // Update state with new module
    const updatedContent = [...courseContent, moduleToAdd].sort((a, b) => a.week - b.week);
    setCourseContent(updatedContent);
    
    // Reset form and close modal
    setNewModule({
      week: "",
      topic: "",
      details: "",
    });
    handleAddModuleClose();
    
    // Show success message
    setSnackbar({
      open: true,
      message: "Module added successfully!",
      severity: "success"
    });
  };

  // Edit module handlers
  const handleEditModuleOpen = (module) => {
    setModuleToEdit(module);
    setEditedModule({
      week: module.week,
      topic: module.topic,
      details: module.details
    });
    setEditModuleOpen(true);
  };

  const handleEditModuleClose = () => {
    setEditModuleOpen(false);
    setModuleToEdit(null);
  };

  const handleEditModuleSubmit = () => {
    // Validate inputs
    if (!editedModule.week || !editedModule.topic || !editedModule.details) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields",
        severity: "error"
      });
      return;
    }

    // Update the module
    const updatedContent = courseContent.map(module => {
      if (module === moduleToEdit) {
        return {
          ...editedModule,
          file: editedModule.file || `week${editedModule.week}_${editedModule.topic.toLowerCase().replace(/\s+/g, '_')}.pdf`
        };
      }
      return module;
    }).sort((a, b) => a.week - b.week);

    setCourseContent(updatedContent);
    handleEditModuleClose();
    
    // Show success message
    setSnackbar({
      open: true,
      message: "Module updated successfully!",
      severity: "success"
    });
  };

  // Delete module handlers
  const handleDeleteModuleConfirm = (module) => {
    setModuleToDelete(module);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteModuleCancel = () => {
    setModuleToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const handleDeleteModuleConfirmed = () => {
    if (moduleToDelete) {
      const updatedContent = courseContent.filter(
        module => module.week !== moduleToDelete.week
      );
      setCourseContent(updatedContent);
      
      setSnackbar({
        open: true,
        message: "Module deleted successfully!",
        severity: "success"
      });
    }
    setDeleteConfirmOpen(false);
    setModuleToDelete(null);
  };

  // Existing modal handlers
  const handleQuizUploadOpen = () => setQuizUploadOpen(true);
  const handleQuizUploadClose = () => setQuizUploadOpen(false);

  const handleUploadOpen = () => setUploadModalOpen(true);
  const handleUploadClose = () => setUploadModalOpen(false);

  const handleOptionOpen = () => setOptionOpen(true);
  const handleOptionClose = () => setOptionOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Card className="training-card">
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingInline: 2,
            }}
          >
            <Typography variant="h5" className="card-title">
              {value.title}
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton
                edge="start"
                aria-label="add"
                sx={{ aspectRatio: "1/1" }}
                onClick={handleAddModuleOpen}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>

          <Box className="modules-container">
            {courseContent.length === 0 ? (
              <Typography sx={{ padding: 2, textAlign: "center", color: "text.secondary" }}>
                No modules found. Click the + button to add a module.
              </Typography>
            ) : (
              courseContent.map((module, key) => (
                <Accordion key={key} className="module-accordion">
                  <AccordionSummary
                    sx={{
                      background: "#f7f7f7",
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    className="module-header"
                  >
                    <Typography>
                      <span className="week-label">Module {module.week}:</span>
                      {module.topic}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      background: "#f7f7f7",
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      justifyContent: "space-between",
                      gap: 2
                    }}
                    className="module-details"
                  >
                    <Typography sx={{ flex: 1 }}>{module.details}</Typography>
                    <Box sx={{ display: "flex", gap: 1, justifyContent: { xs: "flex-end", md: "flex-end" } }}>
                      <IconButton
                        aria-label="add"
                        onClick={handleOptionOpen}
                      >
                        <AddIcon />
                      </IconButton>

                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditModuleOpen(module)}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteModuleConfirm(module)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Options Modal */}
      <Modal
        open={optionOpen}
        onClose={handleOptionClose}
        aria-labelledby="options-modal-title"
      >
        <Box sx={modalStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography id="options-modal-title" variant="h6" component="h2">
              Choose Options
            </Typography>
            <IconButton onClick={handleOptionClose} size="small">
              <CloseIcon />
            </IconButton>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              gap: "20px",
              padding: "20px"
            }}
          >
            <button className="button" style={{ backgroundColor: "#ff4500" }} onClick={handleQuizUploadOpen}>
              Create Quiz
            </button>
            <button className="button" style={{ backgroundColor: "#ff4500" }} onClick={handleUploadOpen}>
              Upload Files
            </button>
          </Box>
        </Box>
      </Modal>

      {/* Add Module Modal */}
      <Dialog open={addModuleOpen} onClose={handleAddModuleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: "#ff4500" }}>Add New Module</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please fill in the details for the new training module.
          </DialogContentText>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Module Number"
              name="week"
              type="number"
              value={newModule.week}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Topic"
              name="topic"
              value={newModule.topic}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Details"
              name="details"
              value={newModule.details}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
              required
            />
         
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddModuleClose}>Cancel</Button>
          <Button 
            onClick={handleAddModuleSubmit} 
            variant="contained" 
            sx={{ bgcolor: "#ff4500", "&:hover": { bgcolor: "#e03e00" } }}
          >
            Add Module
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Module Modal */}
      <Dialog open={editModuleOpen} onClose={handleEditModuleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: "#ff4500" }}>Edit Module</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Update the details for this training module.
          </DialogContentText>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Module Number"
              name="week"
              type="number"
              value={editedModule.week}
              onChange={handleEditInputChange}
              fullWidth
              required
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Topic"
              name="topic"
              value={editedModule.topic}
              onChange={handleEditInputChange}
              fullWidth
              required
            />
            <TextField
              label="Details"
              name="details"
              value={editedModule.details}
              onChange={handleEditInputChange}
              multiline
              rows={3}
              fullWidth
              required
            />
           
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditModuleClose}>Cancel</Button>
          <Button 
            onClick={handleEditModuleSubmit} 
            variant="contained" 
            sx={{ bgcolor: "#ff4500", "&:hover": { bgcolor: "#e03e00" } }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteModuleCancel}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete Week {moduleToDelete?.week}: {moduleToDelete?.topic}?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleDeleteModuleCancel}>Cancel</Button>
          <Button 
            onClick={handleDeleteModuleConfirmed} 
            color="error" 
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Existing modals */}
      <QuizUploadModal open={quizUploadOpen} close={handleQuizUploadClose} />
      <UploadModulesModel open={uploadModalOpen} close={handleUploadClose} />
    </ThemeProvider>
  );
}

export default TrainingCard;