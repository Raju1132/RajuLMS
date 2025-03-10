import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  Divider,
  TextField,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  EmojiEvents as EmojiEventsIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "Manthan User",
    email: "user@manthan-it.com",
    role: "User",
    userId: "MAN001",
    phone: "+91 9876543210",
    department: "IT Department",
    joinDate: "01/01/2023",
    coursesEnrolled: 5,
    hoursSpent: 24,
    certificates: 3,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...userData });

  // Get role from Redux store
  const RoleType = useSelector((state) => state.role);

  useEffect(() => {
    // Here you would typically fetch user data from an API
    const storedUserData = localStorage.getItem("user_cred");
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(prev => ({
          ...prev,
          ...parsedData,
          name: parsedData.userName || prev.name,
          role: parsedData.roleType || prev.role
        }));
        setEditedData(prev => ({
          ...prev,
          ...parsedData,
          name: parsedData.userName || prev.name,
          role: parsedData.roleType || prev.role
        }));
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setEditedData({ ...userData });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    // Here you would typically send the updated data to an API
    setUserData({ ...editedData });
    localStorage.setItem("userData", JSON.stringify(editedData));
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto", mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        User Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{ p: 3, height: "100%", borderRadius: 2 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h5" component="h2">
                Profile Information
              </Typography>
              <IconButton
                color="primary"
                onClick={handleEditToggle}
                sx={{ ml: 1 }}
              >
                {isEditing ? <CancelIcon /> : <EditIcon />}
              </IconButton>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      bgcolor: "#ff4500",
                    }}
                  >
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {userData.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    {userData.role}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ID: {userData.userId}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={isEditing ? editedData.name : userData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      variant="outlined"
                      size="small"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={isEditing ? editedData.email : userData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      variant="outlined"
                      size="small"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={isEditing ? editedData.phone : userData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      variant="outlined"
                      size="small"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Department"
                      name="department"
                      value={
                        isEditing
                          ? editedData.department
                          : userData.department
                      }
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      variant="outlined"
                      size="small"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Join Date"
                      name="joinDate"
                      value={
                        isEditing ? editedData.joinDate : userData.joinDate
                      }
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      variant="outlined"
                      size="small"
                      margin="normal"
                    />
                  </Grid>
                </Grid>

                {isEditing && (
                  <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={handleSaveChanges}
                      sx={{
                        bgcolor: "#ff4500",
                        "&:hover": { bgcolor: "#e03e00" },
                      }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 2,
                  bgcolor: "#f8f9fa",
                  height: "100%",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <SchoolIcon
                      sx={{ color: "#ff4500", mr: 1, fontSize: 28 }}
                    />
                    <Typography variant="h6">Learning Stats</Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "white",
                          borderRadius: 1,
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <SchoolIcon
                          sx={{ color: "#ff4500", mr: 2, fontSize: 24 }}
                        />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Courses Enrolled
                          </Typography>
                          <Typography variant="h6">
                            {userData.coursesEnrolled}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "white",
                          borderRadius: 1,
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <AccessTimeIcon
                          sx={{ color: "#ff4500", mr: 2, fontSize: 24 }}
                        />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Hours Spent
                          </Typography>
                          <Typography variant="h6">
                            {userData.hoursSpent}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "white",
                          borderRadius: 1,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <EmojiEventsIcon
                          sx={{ color: "#ff4500", mr: 2, fontSize: 24 }}
                        />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Certificates Earned
                          </Typography>
                          <Typography variant="h6">
                            {userData.certificates}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;