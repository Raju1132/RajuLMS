import { useEffect, useState } from "react";
import "./card.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { Modal, Box, Typography, Input , Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import UploadModulesModal from "./uploadmodel";

function Card({ key, value, onUpdate }) {
  const [dayLeft, setDayLeft] = useState(0);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: value.title,
    description: value.description,
    pdfFile: value.pdfFile,
    fromDate: value.fromDate,
    toDate: value.toDate,
    status: value.status,
  });

 

  const calculateDaysLeft = (fromDate, toDate) => {
    const parseDate = (dateString) => {
      const [day, month, year] = dateString.split("/");
      return new Date(year, month, day);
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

  const handlePdfOpen = () => setPdfModalOpen(true);
  const handlePdfClose = () => setPdfModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value: inputValue } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: inputValue,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(editFormData);
    }
    handleEditClose();
  };



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

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "8px",
    p: 4,
    width: "80%",
    maxWidth: "500px",
    maxHeight: "90vh",
    overflow: "auto",
  };

  const pdfModalStyle = {
    ...modalStyle,
    width: "90%",
    maxWidth: "600px",
    height: "90vh",
  };

  return (
    <div className="card" key={key}>
      <div className="">
        <div className="padding">
          <div className="title">{value.title}</div>
          <div className="description">
            <ReadMore>{value.description}</ReadMore>
          </div>
        </div>
      </div>
      <div className="padding">
        <div className="flexbox">
          <div className="date">
            Valid: {value.fromDate} - {value.toDate}
          </div>
          <div className="date color"> Days Left: {dayLeft}</div>
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

      {/* View Details Modal */}
      <Modal
        open={viewModalOpen}
        onClose={handleViewClose}
        aria-labelledby="view-modal-title"
        aria-describedby="view-modal-description"
      >
        <Box sx={modalStyle} className="">
          <div className="modal-header flex_between mb10">
            <Typography id="view-modal-title" variant="h6" component="h2">
              Training Details
            </Typography>
            <CloseIcon onClick={handleViewClose} className="close-icon" />
          </div>

          <div className="modal-content mb10">
            <div className="detail-row flex_between">
              <Typography variant="subtitle1" className="detail-label mb10">
                Title:
              </Typography>
              <Typography variant="body1">{value.title}</Typography>
            </div>

            <div className="detail-row flex_description mb10">
              <Typography variant="subtitle1" className="detail-label">
                Description:
              </Typography>
              <Typography variant="body1 " className="decription">
                {value.description}
              </Typography>
            </div>

            <div className="detail-row flex_between mb10">
              <Typography variant="subtitle1" className="detail-label">
                Pdf:
              </Typography>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Typography variant="body1">{value.pdfFile}</Typography>
                {value.pdfFile && (
                  <PictureAsPdfIcon
                    color="error"
                    onClick={handlePdfOpen}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </div>

            <div className="detail-row flex_between mb10">
              <Typography variant="subtitle1" className="detail-label">
                Start Date:
              </Typography>
              <Typography variant="body1">{value.fromDate}</Typography>
            </div>

            <div className="detail-row flex_between mb10">
              <Typography variant="subtitle1" className="detail-label">
                End Date:
              </Typography>
              <Typography variant="body1">{value.toDate}</Typography>
            </div>

            <div className="detail-row flex_between mb10">
              <Typography variant="subtitle1" className="detail-label">
                Days Left:
              </Typography>
              <Typography variant="body1">{dayLeft}</Typography>
            </div>

            <div className="detail-row flex_between mb10">
              <Typography variant="subtitle1" className="detail-label">
                Status:
              </Typography>
              <div
                className="Status "
                style={{ backgroundColor: getStatusColor(value.status) }}
              >
                {value.status}
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={pdfModalOpen}
        onClose={handlePdfClose}
        aria-labelledby="pdf-modal-title"
      >
        <Box sx={pdfModalStyle}>
          <div className="modal-header flex_between mb10">
            <Typography id="pdf-modal-title" variant="h6" component="h2">
              PDF Viewer - {value.pdfFile}
            </Typography>
            <CloseIcon onClick={handlePdfClose} className="close-icon" />
          </div>

          <div
            style={{
              width: "100%",
              height: "calc(90vh - 100px)",
              border: "1px solid #ddd",
            }}
          >
            <iframe
              src={`/${value.pdfFile}`}
              width="100%"
              height="100%"
              title="PDF Viewer"
              style={{ border: "none" }}
            />
          </div>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <UploadModulesModal open={editModalOpen} handleClose={handleEditClose} />

    </div>
  );
}

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
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
