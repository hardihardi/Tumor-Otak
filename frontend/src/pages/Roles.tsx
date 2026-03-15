import React from 'react';
import { Typography, Paper, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { Add as AddIcon, Security as SecurityIcon } from '@mui/icons-material';

const Roles = () => {
  const roles = [
    { id: 1, name: 'Admin', permissions: ['All Access'], userCount: 2 },
    { id: 2, name: 'Radiologist', permissions: ['Upload MRI', 'Analyze MRI', 'View Report'], userCount: 5 },
    { id: 3, name: 'Doctor', permissions: ['View Analysis', 'Download Report'], userCount: 12 },
    { id: 4, name: 'Lab Technician', permissions: ['Upload MRI', 'Manage Patients'], userCount: 8 },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Role Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage system roles and their associated permissions
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ px: 3 }}>
          Add New Role
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 10px 30px 0 rgba(19, 91, 236, 0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(19, 91, 236, 0.02)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Role Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Permissions</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Users</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SecurityIcon color="primary" sx={{ fontSize: 20 }} />
                    <Typography sx={{ fontWeight: 600 }}>{role.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {role.permissions.map((perm) => (
                      <Chip key={perm} label={perm} size="small" variant="outlined" color="primary" />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>{role.userCount} users</TableCell>
                <TableCell>
                  <Button size="small">Edit</Button>
                  <Button size="small" color="error">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Roles;
