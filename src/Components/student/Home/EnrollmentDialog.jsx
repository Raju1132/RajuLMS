import React from 'react';
import { BookOpen } from 'lucide-react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EnrollmentDialog = ({ open, onClose, course, onStartLearning }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 2,
          maxWidth: '400px'
        }
      }}
    >
      <DialogTitle sx={{
        textAlign: 'center',
        position: 'relative',
        pb: 2
      }}>
        <Typography variant="h5" component="h2" fontWeight="bold" color="#ff4500">
          Successfully Enrolled!
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            padding: '4px'
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 69, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2
          }}>
            <BookOpen size={40} color="#ff4500" />
          </Box>
          <Typography variant="body1" paragraph>
            You have successfully enrolled in:
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="#333">
            {course?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Duration: {course?.duration}
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            onStartLearning(course);
            onClose();
          }}
          sx={{
            bgcolor: '#ff4500',
            '&:hover': {
              bgcolor: 'rgba(255, 69, 0, 0.9)',
            },
          }}
        >
          Start Learning Now
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentDialog; 