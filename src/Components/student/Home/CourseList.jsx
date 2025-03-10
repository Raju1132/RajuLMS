import React from 'react';
import { Book, Clock, BookOpen } from 'lucide-react';
import {
  Box,
  Button,
  Grid
} from '@mui/material';
import CourseCard from './CourseCard';

const CourseList = ({
  courses,
  activeTab,
  onTabChange,
  onNotifyMe,
  onEnroll,
  onCourseDetails
}) => {
  const filteredCourses = courses.filter(course => {
    if (activeTab === 'upcoming') return course.status === 'upcoming';
    if (activeTab === 'my-courses') return course.enrolled && course.status === 'active';
    if (activeTab === 'courses') return course.status === 'active';
    return false;
  });

  return (
    <Box sx={{ flex: 1, ml: 0, p: 2 }}>
      {/* Tab buttons */}
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        mb: { xs: 3, sm: 4 },
        gap: 2
      }}>
        <Button
          variant={activeTab === 'courses' ? 'contained' : 'outlined'}
          startIcon={<Book size={16} />}
          onClick={() => onTabChange('courses')}
          sx={{
            bgcolor: activeTab === 'courses' ? '#ff4500' : 'white',
            color: activeTab === 'courses' ? 'white' : 'text.primary',
            '&:hover': {
              bgcolor: activeTab === 'courses' ? 'rgba(255, 69, 0, 0.9)' : 'rgba(255, 69, 0, 0.1)',
            },
            borderColor: activeTab === 'courses' ? '#ff4500' : 'divider',
            textTransform: 'none'
          }}
        >
          All Courses
        </Button>

        <Button
          variant={activeTab === 'upcoming' ? 'contained' : 'outlined'}
          startIcon={<Clock size={16} />}
          onClick={() => onTabChange('upcoming')}
          sx={{
            bgcolor: activeTab === 'upcoming' ? '#ff4500' : 'white',
            color: activeTab === 'upcoming' ? 'white' : 'text.primary',
            '&:hover': {
              bgcolor: activeTab === 'upcoming' ? 'rgba(255, 69, 0, 0.9)' : 'rgba(255, 69, 0, 0.1)',
            },
            borderColor: activeTab === 'upcoming' ? '#ff4500' : 'divider',
            textTransform: 'none'
          }}
        >
          To be Launched
        </Button>

        <Button
          variant={activeTab === 'my-courses' ? 'contained' : 'outlined'}
          startIcon={<BookOpen size={16} />}
          onClick={() => onTabChange('my-courses')}
          sx={{
            bgcolor: activeTab === 'my-courses' ? '#ff4500' : 'white',
            color: activeTab === 'my-courses' ? 'white' : 'text.primary',
            '&:hover': {
              bgcolor: activeTab === 'my-courses' ? 'rgba(255, 69, 0, 0.9)' : 'rgba(255, 69, 0, 0.1)',
            },
            borderColor: activeTab === 'my-courses' ? '#ff4500' : 'divider',
            textTransform: 'none'
          }}
        >
          My Courses
        </Button>
      </Box>

      {/* Course grid */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {filteredCourses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard
              course={course}
              onNotifyMe={onNotifyMe}
              onEnroll={onEnroll}
              onCourseDetails={onCourseDetails}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseList; 