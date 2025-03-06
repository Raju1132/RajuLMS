import React, { useState } from "react";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { LineChart } from "@mui/x-charts";

const styles = {
  chartContainer: {
    margin:" 20px 0",
    padding: "20px",
    height: "100%",
  },
};

const courseCompletionData = [
  { month: 'Jan', completions: 45 },
  { month: 'Feb', completions: 52 },
  { month: 'Mar', completions: 49 },
  { month: 'Apr', completions: 63 },
  { month: 'May', completions: 58 },
  { month: 'Jun', completions: 69 },
];


// List of student data
const studentResults = [
  {
    role: "student",
    name: "Amit Sharma",
    subjects: [
      { name: "Mathematics", score: 85, maxScore: 100 },
      { name: "Science", score: 78, maxScore: 100 },
      { name: "English", score: 92, maxScore: 100 },
      { name: "History", score: 65, maxScore: 100 },
    ],
    overallPerformance: 80,
  },
  {
    role: "student",
    name: "Priya Verma",
    subjects: [
      { name: "Mathematics", score: 95, maxScore: 100 },
      { name: "Science", score: 88, maxScore: 100 },
      { name: "English", score: 91, maxScore: 100 },
      { name: "History", score: 85, maxScore: 100 },
    ],
    overallPerformance: 90,
  },
  {
    role: "student",
    name: "Rahul Gupta",
    subjects: [
      { name: "Mathematics", score: 76, maxScore: 100 },
      { name: "Science", score: 84, maxScore: 100 },
      { name: "English", score: 80, maxScore: 100 },
      { name: "History", score: 72, maxScore: 100 },
    ],
    overallPerformance: 78,
  },
  {
    role: "student",
    name: "Anjali Patel",
    subjects: [
      { name: "Mathematics", score: 88, maxScore: 100 },
      { name: "Science", score: 85, maxScore: 100 },
      { name: "English", score: 79, maxScore: 100 },
      { name: "History", score: 92, maxScore: 100 },
    ],
    overallPerformance: 86,
  },
  {
    role: "student",
    name: "Vikram Singh",
    subjects: [
      { name: "Mathematics", score: 70, maxScore: 100 },
      { name: "Science", score: 68, maxScore: 100 },
      { name: "English", score: 75, maxScore: 100 },
      { name: "History", score: 82, maxScore: 100 },
    ],
    overallPerformance: 74,
  },
  {
    role: "student",
    name: "Neha Reddy",
    subjects: [
      { name: "Mathematics", score: 90, maxScore: 100 },
      { name: "Science", score: 92, maxScore: 100 },
      { name: "English", score: 85, maxScore: 100 },
      { name: "History", score: 88, maxScore: 100 },
    ],
    overallPerformance: 88,
  },
];

const lmsUserTypes = studentResults.map((student) => student.name);

function ResultPage() {
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentChange = (event) => {
    const selectedName = event.target.value;
    setSelectedStudentName(selectedName);
    const student = studentResults.find(
      (student) => student.name === selectedName
    );
    setSelectedStudent(student);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" style={{ color: "#ff4500" }}>
              Student Results
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Select Student</InputLabel>
              <Select
                value={selectedStudentName}
                label="Select Student"
                onChange={handleStudentChange}
              >
                {lmsUserTypes.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {selectedStudent && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Detailed Results for {selectedStudent.name}
            </Typography>
            <Grid container spacing={3} sx={{}}>
              <Grid item xs={12} md={8}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Subject Scores
                  </Typography>
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
                  width={250}
                  height={250}
                  value={selectedStudent.overallPerformance}
                  cornerRadius="50%"
                  sx={(theme) => ({
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 40,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                      fill:
                        selectedStudent.overallPerformance >= 80
                          ? "#4caf50" // Green for good performance
                          : "#ff4500", // Orange for lower performance
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                      fill: theme.palette.text.disabled,
                    },
                  })}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={styles.chartContainer}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Over All Performance 
                </Typography>
                <LineChart
                  dataset={courseCompletionData}
                  xAxis={[{ dataKey: "month", scaleType: "band" }]}
                  series={[{ dataKey: "completions", color: "#2196f3" }]}
                  height={300}
                  margin={{ left: 40, right: 40, top: 20, bottom: 30 }}
                  grid={{ vertical: true, horizontal: true }}
                />
              </Paper>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default ResultPage;
