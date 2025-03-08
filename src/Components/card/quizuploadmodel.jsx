import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
  Divider,
  Paper,
  Grid,
  Switch,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const QuizUploadModal = ({ open, close, courseId }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(30);
  const [passingScore, setPassingScore] = useState(70);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '',
      options: [
        { id: 1, text: '', isCorrect: true },
        { id: 2, text: '', isCorrect: false },
        { id: 3, text: '', isCorrect: false },
        { id: 4, text: '', isCorrect: false }
      ]
    }
  ]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleAddQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    setQuestions([
      ...questions,
      {
        id: newId,
        question: '',
        options: [
          { id: 1, text: '', isCorrect: true },
          { id: 2, text: '', isCorrect: false },
          { id: 3, text: '', isCorrect: false },
          { id: 4, text: '', isCorrect: false }
        ]
      }
    ]);
  };

  const handleDeleteQuestion = (questionId) => {
    if (questions.length <= 1) {
      setSnackbar({
        open: true,
        message: 'Quiz must have at least one question',
        severity: 'warning'
      });
      return;
    }
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const handleQuestionChange = (questionId, value) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, question: value } : q
    ));
  };

  const handleOptionChange = (questionId, optionId, value) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.map(o => 
            o.id === optionId ? { ...o, text: value } : o
          )
        };
      }
      return q;
    }));
  };

  const handleCorrectAnswerChange = (questionId, optionId) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.map(o => ({
            ...o,
            isCorrect: o.id === optionId
          }))
        };
      }
      return q;
    }));
  };

  const handleAddOption = (questionId) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptionId = q.options.length > 0 ? Math.max(...q.options.map(o => o.id)) + 1 : 1;
        return {
          ...q,
          options: [
            ...q.options,
            { id: newOptionId, text: '', isCorrect: false }
          ]
        };
      }
      return q;
    }));
  };

  const handleDeleteOption = (questionId, optionId) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        if (q.options.length <= 2) {
          setSnackbar({
            open: true,
            message: 'Question must have at least two options',
            severity: 'warning'
          });
          return q;
        }
        
        // Check if we're deleting the correct option
        const isCorrectOption = q.options.find(o => o.id === optionId)?.isCorrect;
        
        const filteredOptions = q.options.filter(o => o.id !== optionId);
        
        // If we deleted the correct option, set the first remaining option as correct
        if (isCorrectOption && filteredOptions.length > 0) {
          filteredOptions[0].isCorrect = true;
        }
        
        return {
          ...q,
          options: filteredOptions
        };
      }
      return q;
    }));
  };

  const handleSaveQuiz = () => {
    // Validate quiz data
    if (!quizTitle.trim()) {
      setSnackbar({
        open: true,
        message: 'Quiz title is required',
        severity: 'error'
      });
      return;
    }

    const isValid = questions.every(q => {
      if (!q.question.trim()) return false;
      if (!q.options.some(o => o.isCorrect)) return false;
      return q.options.every(o => o.text.trim() !== '');
    });

    if (!isValid) {
      setSnackbar({
        open: true,
        message: 'Please complete all questions and options',
        severity: 'error'
      });
      return;
    }

    // Prepare quiz data for submission
    const quizData = {
      title: quizTitle,
      description: quizDescription,
      timeLimit,
      passingScore,
      shuffleQuestions,
      courseId,
      questions: questions.map(q => ({
        question: q.question,
        options: q.options.map(o => ({
          text: o.text,
          isCorrect: o.isCorrect
        }))
      }))
    };

    // Here you would send the data to your backend
    console.log('Quiz data to save:', quizData);
    
    setSnackbar({
      open: true,
      message: 'Quiz saved successfully!',
      severity: 'success'
    });

    // Optional: Close the modal or reset the form
    // close();
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    maxWidth: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };

  const primaryColor = '#ff4500';

  const styles = {
    headerButton: {
      backgroundColor: primaryColor,
      color: 'white',
      '&:hover': {
        backgroundColor: '#e03e00',
      }
    },
    questionSection: {
      padding: 2,
      marginBottom: 3,
      position: 'relative'
    },
    addButton: {
      color: primaryColor,
      marginRight: 1
    },
    correctOption: {
      color: primaryColor
    },
    divider: {
      margin: '16px 0'
    }
  };

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="quiz-modal-title"
      aria-describedby="quiz-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography id="quiz-modal-title" variant="h5" component="h2" sx={{ fontWeight: 'bold', color: primaryColor }}>
            Create Quiz
          </Typography>
          <IconButton onClick={close} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Quiz General Settings */}
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Quiz Settings</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Quiz Title"
                fullWidth
                required
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Time Limit (minutes)</InputLabel>
                <Select
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  label="Time Limit (minutes)"
                >
                  {[5, 10, 15, 20, 30, 45, 60, 90, 120].map((time) => (
                    <MenuItem key={time} value={time}>{time} minutes</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Passing Score (%)"
                type="number"
                fullWidth
                required
                value={passingScore}
                onChange={(e) => setPassingScore(Math.min(100, Math.max(0, e.target.value)))}
                inputProps={{ min: 0, max: 100 }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={shuffleQuestions}
                    onChange={(e) => setShuffleQuestions(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: primaryColor,
                        '& + .MuiSwitch-track': {
                          backgroundColor: primaryColor,
                        },
                      },
                    }}
                  />
                }
                label="Shuffle Questions"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Quiz Description"
                fullWidth
                multiline
                rows={2}
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Questions Section */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Questions
          <Typography component="span" variant="body2" sx={{ ml: 1 }}>
            ({questions.length})
          </Typography>
        </Typography>

        {questions.map((question, qIndex) => (
          <Paper key={question.id} elevation={1} sx={styles.questionSection}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DragIndicatorIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Question {qIndex + 1}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                size="small"
                onClick={() => handleDeleteQuestion(question.id)}
                sx={{ color: 'error.main' }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            
            <TextField
              label="Question Text"
              fullWidth
              required
              multiline
              rows={2}
              value={question.question}
              onChange={(e) => handleQuestionChange(question.id, e.target.value)}
              sx={{ mt: 2, mb: 2 }}
            />

            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Options
            </Typography>

            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <RadioGroup
                value={question.options.findIndex(o => o.isCorrect)}
                onChange={(e) => {
                  const selectedOptionId = question.options[parseInt(e.target.value)].id;
                  handleCorrectAnswerChange(question.id, selectedOptionId);
                }}
              >
                {question.options.map((option, index) => (
                  <Box key={option.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <FormControlLabel
                      value={index}
                      control={
                        <Radio 
                          sx={{ 
                            color: primaryColor,
                            '&.Mui-checked': { color: primaryColor } 
                          }} 
                        />
                      }
                      label=""
                      sx={{ mr: 0 }}
                    />
                    <TextField
                      label={`Option ${index + 1}${option.isCorrect ? ' (Correct)' : ''}`}
                      fullWidth
                      required
                      value={option.text}
                      onChange={(e) => handleOptionChange(question.id, option.id, e.target.value)}
                      sx={{
                        '& .MuiInputLabel-root': option.isCorrect ? { color: primaryColor } : {},
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteOption(question.id, option.id)}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </RadioGroup>
            </FormControl>

            <Button
              startIcon={<AddCircleIcon />}
              onClick={() => handleAddOption(question.id)}
              sx={{ mt: 1, color: primaryColor }}
            >
              Add Option
            </Button>
          </Paper>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            startIcon={<AddCircleIcon />}
            variant="outlined"
            onClick={handleAddQuestion}
            sx={{ borderColor: primaryColor, color: primaryColor }}
          >
            Add Question
          </Button>
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            onClick={handleSaveQuiz}
            sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: '#e03e00' } }}
          >
            Save Quiz
          </Button>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default QuizUploadModal;