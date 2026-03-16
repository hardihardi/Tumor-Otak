import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  IconButton,
  Chip,
  Divider,
  Avatar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Shield as ShieldIcon,
  People as PeopleIcon
} from '@mui/icons-material';

const Roles = () => {
  const roles = [
    { name: 'Administrator', users: 3, permissions: 42, color: '#135bec' },
    { name: 'Radiologist', users: 8, permissions: 15, color: '#4caf50' },
    { name: 'Doctor', users: 12, permissions: 10, color: '#ff9800' },
    { name: 'Lab Technician', users: 5, permissions: 8, color: '#9c27b0' },
  ];

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Role Management</Typography>
          <Typography variant="body2" color="text.secondary">Define system access levels and associated permissions.</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: 2, bgcolor: '#135bec', width: { xs: '100%', sm: 'auto' } }}>
          Create Role
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {roles.map((role) => (
          <Grid key={role.name} size={{ xs: 12, md: 6, lg: 4 }}>
            <Card sx={{ borderRadius: 4, position: 'relative', overflow: 'visible' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: -15,
                  left: 20,
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: role.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                }}
              >
                <ShieldIcon fontSize="small" />
              </Box>
              <CardContent sx={{ pt: 4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Typography variant="h6" fontWeight="bold">{role.name}</Typography>
                  <Stack direction="row">
                    <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                    <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={3} mt={3}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">USERS</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PeopleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography fontWeight="bold">{role.users}</Typography>
                    </Stack>
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box>
                    <Typography variant="caption" color="text.secondary">PERMISSIONS</Typography>
                    <Typography fontWeight="bold">{role.permissions}</Typography>
                  </Box>
                </Stack>

                <Box mt={3}>
                  <Button fullWidth variant="outlined" size="small" sx={{ borderRadius: 2 }}>
                    Manage Permissions
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Roles;
