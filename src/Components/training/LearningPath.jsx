import React from 'react';
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const LearningPath = ({ modules, currentModule, completedModules }) => {
  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#ff4500' }}>
        Learning Path
      </Typography>
      <Stepper activeStep={currentModule} alternativeLabel>
        {modules.map((module, index) => {
          const isCompleted = completedModules.includes(index);
          return (
            <Step key={index} completed={isCompleted}>
              <StepLabel
                StepIconProps={{
                  sx: {
                    '&.Mui-completed': {
                      color: '#009000',
                    },
                    '&.Mui-active': {
                      color: '#ff4500',
                    },
                  },
                }}
              >
                <Typography variant="caption" sx={{ display: 'block', maxWidth: 120 }}>
                  {module.split(':')[0]}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default LearningPath;