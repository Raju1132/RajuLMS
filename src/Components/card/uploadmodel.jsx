import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Input,
  CircularProgress,
  LinearProgress,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const UploadModulesModal = ({ open, handleClose }) => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxWidth: '90%',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setUploadSuccess(false);
      setUploadError('');
    }
  };

  const validateFile = (file) => {
    const validTypes = ['application/pdf', 'video/mp4', 'video/webm', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      return 'Invalid file type. Please upload PDF or video files only.';
    }
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      return 'File is too large. Maximum size is 100MB.';
    }
    
    return null;
  };

  const handleUpload = () => {
    if (!file) {
      setUploadError('Please select a file first.');
      return;
    }

    const validationError = validateFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadError('');

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadSuccess(true);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    // In a real application, you would use fetch or axios to upload the file
    // Example:
    // const formData = new FormData();
    // formData.append('file', file);
    // fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData,
    //   onUploadProgress: (progressEvent) => {
    //     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //     setUploadProgress(percentCompleted);
    //   }
    // })
    // .then(response => response.json())
    // .then(data => {
    //   setUploading(false);
    //   setUploadSuccess(true);
    // })
    // .catch(error => {
    //   setUploading(false);
    //   setUploadError('Upload failed. Please try again.');
    // });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    if (uploadSuccess) {
      handleClose();
    } else if (!uploading) {
      handleUpload();
    }
  };

  const resetForm = () => {
    setFile(null);
    setFileName('');
    setUploadSuccess(false);
    setUploadError('');
    setUploadProgress(0);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        if (!uploading) handleClose();
      }}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
    >
      <Box sx={modalStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Typography id="edit-modal-title" variant="h6" component="h2">
            Upload Training Modules
          </Typography>
          <CloseIcon 
            onClick={() => {
              if (!uploading) handleClose();
            }} 
            sx={{ cursor: 'pointer' }} 
          />
        </div>

        <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Typography variant="body1" gutterBottom>
              Upload Files 
            </Typography>

            {!uploadSuccess && (
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{ height: '56px', borderStyle: 'dashed' }}
                disabled={uploading}
              >
                {fileName ? 'Change File' : 'Select File'}
                <input
                  type="file"
                  accept="application/pdf, video/*"
                  onChange={handleFileChange}
                  hidden
                  disabled={uploading}
                />
              </Button>
            )}

            {fileName && !uploadSuccess && (
              <Typography variant="body2" color="textSecondary">
                Selected File: {fileName}
              </Typography>
            )}

            {uploadError && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {uploadError}
              </Alert>
            )}

            {uploading && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  Uploading... {Math.round(uploadProgress)}%
                </Typography>
                <LinearProgress variant="determinate" value={uploadProgress} />
              </Box>
            )}

            {uploadSuccess && (
              <Alert 
                icon={<CheckCircleOutlineIcon fontSize="inherit" />} 
                severity="success"
                sx={{ mt: 1 }}
              >
                "{fileName}" uploaded successfully!
              </Alert>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            {!uploading && (
              <Button 
                variant="outlined" 
                onClick={() => {
                  if (uploadSuccess) {
                    resetForm();
                  } else {
                    handleClose();
                  }
                }}
              >
                {uploadSuccess ? 'Upload Another' : 'Cancel'}
              </Button>
            )}

            <Button
              variant="contained"
              type="submit"
              disabled={uploading || (!file && !uploadSuccess)}
              sx={{
                bgcolor: "#ff4500",
                "&:hover": { bgcolor: "#ff4500dd" },
                ml: 'auto'
              }}
              startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {uploadSuccess ? 'Done' : uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default UploadModulesModal;