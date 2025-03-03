import "./style.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import {
  CommanTableContain,
  PaginationContain,
  CommanTableContainMain,
} from "../../style/table";
function Analytics() {
  const tableData = [
    {
      dealerCode: "D001",
      dealerName: "Dealer One",
      city: "City One",
      totalMom: 100,
      openMom: 50,
      reopenedMom: 10,
      completedMom: 30,
      closedMom: 20,
      amEsc: 5,
      zmEsc: 3,
      rmEsc: 2,
    },
    {
      dealerCode: "D002",
      dealerName: "Dealer Two",
      city: "City Two",
      totalMom: 150,
      openMom: 60,
      reopenedMom: 20,
      completedMom: 50,
      closedMom: 40,
      amEsc: 6,
      zmEsc: 2,
      rmEsc: 1,
    },
    {
      dealerCode: "D003",
      dealerName: "Dealer Three",
      city: "City Three",
      totalMom: 200,
      openMom: 80,
      reopenedMom: 30,
      completedMom: 70,
      closedMom: 60,
      amEsc: 7,
      zmEsc: 4,
      rmEsc: 3,
    },
    // Add more static data as needed
  ];

  const totalCount = tableData.length; // Number of rows
  const page = 0; // Page number
  const rowsPerPage = 5; // Number of rows per page

  const handlePageChange = (event, newPage) => {
    // Handle page change here
  };

  const handleRowsPerPageChange = (event) => {
    // Handle rows per page change here
  };
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
      raiting: "4.3",
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
      raiting: "4.7",
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
      raiting: "4.5",
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
      raiting: "4.0",
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
      raiting: "4.8",
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
      raiting: "4.6",
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
      raiting: "4.4",
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
      raiting: "4.2",
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
      raiting: "3.9",
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
      raiting: "4.5",
    },
  ];

  return (
    <>
      <div className="analytics_container">
        <div className="small_card">
          <span>10</span>
          <p>Total</p>
        </div>
        <div className="small_card">
          <span>0</span>
          <p>Pending</p>
        </div>
        <div className="small_card">
          <span>43</span>
          <p>In Process</p>
        </div>
        <div className="small_card">
          <span>138</span>
          <p>Resolve</p>
        </div>
      </div>
      <CommanTableContainMain>
        <CommanTableContain>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ position: "sticky", left: 0, top: 0, zIndex: 9 }}
                >
                  Course Title
                </TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Days Left</TableCell>
                <TableCell>Completion</TableCell>
                <TableCell>Number of Students</TableCell>
                <TableCell>Revenue</TableCell>
                <TableCell>Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ position: "sticky", left: 0, zIndex: 8 }}>
                    {row.title}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.fromDate}</TableCell>
                  <TableCell>{row.afterDate}</TableCell>
                  <TableCell>{row.dayLeft}</TableCell>
                  <TableCell>{row.courseComplete}</TableCell>
                  <TableCell>{row.numberOfStudent}</TableCell>
                  <TableCell>{row.revenue}</TableCell>
                  <TableCell>{row.raiting}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CommanTableContain>

        {/* Pagination */}
        <PaginationContain>
          <TablePagination
            component="div"
            count={totalCount} // Total number of items from API
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange} // Option to handle rows per page change
          />
        </PaginationContain>
      </CommanTableContainMain>
    </>
  );
}

export default Analytics;
