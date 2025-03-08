import { useEffect, useState } from "react";
import "./card.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ViewModulesModel from "./viewmodel";
import EditModel from './editmodel';
import UploadModulesModel from "./uploadmodel";

function Card({ key, value, onUpdate }) {
  const [dayLeft, setDayLeft] = useState(0);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const calculateDaysLeft = (fromDate, toDate) => {
    const parseDate = (dateString) => {
      const [day, month, year] = dateString.split("/");
      return new Date(year, month - 1, day); // Fixed the month offset
    };

    const startDate = parseDate(fromDate);
    const endDate = parseDate(toDate);
    const timeDifference = endDate - startDate;
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysLeft;
  };

  useEffect(() => {
    const days = calculateDaysLeft(value.fromDate, value.toDate);
    setDayLeft(days);
  }, [value.fromDate, value.toDate]);

  const handleViewOpen = () => setViewModalOpen(true);
  const handleViewClose = () => setViewModalOpen(false);

  const handleEditOpen = () => setEditModalOpen(true);
  const handleEditClose = () => setEditModalOpen(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "#4CAF50";
      case "in process":
        return "#2196F3";
      case "rejected":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <div className="card" key={key}>
      <div className="padding">
        <div className="title">{value.title}</div>
        <div className="description">
          <ReadMore>{value.description}</ReadMore>
        </div>
      </div>
      <div className="padding">
        <div className="flexbox">
          <div className="date">
            Valid: {value.fromDate} - {value.toDate}
          </div>
          <div className="date color">Days Left: {dayLeft}</div>
        </div>
        <div className="flex_between">
          <div className="flexbox">
            Status:
            <div
              className="Status"
              style={{ backgroundColor: getStatusColor(value.status) }}
            >
              {value.status}
            </div>
          </div>
          <div className="icons_container">
            <VisibilityIcon className="icon" onClick={handleViewOpen} />
            <EditIcon className="icon" onClick={handleEditOpen} />
          </div>
        </div>
      </div>

      {/* View Details Model */}
      <ViewModulesModel
        open={viewModalOpen}
        handleClose={handleViewClose}
        value={value}
        dayLeft={dayLeft}
        getStatusColor={getStatusColor}
      />

      {/* Edit Modal */}
      <EditModel 
        value={value} 
        onUpdate={onUpdate}  
        editModalOpen={editModalOpen} 
        handleEditClose={handleEditClose} 
      />
       {/* <UploadModulesModel open={editModalOpen} handleClose={handleEditClose} /> */}
    </div>
  );
}

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => setIsReadMore(!isReadMore);

  return (
    <p className="text">
      {isReadMore ? text.slice(0, 50) : text}
      <span
        onClick={toggleReadMore}
        className="read-or-hide"
        style={{ color: "#ff4500", cursor: "pointer" }}
      >
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

export default Card;
