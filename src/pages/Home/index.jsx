import React, { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart, PieChart } from '@mui/x-charts';
import { 
  AppBar, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Container, 
  Grid, 
  Paper, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  LinearProgress
} from '@mui/material';

const courseCompletionData = [
  { month: 'Jan', completions: 45 },
  { month: 'Feb', completions: 52 },
  { month: 'Mar', completions: 49 },
  { month: 'Apr', completions: 63 },
  { month: 'May', completions: 58 },
  { month: 'Jun', completions: 69 },
];

const courseCategoryData = [
  { id: 0, value: 35, label: 'Technical' },
  { id: 1, value: 25, label: 'Soft Skills' },
  { id: 2, value: 20, label: 'Compliance' },
  { id: 3, value: 15, label: 'Management' },
  { id: 4, value: 5, label: 'Other' },
];

const userEngagementData = [
  { day: 'Mon', hours: 4.2 },
  { day: 'Tue', hours: 3.8 },
  { day: 'Wed', hours: 5.1 },
  { day: 'Thu', hours: 4.5 },
  { day: 'Fri', hours: 3.6 },
  { day: 'Sat', hours: 2.4 },
  { day: 'Sun', hours: 1.8 },
];

const topCoursesData = [
  { name: 'JavaScript Basics', enrollments: 320, completions: 275 },
  { name: 'Project Management', enrollments: 280, completions: 210 },
  { name: 'Data Analysis', enrollments: 240, completions: 180 },
  { name: 'Communication Skills', enrollments: 200, completions: 185 },
  { name: 'Cybersecurity', enrollments: 190, completions: 160 },
];

const learnerProgressData = [
  { name: 'Not Started', count: 120, color: '#f44336' },
  { name: 'In Progress', count: 350, color: '#ff9800' },
  { name: 'Completed', count: 280, color: '#4caf50' },
];

const styles = {
  statsCard: {
    textAlign: 'center',
    padding: '20px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    height: '100%',
  },
  statsNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  statsLabel: {
    color: '#666',
    fontSize: '0.9rem',
  },
  chartContainer: {
    padding: '20px',
    height: '100%',

  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  tabButton: {
    margin: '0 8px',
    padding: '8px 16px',
  },
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    activeUsers: 847,
    coursesCompleted: 1862,
    avgCompletionRate: 76,
    totalCourses: 42
  };

  const getProgressColor = (name) => {
    if (name === 'Completed') return '#4caf50';
    if (name === 'In Progress') return '#ff9800';
    return '#f44336';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h5" component="h1" fontWeight="bold">
            Learning Management Dashboard
          </Typography>
        </Toolbar>
        <Box sx={{ px: 2, pb: 2 }}>
          <Button 
            variant={activeTab === 'overview' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setActiveTab('overview')}
            sx={styles.tabButton}
          >
            Overview
          </Button>
          <Button 
            variant={activeTab === 'courses' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setActiveTab('courses')}
            sx={styles.tabButton}
          >
            Courses
          </Button>
          <Button 
            variant={activeTab === 'users' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setActiveTab('users')}
            sx={styles.tabButton}
          >
            Users
          </Button>
        </Box>
      </AppBar>
      <Container maxWidth="xl" sx={{ py: 4, flexGrow: 1 }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={styles.statsCard}>
              <Typography sx={{ ...styles.statsNumber, color: '#2196f3' }}>
                {stats.activeUsers}
              </Typography>
              <Typography sx={styles.statsLabel}>Active Users</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={styles.statsCard}>
              <Typography sx={{ ...styles.statsNumber, color: '#4caf50' }}>
                {stats.coursesCompleted}
              </Typography>
              <Typography sx={styles.statsLabel}>Courses Completed</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={styles.statsCard}>
              <Typography sx={{ ...styles.statsNumber, color: '#ff9800' }}>
                {stats.avgCompletionRate}%
              </Typography>
              <Typography sx={styles.statsLabel}>Avg. Completion Rate</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={styles.statsCard}>
              <Typography sx={{ ...styles.statsNumber, color: '#9c27b0' }}>
                {stats.totalCourses}
              </Typography>
              <Typography sx={styles.statsLabel}>Total Courses</Typography>
            </Paper>
          </Grid>
        </Grid>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.chartContainer}>
              <Typography variant="h6" sx={{ mb: 2 }}>Course Completions Over Time</Typography>
              <LineChart
                dataset={courseCompletionData}
                xAxis={[{ dataKey: 'month', scaleType: 'band' }]}
                series={[{ dataKey: 'completions', color: '#2196f3' }]}
                height={300}
                margin={{ left: 40, right: 40, top: 20, bottom: 30 }}
                grid={{ vertical: true, horizontal: true }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.chartContainer}>
              <Typography variant="h6" sx={{ mb: 2 }}>Course Categories</Typography>
              <PieChart
                series={[
                  {
                    data: courseCategoryData,
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 2,
                    cornerRadius: 4,
                    startAngle: -90,
                    endAngle: 270,
                  },
                ]}
                height={300}
                margin={{ left: 0, right: 100, top: 20, bottom: 30 }}
              />
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.chartContainer}>
              <Typography variant="h6" sx={{ mb: 2 }}>Daily User Engagement (Hours)</Typography>
              <BarChart
                dataset={userEngagementData}
                xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
                series={[{ dataKey: 'hours', color: '#4caf50' }]}
                height={300}
                margin={{ left: 40, right: 40, top: 20, bottom: 30 }}
                barLabel="value"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.chartContainer}>
              <Typography variant="h6" sx={{ mb: 2 }}>Top Courses</Typography>
              <BarChart
                xAxis={[{ scaleType: 'band', data: topCoursesData.map(item => item.name) }]}
                series={[
                  { data: topCoursesData.map(item => item.enrollments), label: 'Enrollments' },
                  { data: topCoursesData.map(item => item.completions), label: 'Completions' }
                ]}
                height={300}
                margin={{ left: 40, right: 40, top: 20, bottom: 30 }}
              />
            </Paper>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Learner Progress</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Count</TableCell>
                  <TableCell>Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {learnerProgressData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.count}</TableCell>
                    <TableCell sx={{ width: '40%' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(item.count / 750) * 100} 
                        sx={{ 
                          ...styles.progressBar,
                          '& .MuiLinearProgress-bar': { backgroundColor: getProgressColor(item.name) } 
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;