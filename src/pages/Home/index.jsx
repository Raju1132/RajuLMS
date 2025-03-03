import React from "react";
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
  CommanTableContainMain
} from "../../style/table";

const Index = () => {
  // Static data
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

  return (
    <>
    <CommanTableContainMain>
      
        <CommanTableContain>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ position: "sticky", left: 0, top: 0, zIndex: 9 }}
                >
                  Dealer Code
                </TableCell>
                <TableCell>Dealership Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Total MoM Points</TableCell>
                <TableCell>Open MoM Points</TableCell>
                <TableCell>MoM Points Completed By Dealers</TableCell>
                <TableCell>MoM Points Closed By AM</TableCell>
                <TableCell>Escalated To AM</TableCell>
                <TableCell>Escalated To ZM</TableCell>
                <TableCell>Escalated To RM</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ position: "sticky", left: 0, zIndex: 8 }}>
                    {row.dealerCode}
                  </TableCell>
                  <TableCell>{row.dealerName}</TableCell>
                  <TableCell>{row.city || "N/A"}</TableCell>{" "}
                  {/* If city is null, show 'N/A' */}
                  <TableCell>{row.totalMom}</TableCell>
                  <TableCell>{row.openMom + row.reopenedMom}</TableCell>
                  <TableCell>{row.completedMom}</TableCell>
                  <TableCell>{row.closedMom}</TableCell>
                  <TableCell>{row.amEsc}</TableCell>
                  <TableCell>{row.zmEsc}</TableCell>
                  <TableCell>{row.rmEsc}</TableCell>
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
};

export default Index;
