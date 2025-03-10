import React from 'react';
import { AlertCircle, BookOpen, Eye } from 'lucide-react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton
} from '@mui/material';

const CourseCard = ({ course, onNotifyMe, onEnroll, onCourseDetails }) => {
  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 2,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
      }
    }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            height: 48,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.2
          }}
        >
          {course.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            height: 40,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 2
          }}
        >
          {course.description}
        </Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 'auto'
        }}>
          <Typography variant="caption" color="text.secondary">
            {course.duration}
          </Typography>
          {course.enrolled && course.progress > 0 && (
            <Typography variant="caption" color="text.secondary">
              {course.progress}% Complete
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        {course.status === 'upcoming' ? (
          <Button
            fullWidth
            variant="contained"
            startIcon={<AlertCircle size={16} />}
            onClick={() => onNotifyMe(course)}
            sx={{
              bgcolor: '#ff4500',
              '&:hover': { bgcolor: 'rgba(255, 69, 0, 0.9)' },
              textTransform: 'none'
            }}
          >
            Notify Me
          </Button>
        ) : course.enrolled ? (
          <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<BookOpen size={16} />}
              onClick={() => onCourseDetails(course, false)}
              sx={{
                flex: 1,
                bgcolor: '#ff4500',
                '&:hover': { bgcolor: 'rgba(255, 69, 0, 0.9)' },
                textTransform: 'none'
              }}
            >
              {course.hasStartedLearning ? 'Continue' : 'Start'}
            </Button>
            <IconButton
              onClick={() => onCourseDetails(course, true)}
              sx={{
                bgcolor: 'rgba(255, 69, 0, 0.1)',
                color: '#ff4500',
                '&:hover': { bgcolor: 'rgba(255, 69, 0, 0.2)' },
              }}
            >
              <Eye size={18} />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<BookOpen size={16} />}
              onClick={() => onEnroll(course.id)}
              sx={{
                flex: 1,
                bgcolor: '#ff4500',
                '&:hover': { bgcolor: 'rgba(255, 69, 0, 0.9)' },
                textTransform: 'none'
              }}
            >
              Enroll Now
            </Button>
            <IconButton
              onClick={() => onCourseDetails(course, true)}
              sx={{
                bgcolor: 'rgba(255, 69, 0, 0.1)',
                color: '#ff4500',
                '&:hover': { bgcolor: 'rgba(255, 69, 0, 0.2)' },
              }}
            >
              <Eye size={18} />
            </IconButton>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default CourseCard; 