import { useEffect, useState } from "react";
import "./card.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

function Card({ key, value, onUpdate }) {
  const [dayLeft, setDayLeft] = useState(0);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: value.title,
    description: value.description,
    fromDate: value.fromDate,
    toDate: value.toDate,
    status: value.status
  });

  const calculateDaysLeft = (fromDate, toDate) => {
    const parseDate = (dateString) => {
      const [day, month, year] = dateString.split('/');
      return new Date(`${year}-${month}-${day}`);
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

  const handleInputChange = (e) => {
    const { name, value: inputValue } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: inputValue
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(value.id, editFormData);
    }
    handleEditClose();
  };

  // Calculate completion percentage for progress bar
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'approved':
        return '#4CAF50';
      case 'in process':
        return '#2196F3';
      case 'rejected':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    p: 4,
    width: '80%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto'
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
            <div className="Status" style={{ backgroundColor: getStatusColor(value.status) }}>
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
        <Box sx={modalStyle}>
          <div className="modal-header flex_between">
            <Typography id="view-modal-title" variant="h6" component="h2">
              Training Details
            </Typography>
            <CloseIcon onClick={handleViewClose} className="close-icon" />
          </div>
          
          <div className="modal-content">
            <div className="detail-row flex_between">
              <Typography variant="subtitle1" className="detail-label">Title:</Typography>
              <Typography variant="body1">{value.title}</Typography>
            </div>
            
            <div className="detail-row flex_between">
              <Typography variant="subtitle1" className="detail-label">Description:</Typography>
              <Typography variant="body1">{value.description}</Typography>
            </div>
            
            <div className="detail-row flex_between">
              <Typography variant="subtitle1" className="detail-label">Start Date:</Typography>
              <Typography variant="body1">{value.fromDate}</Typography>
            </div>
            
            <div className="detail-row flex_between">
              <Typography variant="subtitle1" className="detail-label">End Date:</Typography>
              <Typography variant="body1">{value.toDate}</Typography>
            </div>
            
            <div className="detail-row flex_between">
              <Typography variant="subtitle1" className="detail-label">Days Left:</Typography>
              <Typography variant="body1">{dayLeft}</Typography>
            </div>
                        
            <div className="detail-row">
              <Typography variant="subtitle1" className="detail-label">Status:</Typography>
              <div className="Status " style={{ backgroundColor: getStatusColor(value.status) }}>
                {value.status}
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={editModalOpen}
        onClose={handleEditClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="modal-header flex_between">
            <Typography id="edit-modal-title" variant="h6" component="h2">
              Edit Training
            </Typography>
            <CloseIcon onClick={handleEditClose} className="close-icon" />
          </div>
          
          <form onSubmit={handleEditSubmit} className="edit-form">
            <div className="form-group flex_between">
              <label htmlFor="title">Title</label>
              <TextField
                fullWidth
                id="title"
                name="title"
                value={editFormData.title}
                onChange={handleInputChange}
                required
                variant="outlined"
                size="small"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <TextField
                fullWidth
                id="description"
                name="description"
                value={editFormData.description}
                onChange={handleInputChange}
                required
                variant="outlined"
                multiline
                rows={4}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="fromDate">Start Date (DD/MM/YYYY)</label>
                <TextField
                  fullWidth
                  id="fromDate"
                  name="fromDate"
                  value={editFormData.fromDate}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  placeholder="DD/MM/YYYY"
                  size="small"
                />
              </div>
              
              <div className="form-group half">
                <label htmlFor="toDate">End Date (DD/MM/YYYY)</label>
                <TextField
                  fullWidth
                  id="toDate"
                  name="toDate"
                  value={editFormData.toDate}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  placeholder="DD/MM/YYYY"
                  size="small"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={editFormData.status}
                onChange={handleInputChange}
                className="status-select"
              >
                <option value="Approved">Approved</option>
                <option value="In Process">In Process</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            
            <div className="form-actions">
              <Button 
                variant="contained" 
                type="submit"
                sx={{ 
                  bgcolor: '#4CAF50', 
                  '&:hover': { bgcolor: '#388E3C' },
                  mr: 2
                }}
              >
                Save Changes
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleEditClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
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