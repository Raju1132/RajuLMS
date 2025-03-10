import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Edit, Book, Clock, Award, Save } from 'lucide-react';
import CloseIcon from '@mui/icons-material/Close';

const Profile = ({ user, setUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');

  const handleEditToggle = () => {
    if (editMode) {
      // Save changes
      setUser(editedUser);
    }
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handlePasswordSubmit = () => {
    // Simple validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    
    // In a real app, you would send this to an API
    console.log('Password changed successfully');
    setOpenPasswordDialog(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPasswordError('');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4, px: 2 }}>
      <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        {/* Header/Banner */}
        <Box sx={{ 
          height: 120, 
          bgcolor: '#ff4500',
          position: 'relative'
        }} />
        
        {/* Profile Info */}
        <Box sx={{ px: 3, pb: 3, pt: 0, position: 'relative' }}>
          <Avatar
            src={user.avatar || ''}
            alt={user.name}
            sx={{
              width: 120,
              height: 120,
              border: '4px solid white',
              position: 'relative',
              top: -60,
              mx: 'auto',
              bgcolor: '#ff4500',
              color: 'white',
              fontSize: '3rem',
            }}
          >
            {user.name?.charAt(0).toUpperCase()}
          </Avatar>
          
          <Box sx={{ mt: -5, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Typography>
          </Box>
          
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  textAlign: 'center',
                  bgcolor: 'rgba(255, 69, 0, 0.05)',
                  borderRadius: 2,
                  height: '100%',
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mb: 1 
                }}>
                  <Book size={20} color="#ff4500" />
                </Box>
                <Typography variant="h4" fontWeight="bold" color="#ff4500">
                  {user.coursesEnrolled}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Courses Enrolled
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  textAlign: 'center',
                  bgcolor: 'rgba(255, 69, 0, 0.05)',
                  borderRadius: 2,
                  height: '100%',
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mb: 1 
                }}>
                  <Clock size={20} color="#ff4500" />
                </Box>
                <Typography variant="h4" fontWeight="bold" color="#ff4500">
                  {user.hoursSpent}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hours Spent
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  textAlign: 'center',
                  bgcolor: 'rgba(255, 69, 0, 0.05)',
                  borderRadius: 2,
                  height: '100%',
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mb: 1 
                }}>
                  <Award size={20} color="#ff4500" />
                </Box>
                <Typography variant="h4" fontWeight="bold" color="#ff4500">
                  {user.certificates}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Certificates Earned
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          
          {/* Profile Details */}
          <Paper
            elevation={0}
            sx={{
              mt: 3,
              p: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Profile Details
              </Typography>
              <Button
                startIcon={editMode ? <Save size={18} /> : <Edit size={18} />}
                onClick={handleEditToggle}
                sx={{
                  color: '#ff4500',
                  '&:hover': { bgcolor: 'rgba(255, 69, 0, 0.05)' },
                }}
              >
                {editMode ? 'Save' : 'Edit'}
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Full Name
                </Typography>
                {editMode ? (
                  <TextField
                    fullWidth
                    size="small"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                ) : (
                  <Typography variant="body1" gutterBottom>
                    {user.name}
                  </Typography>
                )}
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Email
                </Typography>
                {editMode ? (
                  <TextField
                    fullWidth
                    size="small"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                ) : (
                  <Typography variant="body1" gutterBottom>
                    {user.email}
                  </Typography>
                )}
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Role
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  User ID
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user.id}
                </Typography>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                onClick={() => setOpenPasswordDialog(true)}
                sx={{
                  borderColor: '#ff4500',
                  color: '#ff4500',
                  '&:hover': { bgcolor: 'rgba(255, 69, 0, 0.1)' },
                }}
              >
                Change Password
              </Button>
            </Box>
          </Paper>
        </Box>
      </Paper>
      
      {/* Password Change Dialog */}
      <Dialog 
        open={openPasswordDialog} 
        onClose={() => setOpenPasswordDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant="h6">Change Password</Typography>
          <IconButton 
            onClick={() => setOpenPasswordDialog(false)}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Current Password"
            type="password"
            fullWidth
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Confirm New Password"
            type="password"
            fullWidth
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            variant="outlined"
            size="small"
            error={!!passwordError}
            helperText={passwordError}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setOpenPasswordDialog(false)}
            sx={{ color: 'text.secondary' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handlePasswordSubmit}
            variant="contained"
            sx={{
              bgcolor: '#ff4500',
              '&:hover': { bgcolor: 'rgba(255, 69, 0, 0.9)' },
            }}
          >
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;