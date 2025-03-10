import React, { useState, useMemo } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  TablePagination, 
  TextField, 
  Box, 
  Typography,
  Button,
  TableContainer,
  Paper,
  Modal,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from "@mui/material/styles";
import './style.css';

// Styled Components
const AnalyticsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default
}));

// Style for Modal
const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 800,
  maxHeight: '80vh',
  overflow: 'auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1)
}));

function Analytics() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ 
    key: null, 
    direction: 'ascending' 
  });
  // State for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
      
  // Mock data with MCQ modules and questions
  const data = [
    {
      moduleId: "MCQ-001",
      title: "Introduction to Programming",
      numQuestions: 15,
      questions: [
        { id: 1, text: "What is a variable in programming?", options: ["A storage location with a name", "A fixed value", "A programming language", "A type of loop"], answer: 0 },
        { id: 2, text: "Which of these is NOT a programming language?", options: ["Python", "Java", "HTML", "Selenium"], answer: 3 },
        { id: 3, text: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"], answer: 0 },
        // More questions...
      ]
    },
    {
      moduleId: "MCQ-002",
      title: "Web Development Basics",
      numQuestions: 20,
      questions: [
        { id: 1, text: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Tech Media Language", "Home Tool Markup Language"], answer: 0 },
        { id: 2, text: "Which tag is used to define a hyperlink in HTML?", options: ["<link>", "<a>", "<href>", "<url>"], answer: 1 },
        { id: 3, text: "Which of the following is NOT a CSS property?", options: ["color", "font-size", "margin", "javascript"], answer: 3 },
        // More questions...
      ]
    },
    {
      moduleId: "MCQ-003",
      title: "Data Science Fundamentals",
      numQuestions: 12,
      questions: [
        { id: 1, text: "What is the primary purpose of data cleaning in data science?", options: ["To remove all data", "To transform data to be more useful for analysis", "To create new data", "To visualize data"], answer: 1 },
        { id: 2, text: "Which of these is NOT a common machine learning algorithm?", options: ["Linear Regression", "Random Forest", "K-Means", "Data Visualization"], answer: 3 },
        // More questions...
      ]
    },
    {
      moduleId: "MCQ-004",
      title: "Project Management Quiz",
      numQuestions: 18,
      questions: [
        { id: 1, text: "What is a Gantt chart used for?", options: ["Budget tracking", "Resource allocation", "Schedule visualization", "Risk assessment"], answer: 2 },
        { id: 2, text: "What does SMART stand for in goal setting?", options: ["Simple, Measurable, Achievable, Realistic, Timely", "Specific, Measurable, Achievable, Relevant, Time-bound", "Strategic, Measurable, Actionable, Reasonable, Trackable", "Specific, Manageable, Accurate, Realistic, Testable"], answer: 1 },
        // More questions...
      ]
    },
    {
      moduleId: "MCQ-005",
      title: "Digital Marketing Assessment",
      numQuestions: 25,
      questions: [
        { id: 1, text: "What is SEO?", options: ["Search Engine Optimization", "Social Engagement Online", "Search Export Operation", "Site Engine Overlay"], answer: 0 },
        { id: 2, text: "Which metric measures the percentage of visitors who leave after viewing only one page?", options: ["Click-through rate", "Conversion rate", "Bounce rate", "Engagement rate"], answer: 2 },
        // More questions...
      ]
    },
    {
      moduleId: "MCQ-006",
      title: "Full Stack Development Test",
      numQuestions: 22,
      questions: [
        { id: 1, text: "What is REST in web development?", options: ["A programming language", "An architectural style for APIs", "A type of database", "A testing framework"], answer: 1 },
        { id: 2, text: "Which of these is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], answer: 2 },
        // More questions...
      ]
    },
    {
      moduleId: "MCQ-007",
      title: "AI Concepts Quiz",
      numQuestions: 16,
      questions: [
        { id: 1, text: "What is deep learning?", options: ["A type of machine learning using neural networks with multiple layers", "Learning while sleeping", "A type of reinforcement learning", "Learning without supervision"], answer: 0 },
        { id: 2, text: "Which of these is NOT a type of neural network?", options: ["CNN", "RNN", "GAN", "SQL"], answer: 3 },
        // More questions...
      ]
    },
    {
      moduleId: "MCQ-008",
      title: "UX/UI Design Assessment",
      numQuestions: 14,
      questions: [
        { id: 1, text: "What is a wireframe in UX design?", options: ["A 3D model", "A basic layout structure", "A type of prototype", "A testing method"], answer: 1 },
        { id: 2, text: "What is the primary purpose of user personas?", options: ["To showcase design skills", "To represent target users and guide design decisions", "To test interfaces", "To create marketing material"], answer: 1 },
        // More questions...
      ]
    },
    {
      moduleId: "MCQ-009",
      title: "Cybersecurity Quiz",
      numQuestions: 20,
      questions: [
        { id: 1, text: "What is phishing?", options: ["A type of encryption", "A social engineering attack to steal data", "A networking protocol", "A programming language"], answer: 1 },
        { id: 2, text: "What does HTTPS stand for?", options: ["Hyper Text Transfer Protocol Secure", "High Tech Transfer Protocol System", "Hyper Transfer Protocol Service", "Hyper Text Technical Protocol Standard"], answer: 0 },
        // More questions...
      ]
    },
    {
      moduleId: "MCQ-010",
      title: "Cloud Computing Test",
      numQuestions: 18,
      questions: [
        { id: 1, text: "What is SaaS?", options: ["Software as a Service", "System as a Service", "Storage as a Service", "Security as a Service"], answer: 0 },
        { id: 2, text: "Which of these is NOT a major cloud provider?", options: ["AWS", "Microsoft Azure", "Google Cloud", "Oracle Cloud"], answer: 3 },
        // More questions...
      ]
    },
  ];

  const filteredAndSortedData = useMemo(() => {
    let result = data.filter(module => 
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.moduleId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [searchTerm, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAndSortedData, page, rowsPerPage]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    }));
  };

  // Handle opening the modal to view questions
  const handleViewQuestions = (module) => {
    setSelectedModule(module);
    setModalOpen(true);
  };

  return (
    <AnalyticsContainer>    
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={2}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Questionnaire 
        </Typography>
      </Box>

      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={2}
      >
        <TextField
          variant="outlined"
          placeholder="Search modules"
          fullWidth
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: 400, mr: 2 }}
          InputProps={{
            startAdornment: <SearchIcon />
          }}
        />
      </Box>

      {/* Data Table */}
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                { key: 'moduleId', label: 'Module ID' },
                { key: 'title', label: 'Module Title' },
                { key: 'numQuestions', label: 'Number of Questions' },
                { key: 'actions', label: 'Actions' },
              ].map((column) => (
                <TableCell 
                  key={column.key}
                  onClick={() => column.key !== 'actions' && handleSort(column.key)}
                  sx={{ cursor: column.key !== 'actions' ? 'pointer' : 'default' }}
                >
                  {column.label}
                  {sortConfig.key === column.key && (
                    <span>
                      {sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}
                    </span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((module) => (
              <TableRow key={module.moduleId} hover>
                <TableCell>{module.moduleId}</TableCell>
                <TableCell>{module.title}</TableCell>
                <TableCell>{module.numQuestions}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<VisibilityIcon />}
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewQuestions(module)}
                  >
                    View Questions
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredAndSortedData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Modal for viewing questions */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="questions-modal-title"
        aria-describedby="questions-modal-description"
      >
        <ModalContainer>
          {selectedModule && (
            <>
              <Typography id="questions-modal-title" variant="h6" component="h2" gutterBottom>
                {selectedModule.title} - Questions
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Module ID: {selectedModule.moduleId} | Total Questions: {selectedModule.numQuestions}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                {selectedModule.questions.map((question, index) => (
                  <React.Fragment key={question.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={`Q${index + 1}: ${question.text}`}
                        secondary={
                          <Box component="span" display="block">
                            <Typography component="span" variant="body2" color="text.primary">
                              Options:
                            </Typography>
                            {question.options.map((option, i) => (
                              <Typography 
                                key={i} 
                                component="div" 
                                variant="body2"
                                sx={{
                                  pl: 2,
                                  backgroundColor: i === question.answer ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                                  color: i === question.answer ? 'success.main' : 'text.primary',
                                  borderLeft: i === question.answer ? '3px solid green' : 'none',
                                }}
                              >
                                {String.fromCharCode(65 + i)}. {option} {i === question.answer && " (Correct)"}
                              </Typography>
                            ))}
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < selectedModule.questions.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button variant="contained" onClick={() => setModalOpen(false)}>
                  Close
                </Button>
              </Box>
            </>
          )}
        </ModalContainer>
      </Modal>
    </AnalyticsContainer>
  );
}

export default Analytics;