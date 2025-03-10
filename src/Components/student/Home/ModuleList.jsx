import React from 'react';
import {
  Box,
  List,
  Paper,
  Typography
} from '@mui/material';
import toast from 'react-hot-toast';

const ModuleList = ({ course, selectedModule, moduleTimeSpent, onModuleSelect }) => {
  return (
    <Box sx={{
      width: { xs: '100%', sm: '300px' },
      height: { xs: 'auto', sm: '100%' },
      borderRight: { xs: 'none', sm: '1px solid #e5e7eb' },
      borderBottom: { xs: '1px solid #e5e7eb', sm: 'none' },
      overflowY: 'auto',
      p: 2
    }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Course Modules</Typography>
      <List sx={{ p: 0 }}>
        {course.modules.map((module, index) => {
          const canAccess = index === 0 || moduleTimeSpent[index - 1];
          return (
            <Paper
              key={index}
              elevation={0}
              sx={{
                mb: 2,
                p: 2,
                bgcolor: selectedModule === index ? 'rgba(255, 69, 0, 0.1)' : '#f9fafb',
                borderRadius: 2,
                cursor: canAccess ? 'pointer' : 'not-allowed',
                border: selectedModule === index ? '1px solid #ff4500' : '1px solid transparent',
                opacity: canAccess ? 1 : 0.5
              }}
              onClick={() => {
                if (canAccess) {
                  onModuleSelect(index);
                } else {
                  toast.error('Complete previous modules first');
                }
              }}
            >
              <Typography variant="subtitle2" fontWeight={selectedModule === index ? "bold" : "medium"}>
                {module}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Min. reading time: 30 sec
                </Typography>
                {moduleTimeSpent[index] && (
                  <Typography
                    variant="caption"
                    color="#009000"
                    sx={{ ml: 1 }}
                  >
                    (Completed)
                  </Typography>
                )}
              </Box>
            </Paper>
          );
        })}
      </List>
    </Box>
  );
};

export default ModuleList; 