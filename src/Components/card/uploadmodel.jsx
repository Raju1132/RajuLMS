import React, { useState, useRef } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  LinearProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const UploadModulesModal = ({ open, close, courseId }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [allUploadsComplete, setAllUploadsComplete] = useState(false);
  const fileInputRef = useRef(null);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxWidth: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    
    if (selectedFiles.length === 0) return;
    
    const newFiles = selectedFiles.map(file => {
      const validationError = validateFile(file);
      
      return {
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: validationError ? 'error' : 'pending',
        error: validationError || '',
      };
    });
    
    setFiles(prev => [...prev, ...newFiles]);
    setAllUploadsComplete(false);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateFile = (file) => {
    const validTypes =  [
      'application/pdf', 'video/mp4', 'video/webm', 'video/quicktime', 
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
      'application/vnd.ms-powerpoint', 'image/jpeg', 'image/png', 'image/gif',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
      'text/html', 
    ];
    if (!validTypes.includes(file.type)) {
      return 'Invalid file type. Please upload documents or video files only.';
    }
    const maxSize = 200 * 1024 * 1024; 
    if (file.size > maxSize) {
      return 'File is too large. Maximum size is 200MB.';
    }    
    return null;
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) {
      return <PictureAsPdfIcon color="primary" />;
    } else if (fileType.includes('video')) {
      return <VideoFileIcon color="secondary" />;
    } else {
      return <InsertDriveFileIcon />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const simulateFileUpload = (index) => {
    const fileToUpload = files[index];
    
    if (fileToUpload.status === 'error') {
      return Promise.resolve();
    }
    
    setFiles(prev => {
      const newFiles = [...prev];
      newFiles[index] = { ...newFiles[index], status: 'uploading', progress: 0 };
      return newFiles;
    });

    return new Promise((resolve) => {
      let progress = 0;
      const uploadDuration = 100 + (fileToUpload.size / 1000000) * 500 + Math.random() * 2000;
      const interval = 100; 
      const steps = uploadDuration / interval;
      const increment = 100 / steps;
      const progressInterval = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
          clearInterval(progressInterval);
          setFiles(prev => {
            const newFiles = [...prev];
            newFiles[index] = { ...newFiles[index], status: 'complete', progress: 100 };
            return newFiles;
          });
          resolve();
        } else {
          setFiles(prev => {
            const newFiles = [...prev];
            newFiles[index] = { ...newFiles[index], progress: progress };
            return newFiles;
          });
        }
      }, interval);
    });
  };

  const handleUpload = async () => {
    const validFiles = files.filter(file => file.status !== 'complete');
    if (validFiles.length === 0) {
      return;
    }
    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      if (files[i].status !== 'complete') {
        await simulateFileUpload(i);
      }
    }
    setUploading(false);
    setAllUploadsComplete(true);    
  };

  const handleCloseModal = () => {
    if (!uploading) {
      setFiles([]);
      setAllUploadsComplete(false);
      close();
    }
  };

  const allFilesUploaded = files.length > 0 && files.every(file => file.status === 'complete');
  const hasValidFilesToUpload = files.length > 0 && files.some(file => file.status !== 'error' && file.status !== 'complete');
  const hasErrors = files.some(file => file.status === 'error');
  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="upload-modal-title"
      aria-describedby="upload-modal-description"
    >
      <Box sx={modalStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Typography id="upload-modal-title" variant="h6" component="h2">
            Upload Course Materials
          </Typography>
          <IconButton 
            onClick={handleCloseModal}
            disabled={uploading}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {!allFilesUploaded && (
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ height: '56px', borderStyle: 'dashed' }}
              disabled={uploading}
            >
              Select Files
              <input
                type="file"
                accept='application/pdf, video/mp4, video/webm, video/quicktime,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint, image/jpeg, image/png, image/gif,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/html'                
                onChange={handleFileChange}
                hidden
                multiple
                disabled={uploading}
                ref={fileInputRef}
              />
            </Button>
          )}

          {files.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Files ({files.length})
              </Typography>
              <List dense sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: '4px', border: '1px solid #e0e0e0' }}>
                {files.map((file, index) => (
                  <ListItem 
                    key={index}
                    secondaryAction={
                      !uploading && file.status !== 'complete' && (
                        <IconButton edge="end" aria-label="delete" onClick={() => removeFile(index)}>
                          <DeleteIcon />
                        </IconButton>
                      )
                    }
                    sx={{ 
                      borderBottom: index < files.length - 1 ? '1px solid #f0f0f0' : 'none',
                      backgroundColor: file.status === 'error' ? '#fff8f8' : 'inherit' 
                    }}
                  >
                    <ListItemIcon>
                      {file.status === 'complete' ? (
                        <CheckCircleOutlineIcon color="success" />
                      ) : file.status === 'error' ? (
                        <ErrorOutlineIcon color="error" />
                      ) : (
                        getFileIcon(file.type)
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={file.name} 
                      secondary={
                        <span>
                          {formatFileSize(file.size)}
                          {file.status === 'error' && (
                            <Typography component="span" color="error" sx={{ display: 'block' }}>
                              {file.error}
                            </Typography>
                          )}
                        </span>
                      }
                    />
                    {file.status === 'uploading' && (
                      <Box sx={{ width: '100%', maxWidth: 100, ml: 1 }}>
                        <LinearProgress variant="determinate" value={file.progress} />
                      </Box>
                    )}
                    {file.status === 'complete' && (
                      <Chip size="small" label="Uploaded" color="success" sx={{ ml: 1 }} />
                    )}
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {hasErrors && (
            <Alert severity="warning" icon={<ErrorIcon />}>
              Some files cannot be uploaded due to format or size restrictions.
            </Alert>
          )}

          {allUploadsComplete && (
            <Alert 
              icon={<CheckCircleOutlineIcon fontSize="inherit" />} 
              severity="success"
            >
              All files have been uploaded successfully!
            </Alert>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button 
              variant="outlined" 
              onClick={handleCloseModal}
              disabled={uploading}
            >
              {allFilesUploaded ? 'Close' : 'Cancel'}
            </Button>
            {!allFilesUploaded && (
              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={uploading || !hasValidFilesToUpload}
                sx={{
                  bgcolor: "#ff4500",
                  "&:hover": { bgcolor: "#ff4500dd" },
                }}
                startIcon={uploading ? null : <CloudUploadIcon />}
              >
                {uploading ? 'Uploading...' : 'Upload Files'}
              </Button>
            )}
            
            {allUploadsComplete && (
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  setFiles([]);
                  setAllUploadsComplete(false);
                }}
                startIcon={<CloudUploadIcon />}
              >
                Upload More Files
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadModulesModal;