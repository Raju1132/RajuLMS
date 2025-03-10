import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BookOpenIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const CoursePreview = ({ course, open, onClose, onEnroll }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: '#ff4500',
          color: 'white',
        }}
      >
        <Typography variant="h6">Course Preview</Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom color="text.primary">
          {course?.title}
        </Typography>

        <Box sx={{ my: 3 }}>
          <Typography variant="subtitle1" gutterBottom color="text.secondary">
            Course Overview
          </Typography>
          <Typography variant="body1" paragraph>
            {course?.overview}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom color="text.secondary">
            What you'll learn
          </Typography>
          <List>
            {course?.modules?.map((module, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <BookOpenIcon style={{ color: "#ff4500", fontSize: 18 }} />
                </ListItemIcon>
                <ListItemText
                  primary={module}
                  primaryTypographyProps={{
                    variant: 'body2',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon style={{ color: "#ff4500", fontSize: 20 }} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Duration: {course?.duration}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EmojiEventsIcon style={{ color: "#ff4500", fontSize: 20 }} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Certificate upon completion
            </Typography>
          </Box>
        </Box>

        {onEnroll && (
          <Button
            variant="contained"
            onClick={() => onEnroll(course?.id)}
            sx={{
              bgcolor: '#ff4500',
              '&:hover': {
                bgcolor: 'rgba(255, 69, 0, 0.9)',
              },
            }}
          >
            Enroll Now
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CoursePreview;