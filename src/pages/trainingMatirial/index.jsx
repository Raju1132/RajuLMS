import SearchIcon from '@mui/icons-material/Search';
import React from "react";
import "./style.css";
import TrainingCard from './TrainingCard';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';

function TrainingMatirial() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [courseData, setCourseData] = React.useState([
    {
      moduleId: "M001",
      title: "Introduction to Programming",
      objective:
        "Learn the fundamentals of programming with a focus on Python.",
      duration: "6 weeks",
      content: [
        {
          week: 1,
          topic: "Introduction to Python and Programming Concepts",
          details:
            "Cover the basics of Python, including syntax, variables, and data types.",
          file: "week1_introduction_to_python.pdf",
        },
        {
          week: 2,
          topic: "Control Structures and Functions",
          details:
            "Explore conditional statements, loops, and how to define functions in Python.",
          file: "week2_control_structures_functions.pdf",
        },
        {
          week: 3,
          topic: "Working with Collections (Lists, Tuples, Dictionaries)",
          details:
            "Learn how to store and manipulate data using Python collections.",
          file: "week3_collections_in_python.pdf",
        },
        {
          week: 4,
          topic: "File Handling and Exceptions",
          details:
            "Understand how to read, write files, and handle exceptions in Python.",
          file: "week4_file_handling_exceptions.pdf",
        },
        {
          week: 5,
          topic: "Introduction to Object-Oriented Programming (OOP)",
          details: "Learn the basics of classes and objects in Python.",
          file: "week5_oop_in_python.pdf",
        },
        {
          week: 6,
          topic: "Final Project",
          details:
            "Build a simple Python project that incorporates all learned concepts.",
          file: "week6_final_project_guide.pdf",
        },
      ],
      assessment: [
        {
          quizId: "Q001",
          title: "Python Basics Quiz",
          questions: [
            {
              question: "What is a Python list?",
              options: [
                "A collection of data",
                "A type of variable",
                "A function",
              ],
              correctAnswer: "A collection of data",
            },
            {
              question: "How do you define a function in Python?",
              options: [
                "def function_name():",
                "function_name = def()",
                "function def():",
              ],
              correctAnswer: "def function_name():",
            },
          ],
        },
      ],
    },
    {
      moduleId: "M002",
      title: "Advanced Web Development",
      objective:
        "Deepen your knowledge in web development with modern technologies and frameworks.",
      duration: "8 weeks",
      content: [
        {
          week: 1,
          topic: "HTML5 and CSS3: Advanced Layout Techniques",
          details:
            "Learn advanced HTML5 and CSS3 concepts, including Flexbox and Grid Layout.",
          file: "week1_html_css_layouts.pdf",
        },
        {
          week: 2,
          topic: "JavaScript Essentials: DOM Manipulation",
          details:
            "Understand how to manipulate HTML elements and handle events with JavaScript.",
          file: "week2_js_dom_manipulation.pdf",
        },
        {
          week: 3,
          topic: "Responsive Web Design with Bootstrap",
          details:
            "Master the Bootstrap framework to build mobile-first responsive websites.",
          file: "week3_responsive_design_bootstrap.pdf",
        },
        {
          week: 4,
          topic: "JavaScript Frameworks: React Introduction",
          details:
            "Get introduced to React and how to build dynamic, component-based UIs.",
          file: "week4_react_intro.pdf",
        },
        {
          week: 5,
          topic: "Advanced JavaScript: ES6+ Features",
          details:
            "Learn modern JavaScript features such as arrow functions, promises, and async/await.",
          file: "week5_advanced_js_es6.pdf",
        },
        {
          week: 6,
          topic: "API Integration and Fetch Requests",
          details:
            "Learn how to fetch data from external APIs and integrate it into your website.",
          file: "week6_api_integration_fetch.pdf",
        },
        {
          week: 7,
          topic: "JavaScript Testing and Debugging",
          details:
            "Understand how to test your JavaScript code using testing libraries and debuggers.",
          file: "week7_js_testing_debugging.pdf",
        },
        {
          week: 8,
          topic: "Final Project: Building a Full Web Application",
          details:
            "Create a dynamic web application using the technologies learned throughout the course.",
          file: "week8_final_project_web_application.pdf",
        },
      ],
      assessment: [
        {
          quizId: "Q002",
          title: "Web Development Quiz",
          questions: [
            {
              question: "What is the purpose of the CSS Flexbox model?",
              options: [
                "Align items in a row or column",
                "Create grid layouts",
                "Both",
              ],
              correctAnswer: "Both",
            },
            {
              question:
                "Which JavaScript method is used to fetch data from an API?",
              options: ["fetch()", "getData()", "load()"],
              correctAnswer: "fetch()",
            },
          ],
        },
      ],
    },
    {
      moduleId: "M003",
      title: "Data Science and Machine Learning",
      objective:
        "Learn the fundamentals of data science, machine learning algorithms, and data visualization using Python.",
      duration: "8 weeks",
      content: [
        {
          week: 1,
          topic: "Introduction to Data Science and Python Libraries",
          details:
            "Get familiar with essential libraries like Pandas, NumPy, and Matplotlib.",
          file: "week1_data_science_libraries.pdf",
        },
        {
          week: 2,
          topic: "Data Cleaning and Preprocessing",
          details:
            "Learn techniques to clean and preprocess data for machine learning models.",
          file: "week2_data_cleaning_preprocessing.pdf",
        },
        {
          week: 3,
          topic: "Data Visualization Techniques",
          details:
            "Explore data visualization techniques using Matplotlib and Seaborn.",
          file: "week3_data_visualization.pdf",
        },
        {
          week: 4,
          topic: "Introduction to Machine Learning Algorithms",
          details:
            "Understand basic machine learning algorithms like linear regression and decision trees.",
          file: "week4_machine_learning_algorithms.pdf",
        },
        {
          week: 5,
          topic: "Supervised Learning: Regression and Classification",
          details:
            "Learn about supervised learning models for predicting continuous values and classifying data.",
          file: "week5_supervised_learning.pdf",
        },
        {
          week: 6,
          topic: "Unsupervised Learning: Clustering and Association",
          details:
            "Explore unsupervised learning techniques such as K-means clustering and Apriori algorithm.",
          file: "week6_unsupervised_learning.pdf",
        },
        {
          week: 7,
          topic: "Model Evaluation and Tuning",
          details:
            "Learn how to evaluate and improve the performance of machine learning models.",
          file: "week7_model_evaluation_tuning.pdf",
        },
        {
          week: 8,
          topic: "Final Project: Machine Learning Application",
          details:
            "Apply your knowledge to build a machine learning model and deploy it on real data.",
          file: "week8_final_project_machine_learning.pdf",
        },
      ],
      assessment: [
        {
          quizId: "Q003",
          title: "Data Science Quiz",
          questions: [
            {
              question: "Which Python library is used for data manipulation?",
              options: ["NumPy", "Pandas", "Matplotlib"],
              correctAnswer: "Pandas",
            },
            {
              question: "What does supervised learning involve?",
              options: [
                "Training with labeled data",
                "Training with unlabeled data",
                "None of the above",
              ],
              correctAnswer: "Training with labeled data",
            },
          ],
        },
      ],
    },
    {
      moduleId: "M004",
      title: "Project Management Essentials",
      objective:
        "Understand the basics of project management, including planning, scheduling, and executing projects.",
      duration: "6 weeks",
      content: [
        {
          week: 1,
          topic: "Introduction to Project Management",
          details:
            "Understand the roles and responsibilities of a project manager.",
          file: "week1_project_management_intro.pdf",
        },
        {
          week: 2,
          topic: "Project Planning: Scope, Goals, and Deliverables",
          details:
            "Learn how to define project goals, scope, and deliverables.",
          file: "week2_project_planning.pdf",
        },
        {
          week: 3,
          topic: "Risk Management and Budgeting",
          details:
            "Understand how to identify and manage project risks and budget effectively.",
          file: "week3_risk_management_budgeting.pdf",
        },
        {
          week: 4,
          topic: "Project Scheduling and Time Management",
          details:
            "Learn about scheduling tools like Gantt charts and time management techniques.",
          file: "week4_scheduling_time_management.pdf",
        },
        {
          week: 5,
          topic: "Team Management and Communication",
          details:
            "Understand how to manage teams and communicate effectively with stakeholders.",
          file: "week5_team_management_communication.pdf",
        },
        {
          week: 6,
          topic: "Project Closing and Evaluation",
          details:
            "Learn the process of closing a project and evaluating its success.",
          file: "week6_project_closing_evaluation.pdf",
        },
      ],
      assessment: [
        {
          quizId: "Q004",
          title: "Project Management Quiz",
          questions: [
            {
              question: "What is the purpose of a project Gantt chart?",
              options: [
                "To track project progress",
                "To define project goals",
                "To allocate project resources",
              ],
              correctAnswer: "To track project progress",
            },
            {
              question: "Which is the first step in project planning?",
              options: ["Define scope", "Allocate resources", "Assign tasks"],
              correctAnswer: "Define scope",
            },
          ],
        },
      ],
    },
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courseData.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container">
      <Box className="input" sx={{width:400}} >
          <TextField
          sx={{width:"100%"}}
            type="text"
            placeholder="Search Training"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span>
            <SearchIcon />
          </span>
        </Box>
      <div className="card_containers">
        {filteredCourses.map((value,key) => {
          return <TrainingCard value={value} key={key}/> 
          })}
      </div>
    </div>
  );
}

export default TrainingMatirial;
