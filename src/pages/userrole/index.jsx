import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Alert
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: "20px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
}));

const initialRoles = [
  {
    id: 1,
    name: "Admin",
    description: "Full system access",
    userCount: 5,
    permissions: ["read", "write", "delete", "modify"]
  },
  {
    id: 2,
    name: "Instructor",
    description: "Course management access",
    userCount: 15,
    permissions: ["read", "write"]
  },
  {
    id: 3,
    name: "Student",
    description: "Limited access",
    userCount: 150,
    permissions: ["read"]
  }
];

const permissionAreas = [
  "Course Management",
  "User Management",
  "Content Creation",
  "Reporting",
  "Administrative Controls"
];

const RoleManagement = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: []
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreateRole = () => {
    if (!newRole.name) {
      setSnackbar({
        open: true,
        message: "Role name is required",
        severity: "error"
      });
      return;
    }

    if (newRole.permissions.length === 0) {
      setSnackbar({
        open: true,
        message: "Select at least one permission",
        severity: "error"
      });
      return;
    }

    if (selectedRole) {
      setRoles(roles.map(role =>
        role.id === selectedRole.id ? { ...newRole, id: role.id, userCount: role.userCount } : role
      ));
      setSnackbar({
        open: true,
        message: "Role updated successfully",
        severity: "success"
      });
    } else {
      setRoles([...roles, { ...newRole, id: roles.length + 1, userCount: 0 }]);
      setSnackbar({
        open: true,
        message: "Role created successfully",
        severity: "success"
      });
    }
    handleCloseModal();
  };

  const handleDelete = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
    setSnackbar({
      open: true,
      message: "Role deleted successfully",
      severity: "success"
    });
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setNewRole({
      name: role.name,
      description: role.description,
      permissions: role.permissions
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRole(null);
    setNewRole({ name: "", description: "", permissions: [] });
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        User Role 
      </Typography>

      <StyledCard>
        <CardContent>
          <Grid container spacing={2} alignItems="center" marginBottom={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder="Search roles..."
                InputProps={{
                  startAdornment: <span style={{ marginRight: 8 }} >search</span>
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} textAlign="right">
              <Button
                variant="contained"
                color="warning"
                onClick={() => setOpenModal(true)}
              >
                Create New Role
              </Button>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Role Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>User Count</TableCell>
                  <TableCell>Permissions</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRoles
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>{role.userCount}</TableCell>
                      <TableCell>
                        {role.permissions.join(", ")}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(role)}
                          aria-label="edit"
                        >
                         edit
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(role.id)}
                          aria-label="delete"
                        >
                          Trash
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredRoles.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            />
          </TableContainer>
        </CardContent>
      </StyledCard>

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedRole ? "Edit Role" : "Create New Role"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role Name"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Permissions
              </Typography>
              {permissionAreas.map((area) => (
                <FormControlLabel
                  key={area}
                  control={
                    <Checkbox
                      checked={newRole.permissions.includes(area.toLowerCase())}
                      onChange={(e) => {
                        const permission = area.toLowerCase();
                        setNewRole({
                          ...newRole,
                          permissions: e.target.checked
                            ? [...newRole.permissions, permission]
                            : newRole.permissions.filter((p) => p !== permission)
                        });
                      }}
                    />
                  }
                  label={area}
                />
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleCreateRole} variant="contained" color="primary">
            {selectedRole ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RoleManagement;
