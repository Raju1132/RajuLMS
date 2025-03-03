import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HelpIcon from "@mui/icons-material/Help";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

function Support() {
  const [formData, setFormData] = useState({ subjectType: "", message: "" });
  const [openModal, setOpenModal] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [showCheck, setShowCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTicketId = () => {
    return Math.floor(10000 + Math.random() * 90000);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleRequest = async () => {
    if (!formData.subjectType) {
      toast.error("Subject is required.");
      return;
    }

    if (!formData.message) {
      toast.error("Message is required.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      console.log("Sending payload:", formData);

      const response = await supportRequest({ payload: formData });
      console.log("API Response:", response);

      if (response?.success) {
        toast.success("Ticket generated successfully!");
        setFormData({ subjectType: "", message: "" });
      } else {
        toast.error("Failed to generate ticket. Invalid response from server.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to submit the ticket. Please try again.");
      toast.error("Failed to submit the ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Typography variant="body1">
          <Link
            to={"/ticket-history"}
            style={{
              textDecoration: "underline",
              color: "#ff4500",
              fontWeight: "bold",
            }}
          >
            Check Ticket History
          </Link>
        </Typography>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />

      <Box textAlign="center" mb={6}>
        <Typography variant="h4" gutterBottom style={{ color: "#ff4500" }}>
          Support Center
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Find the help you need for your automotive field audit needs. Contact
          our support team or explore our resources below.
        </Typography>
      </Box>

      {/* Contact Information Section */}
      <Grid container spacing={2} mb={6}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <PhoneIcon style={{ color: "#ff4500" }} fontSize="large" />
              <Typography variant="h6" mt={2}>
                Call Us
              </Typography>
              <Typography variant="body1" color="textSecondary">
                18001370808
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <EmailIcon style={{ color: "#ff4500" }} fontSize="large" />
              <Typography variant="h6" mt={2}>
                Email Us
              </Typography>
              <Typography variant="body1" color="textSecondary">
                support@manthanitsolutions.com
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <HelpIcon style={{ color: "#ff4500" }} fontSize="large" />
              <Typography variant="h6" mt={2}>
                Help Center
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Explore FAQs  to get quick answers.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Ticket Generation Section */}
      <Box mb={8}>
        <Typography variant="h4" gutterBottom style={{ color: "#ff4500" }}>
          Generate a Ticket
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Use the form below to create a support ticket. Our team will assist
          you as soon as possible.
        </Typography>
        <Box component="form" mt={2} noValidate autoComplete="off">
          <TextField
            label="Subject"
            name="subjectType"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.subjectType}
            onChange={handleChange}
          />
          <TextField
            label="Enter Your Message"
            name="message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={formData.message}
            onChange={handleChange}
          />
          {errorMessage && (
            <Typography variant="body2" color="error" mt={1}>
              {errorMessage}
            </Typography>
          )}
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              size="large"
              style={{
                backgroundColor: "#ff4500",
                color: "#fff",
                ...((loading || !formData.subjectType || !formData.message) && {
                  backgroundColor: "#aba1a1",
                }),
              }}
              onClick={handleRequest}
              disabled={loading || !formData.subjectType || !formData.message}
            >
              {loading ? "Submitting..." : "Request"}
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle
          textAlign="center"
          style={{ fontSize: 30, color: "#ff4500" }}
        >
          Support Center
        </DialogTitle>
        <DialogContent>
          <Box textAlign="center">
            <Fade in={showCheck} timeout={1000}>
              <CheckCircleIcon
                className="check-icon"
                style={{ fontSize: 80, color: "rgb(255 69 0 / 78%)" }}
              />
            </Fade>
            <Typography variant="body1" mt={2} style={{ fontSize: 20 }}>
              Your ticket ID is:{" "}
              <strong style={{ fontSize: 20 }}>{ticketId}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={2}>
              Thank you for reaching out! Our support team will assist you soon.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* FAQs Section */}
      <Box mb={8}>
        <Typography variant="h4" gutterBottom style={{ color: "#ff4500" }}>
          Frequently Asked Questions
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ color: "#ff4500" }}>
              How does the audit process work?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Our audit process involves inspecting inventory, reviewing
              compliance standards, and generating detailed reports. Access your
              audit dashboard for real-time updates.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ color: "#ff4500" }}>
              Can I customize audit templates?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, our platform allows you to customize audit templates to meet
              your specific requirements. Visit the "Settings" section to create
              or modify templates.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ color: "#ff4500" }}>
              How do I access historical audit reports?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Historical audit reports are available in the "Reports" section of
              your dashboard. Use the filter option to search for specific dates
              or locations.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box>
        <Typography variant="h4" gutterBottom style={{ color: "#ff4500" }}>
          Additional Resources
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Audit Workflow Guide"
              secondary="Understand the end-to-end workflow of conducting an automotive field audit."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Video Tutorials"
              secondary="Explore our tutorials to get step-by-step guidance on performing audits and managing reports."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Compliance Checklist"
              secondary="Download our comprehensive checklist to ensure your audits meet industry standards."
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}

export default Support;
