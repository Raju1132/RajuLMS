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
  Paper
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from "@mui/material/styles";
import './style.css'

// Styled Components
const AnalyticsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
  gap: theme.spacing(2)
}));

const StatCard = styled(Paper)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  borderRadius: theme.spacing(1)
}));

function Analytics() {
  // State Management
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ 
    key: null, 
    direction: 'ascending' 
  });
      
  const data = [
    {
      title: "Introduction to Programming",
      description:
        "A beginner's course in programming, focusing on the fundamentals of Python.",
      fromDate: "15/01/25",
      afterDate: "15/03/25",
      dayLeft: "15",
      courseComplete: "45%",
      numberOfStudent: "246",
      revenue: "985299",
      rating: "4.3",
      status: "In Process",  
    },
    {
      title: "Advanced Web Development",
      description:
        "A deep dive into web development using HTML, CSS, JavaScript, and modern frameworks.",
      fromDate: "01/02/25",
      afterDate: "01/04/25",
      dayLeft: "33",
      courseComplete: "60%",
      numberOfStudent: "320",
      revenue: "1280450",
      rating: "4.7",
      status: "Approved",  
    },
    {
      title: "Data Science and Machine Learning",
      description:
        "Learn data analysis, machine learning algorithms, and data visualization using Python.",
      fromDate: "10/01/25",
      afterDate: "10/05/25",
      dayLeft: "70",
      courseComplete: "30%",
      numberOfStudent: "185",
      revenue: "752800",
      rating: "4.5",
      status: "In Process",  
    },
    {
      title: "Project Management Essentials",
      description:
        "Understand the fundamentals of project management, from planning to execution.",
      fromDate: "05/02/25",
      afterDate: "05/04/25",
      dayLeft: "25",
      courseComplete: "20%",
      numberOfStudent: "150",
      revenue: "640000",
      rating: "4.0",
      status: "Rejected",  
    },
    {
      title: "Digital Marketing Strategy",
      description:
        "Master SEO, content marketing, and social media strategies for digital growth.",
      fromDate: "20/01/25",
      afterDate: "20/03/25",
      dayLeft: "20",
      courseComplete: "70%",
      numberOfStudent: "512",
      revenue: "2500000",
      rating: "4.8",
      status: "Approved",  
    },
    {
      title: "Full Stack Web Development",
      description:
        "A comprehensive course on building modern web applications with Node.js, React, and databases.",
      fromDate: "01/03/25",
      afterDate: "01/06/25",
      dayLeft: "60",
      courseComplete: "50%",
      numberOfStudent: "400",
      revenue: "1800000",
      rating: "4.6",
      status: "In Process",  
    },
    {
      title: "Introduction to Artificial Intelligence",
      description:
        "An entry-level course exploring the concepts and applications of artificial intelligence.",
      fromDate: "25/01/25",
      afterDate: "25/03/25",
      dayLeft: "30",
      courseComplete: "35%",
      numberOfStudent: "290",
      revenue: "1150000",
      rating: "4.4",
      status: "In Process",  
    },
    {
      title: "UX/UI Design Fundamentals",
      description:
        "Learn the principles of user experience and user interface design for modern apps.",
      fromDate: "15/02/25",
      afterDate: "15/04/25",
      dayLeft: "45",
      courseComplete: "50%",
      numberOfStudent: "205",
      revenue: "820000",
      rating: "4.2",
      status: "Approved",  
    },
    {
      title: "Cybersecurity Basics",
      description:
        "Understand the essential concepts of cybersecurity, risk management, and data protection.",
      fromDate: "01/04/25",
      afterDate: "01/06/25",
      dayLeft: "80",
      courseComplete: "10%",
      numberOfStudent: "132",
      revenue: "400000",
      rating: "3.9",
      status: "Rejected",  
    },
    {
      title: "Introduction to Cloud Computing",
      description:
        "Learn the basics of cloud computing and how to use major platforms like AWS, Azure, and Google Cloud.",
      fromDate: "10/03/25",
      afterDate: "10/06/25",
      dayLeft: "60",
      courseComplete: "65%",
      numberOfStudent: "478",
      revenue: "1900000",
      rating: "4.5",
      status: "In Process",  
    },
  ];

  
  const filteredAndSortedData = useMemo(() => {
    let result = data.filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting Logic
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

  // Pagination Logic
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAndSortedData, page, rowsPerPage]);

  // Event Handlers
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

  // Calculate Statistics
  const statistics = {
    total: data.length,
    rejected: data.filter(course => parseInt(course.courseComplete) < 20).length,
    inProcess: data.filter(course => 
      parseInt(course.courseComplete) >= 20 && 
      parseInt(course.courseComplete) < 80
    ).length,
    approved: data.filter(course => parseInt(course.courseComplete) >= 80).length
  };

  return (
    <AnalyticsContainer>
      {/* Statistics Cards */}

      <div className="analytics_container">
        <div className="small_card">
          <span>{statistics.total}</span>
          <p>Total</p>
        </div>
        <div className="small_card">
          <span>{statistics.rejected}</span>
          <p>Rejected</p>
        </div>
        <div className="small_card">
          <span>{statistics.inProcess}</span>
          <p>In Process</p>
        </div>
        <div className="small_card">
          <span>{statistics.approved}</span>
          <p>Approved</p>
        </div>
      </div>

      {/* Search and Filter */}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={2}
      >
        <TextField
          variant="outlined"
          placeholder="Search courses"
          fullWidth
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: 400, mr: 2 }}
          InputProps={{
            startAdornment: <SearchIcon />
          }}
        />
        <Button 
          variant="outlined" 
          startIcon={<FilterListIcon />}
        >
          Filter
        </Button>
      </Box>

      {/* Data Table */}
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                { key: 'title', label: 'Course Title' },
                { key: 'description', label: 'Description' },
                { key: 'fromDate', label: 'Start Date' },
                { key: 'afterDate', label: 'End Date' },
                { key: 'dayLeft', label: 'Days Left' },
                { key: 'courseComplete', label: 'Completion' },
                { key: 'numberOfStudent', label: 'Students' },
                { key: 'revenue', label: 'Revenue' },
                { key: 'rating', label: 'Rating' }
              ].map((column) => (
                <TableCell 
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  sx={{ cursor: 'pointer' }}
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
            {paginatedData.map((row, index) => (
              <TableRow key={index} hover>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.fromDate}</TableCell>
                <TableCell>{row.afterDate}</TableCell>
                <TableCell>{row.dayLeft}</TableCell>
                <TableCell>{row.courseComplete}</TableCell>
                <TableCell>{row.numberOfStudent}</TableCell>
                <TableCell>${row.revenue.toLocaleString()}</TableCell>
                <TableCell>{row.rating}</TableCell>
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
    </AnalyticsContainer>
  );
}

export default Analytics;