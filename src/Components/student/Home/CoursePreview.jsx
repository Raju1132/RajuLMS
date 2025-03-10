import React from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CoursePreview = ({ course, open, onClose, onEnroll }) => {
  const isQuickView = !onEnroll; // If onEnroll is not provided, it's a quick view from eye icon

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          maxWidth: isQuickView ? '400px' : '600px',
          margin: isQuickView ? '32px' : '16px',
          height: isQuickView ? 'auto' : undefined
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      {!isQuickView && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: '#ff4500',
            color: 'white',
            p: 2
          }}
        >
          <Typography variant="h6">Course Overview</Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <DialogContent sx={{ p: isQuickView ? 2 : 4 }}>
        {isQuickView && (
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#666',
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
        
        {!isQuickView && (
          <Typography variant="h5" gutterBottom color="text.primary" sx={{ p: 1 }}>
            {course?.title}
          </Typography>
        )}

        <Box sx={{ my: isQuickView ? 1 : 2, pt: isQuickView ? 2 : 0 }}>
          <Typography 
            variant="body1" 
            paragraph
            sx={{
              fontSize: isQuickView ? '0.9rem' : '1rem',
              lineHeight: 1.6
            }}
          >
            {course?.overview}
          </Typography>
        </Box>

        {onEnroll && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              onClick={onClose}
              sx={{ mr: -1 }}
            >
            </IconButton>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CoursePreview; 