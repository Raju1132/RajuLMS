import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Box } from '@mui/material';
import { INITIAL_COURSES } from './constants/courses';
import CourseList from './CourseList';
import EnrollmentDialog from './EnrollmentDialog';
import CourseDetails from './CourseDetails';
import CoursePreview from './CoursePreview';

const StudentHome = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [showEnrollmentDialog, setShowEnrollmentDialog] = useState(false);
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(0);
  const [moduleTimeSpent, setModuleTimeSpent] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewCourse, setPreviewCourse] = useState(null);

  const handleNotifyMe = () => {
    toast.success('You will be notified when this course becomes available!', {
      icon: '🔔',
      duration: 3000,
    });
  };

  const handleEnroll = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    setEnrolledCourse(course);
    setShowEnrollmentDialog(true);
    setCourses(prevCourses =>
      prevCourses.map(c =>
        c.id === courseId ? { ...c, enrolled: true } : c
      )
    );
    setShowPreview(false);
  };

  const handleStartLearning = (course) => {
    setCourses(prevCourses =>
      prevCourses.map(c =>
        c.id === course.id ? { ...c, enrolled: true, progress: 0, hasStartedLearning: true } : c
      )
    );

    setUser(prevUser => ({
      ...prevUser,
      coursesEnrolled: (prevUser.coursesEnrolled || 0) + 1
    }));

    setSelectedCourse(course);
    setSelectedModule(0);
    setShowEnrollmentDialog(false);
  };

  const handleCourseDetails = (course, isPreview = true) => {
    if (isPreview) {
      setPreviewCourse(course);
      setShowPreview(true);
    } else if (!course.enrolled) {
      handleEnroll(course.id);
    } else {
      setSelectedCourse(course);
      setSelectedModule(course.currentModule || 0);
      setStartTime(Date.now());
    }
  };



  const handleModuleSelect = (moduleIndex) => {
    setSelectedModule(moduleIndex);
    setStartTime(Date.now());
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {!selectedCourse ? (
        <CourseList
          courses={courses}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onNotifyMe={handleNotifyMe}
          onEnroll={handleEnroll}
          onCourseDetails={handleCourseDetails}
        />
      ) : (
        <CourseDetails
          course={selectedCourse}
          selectedModule={selectedModule}
          moduleTimeSpent={moduleTimeSpent}
          onModuleSelect={handleModuleSelect}
          onBack={() => {
            setSelectedCourse(null);
          }}
        />
      )}

      <EnrollmentDialog
        open={showEnrollmentDialog}
        onClose={() => setShowEnrollmentDialog(false)}
        course={enrolledCourse}
        onStartLearning={handleStartLearning}
      />

      <CoursePreview
        open={showPreview}
        onClose={() => setShowPreview(false)}
        course={previewCourse}
        onEnroll={handleEnroll}
      />
    </Box>
  );
};

export default StudentHome; 