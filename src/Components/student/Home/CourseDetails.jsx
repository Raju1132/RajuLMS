import React from 'react';
import {  HomeIcon } from 'lucide-react';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ModuleList from './ModuleList';

const CourseDetails = ({
  course,
  selectedModule,
  moduleTimeSpent,
  onModuleSelect,
  onBack
}) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <Box sx={{
        p: 2,
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: 'white'
      }}>
        <Box>
          <Typography variant="h5" component="h2" fontWeight="bold">
            {course.title}
          </Typography>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              component="button"
              variant="body2"
              onClick={onBack}
              sx={{ cursor: 'pointer', color: 'text.secondary' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon size={16} />
                <Box component="span" sx={{ ml: 0.5 }}>Home</Box>
              </Box>
            </Link>
            <Typography color="text.primary">
              {course.modules[selectedModule]?.split(':')[0] || 'Module'}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Content area */}
      <Box sx={{
        display: 'flex',
        flex: 1,
        flexDirection: { xs: 'column', sm: 'row' },
        overflow: 'hidden',
        bgcolor: '#f9fafb'
      }}>
        <ModuleList
          course={course}
          selectedModule={selectedModule}
          moduleTimeSpent={moduleTimeSpent}
          onModuleSelect={onModuleSelect}
        />

        {/* Right side - PDF viewer */}
        <Box sx={{ 
          flex: 1, 
          p: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden',
          bgcolor: 'white',
          m: 2,
          borderRadius: 2,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <Typography variant="h6" gutterBottom>
            {course.modules[selectedModule]}
          </Typography>
          <Box sx={{ flex: 1, mt: 2 }}>
            <iframe
              src={course.pdfUrl}
              title={course.modules[selectedModule]}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseDetails; 