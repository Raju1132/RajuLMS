import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Grid, 
  Paper, 
  Box 
} from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

// Sample student result data
const studentResults = [
  {
    role: 'student',
    name: 'John Doe',
    subjects: [
      { name: 'Mathematics', score: 85, maxScore: 100 },
      { name: 'Science', score: 78, maxScore: 100 },
      { name: 'English', score: 92, maxScore: 100 },
      { name: 'History', score: 65, maxScore: 100 }
    ],
    overallPerformance: 80
  },
  {
    role: 'student',
    name: 'Jane Smith',
    subjects: [
      { name: 'Mathematics', score: 95, maxScore: 100 },
      { name: 'Science', score: 88, maxScore: 100 },
      { name: 'English', score: 91, maxScore: 100 },
      { name: 'History', score: 85, maxScore: 100 }
    ],
    overallPerformance: 90
  }
];

const lmsUserTypes = [
  "student",
 
];

function ResultPage() {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    // Reset student selection when role changes
    setSelectedStudent(null);
  };

  const handleStudentChange = (student) => {
    setSelectedStudent(student);
  };

  const filteredStudents = selectedRole === 'student' 
    ? studentResults 
    : [];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" color="primary">
              Student Results
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Select Role</InputLabel>
              <Select
                value={selectedRole}
                label="Select Role"
                onChange={handleRoleChange}
              >
                {lmsUserTypes.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {selectedRole === 'student' && (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {filteredStudents.map((student) => (
              <Grid 
                item 
                xs={12} 
                md={6} 
                key={student.name} 
                onClick={() => handleStudentChange(student)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { 
                    backgroundColor: '#f0f0f0' 
                  }
                }}
              >
                <Paper 
                  elevation={selectedStudent === student ? 6 : 2} 
                  sx={{ p: 2 }}
                >
                  <Typography variant="h6">{student.name}</Typography>
                  <Typography variant="body2">
                    Overall Performance: {student.overallPerformance}%
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {selectedStudent && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Detailed Results for {selectedStudent.name}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="h6">Subject Scores</Typography>
                  {selectedStudent.subjects.map((subject) => (
                    <Box key={subject.name} sx={{ mb: 2 }}>
                      <Typography variant="body1">
                        {subject.name}: {subject.score}/{subject.maxScore}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Gauge
                  width={300}
                  height={300}
                  value={selectedStudent.overallPerformance}
                  cornerRadius="50%"
                  sx={(theme) => ({
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 40,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                      fill: selectedStudent.overallPerformance >= 80 
                        ? '#4caf50'   // Green for good performance
                        : '#ff4500',  // Orange for lower performance
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                      fill: theme.palette.text.disabled,
                    },
                  })}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default ResultPage;