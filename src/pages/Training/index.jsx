import './style.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import Card from '../../Components/card/Card';
import * as React from 'react';
import { Modal, Box } from '@mui/material';

function Training() {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [courseData, setCourseData] = React.useState([
    {
      title: 'Introduction to Programming',
      description:
        "A beginner's course in programming, focusing on the fundamentals of Python.",
      pdfFile: 'pdf.pdf',
      fromDate: '15/01/2025',
      toDate: '31/03/2025',
      status: 'Approved',
    },
    {
      title: 'Advanced Web Development',
      description:
        'Dive deeper into web development with HTML, CSS, JavaScript, and modern frameworks.',
      pdfFile: 'web.pdf',
      fromDate: '01/02/2025',
      toDate: '19/04/2025',
      status: 'In Process',
    },
    {
      title: 'Data Science and Machine Learning',
      description:
        'Learn data manipulation, machine learning algorithms, and data visualization techniques using Python.',
      pdfFile: 'ML.pdf',
      fromDate: '10/01/2025',
      toDate: '16/03/2025',
      status: 'In Process',
    },
    {
      title: 'Project Management Essentials',
      description:
        'Understand the basics of project management, including planning, scheduling, and executing projects.',
      pdfFile: 'Management.pdf',
      fromDate: '25/02/2025',
      toDate: '05/04/2025',
      status: 'Approved',
    },
    {
      title: 'Digital Marketing Strategy',
      description:
        'Master the essentials of digital marketing, SEO, content creation, and social media strategies.',
      pdfFile: 'Marketing.pdf',
      fromDate: '20/01/2025',
      toDate: '25/03/2025',
      status: 'Rejected',
    },
  ]);

  const [newCourse, setNewCourse] = React.useState({
    title: '',
    description: '',
    pdfFile: '',
    fromDate: '',
    toDate: '',
    dayLeft: '',
    courseComplete: '0%',
    status: 'In Process',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewCourse({
      title: '',
      description: '',
      pdfFile: '',
      fromDate: '',
      toDate: '',
      dayLeft: '',
      courseComplete: '0%',
      status: 'In Process',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected PDF:', file.name);
      // Update newCourse state with the selected PDF file name
      setNewCourse((prevCourse) => ({
        ...prevCourse,
        pdfFile: file.name,
      }));
    }
  };

  const handleUpdateCourse = (index, updatedData) => {
    setCourseData((prevCourses) => {
      const updatedCourses = [...prevCourses];
      updatedCourses[index] = {
        ...updatedCourses[index],
        ...updatedData,
        dayLeft: calculateDaysLeft(updatedData.fromDate, updatedData.toDate),
      };
      return updatedCourses;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newCourse.title &&
      newCourse.description &&
      newCourse.fromDate &&
      newCourse.toDate
    ) {
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return day/month/year;
      };

      setCourseData([
        ...courseData,
        {
          ...newCourse,
          fromDate: formatDate(newCourse.fromDate),
          toDate: formatDate(newCourse.toDate),
          dayLeft: calculateDaysLeft(newCourse.fromDate, newCourse.toDate),
          courseComplete: '0%',
        },
      ]);
      handleClose();
    }
  };

  const calculateDaysLeft = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate - startDate;
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courseData.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );


  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    border: 'none',
    overflow: 'auto',
  };

  return (
    <div className="container">
      <div className="topbar">
        <div className="input">
          <input
            type="text"
            placeholder="Search Training"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span>
            <SearchIcon />
          </span>
        </div>
        <div className="button" onClick={handleOpen}>
          <CreateIcon />
          Create Training
        </div>
      </div>

      <div className="navbar">Training</div>
      <div className="center">
        <div className="card_containers">
          {filteredCourses.map((course, index) => (
            <Card
              key={index}
              value={course}
              onUpdate={(updatedData) => handleUpdateCourse(index, updatedData)}
            />
          ))}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="flex_between">
                <div className="title color center">Add New Training</div>
                <CloseIcon onClick={handleClose} className="icon" />
              </div>
              <div className="flex_col">
                <label htmlFor="title">Training Title</label>
                <input
                  type="text"
                  className="form_input"
                  name="title"
                  value={newCourse.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter training title"
                />
              </div>
              <div className="flex_col">
                <label htmlFor="description">Training Description</label>
                <textarea
                  name="description"
                  className="form_input textarea"
                  value={newCourse.description}
                  onChange={handleChange}
                  required
                  placeholder="Enter training description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="pdfFile">Upload PDF</label>
                <input
                  type="file"
                  id="pdfFile"
                  name="pdfFile"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="pdf-input"
                />
              </div>

              <div className="flexbox">
                <div className="flex_col">
                  <label htmlFor="fromDate">From Date: </label>
                  <input
                    type="date"
                    className="form_input"
                    name="fromDate"
                    value={newCourse.fromDate}
                    onChange={handleChange}
                    required
                    placeholder="DD/MM/YYYY"
                  />
                </div>

                <div className="flex_col">
                  <label htmlFor="toDate">To Date: </label>
                  <input
                    type="date"
                    className="form_input"
                    name="toDate"
                    value={newCourse.toDate}
                    onChange={handleChange}
                    required
                    placeholder="DD/MM/YYYY"
                  />
                </div>
              </div>
              <div className="modal-buttons flexbox">
              <button
                  className="button cancel-button"
                  type="button"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                
                <button className="button submit-button" type="submit">
                  Create
                </button>
                
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Training;