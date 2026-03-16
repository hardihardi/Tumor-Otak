import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  IconButton,
  Avatar,
  Stack,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Mail as MailIcon,
  Lock as LockIcon
} from '@mui/icons-material';

const Users = () => {
  const [open, setOpen] = useState(false);
  const [users] = useState([
    { id: 1, name: 'Dr. Ahmad Fauzi', email: 'ahmad.fauzi@bumame.com', role: 'Radiologist', status: 'Active', avatar: 'AF' },
    { id: 2, name: 'Dr. Siti Aminah', email: 'siti.aminah@bumame.com', role: 'Doctor', status: 'Active', avatar: 'SA' },
    { id: 3, name: 'Budi Santoso', email: 'budi.s@bumame.com', role: 'Lab Tech', status: 'Active', avatar: 'BS' },
    { id: 4, name: 'Admin Utama', email: 'admin@bumame.com', role: 'Administrator', status: 'Active', avatar: 'AU' },
  ]);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold">User Management</Typography>
          <Typography variant="body2" color="text.secondary">Manage access and roles for medical staff and administrators.</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: 2, bgcolor: '#135bec' }} onClick={() => setOpen(true)}>
          Add New User
        </Button>
      </Stack>

      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{ width: 56, height: 56, bgcolor: '#e3f2fd', color: '#135bec', mx: 'auto', mb: 2 }}>
                <PersonIcon />
              </Avatar>
              <Typography variant="h4" fontWeight="bold">24</Typography>
              <Typography variant="body2" color="text.secondary">Total Medical Staff</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{ width: 56, height: 56, bgcolor: '#f3e5f5', color: '#9c27b0', mx: 'auto', mb: 2 }}>
                <AdminIcon />
              </Avatar>
              <Typography variant="h4" fontWeight="bold">3</Typography>
              <Typography variant="body2" color="text.secondary">System Admins</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar sx={{ width: 56, height: 56, bgcolor: '#fff3e0', color: '#ed6c02', mx: 'auto', mb: 2 }}>
                <SecurityIcon />
              </Avatar>
              <Typography variant="h4" fontWeight="bold">5</Typography>
              <Typography variant="body2" color="text.secondary">Custom Roles</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Box p={3} borderBottom="1px solid #f0f0f0">
          <TextField
            placeholder="Search users..."
            size="small"
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8f9fa' }}>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>{user.avatar}</Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">{user.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip label={user.role} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip label={user.status} size="small" color="success" sx={{ borderRadius: 1 }} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Register System User</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} pt={1}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email Address"
              InputProps={{ startAdornment: <InputAdornment position="start"><MailIcon fontSize="small"/></InputAdornment> }}
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  select
                  label="System Role"
                  defaultValue="Doctor"
                >
                  <MenuItem value="Administrator">Administrator</MenuItem>
                  <MenuItem value="Radiologist">Radiologist</MenuItem>
                  <MenuItem value="Doctor">Doctor</MenuItem>
                  <MenuItem value="Lab Tech">Lab Technician</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <TextField
              fullWidth
              type="password"
              label="Temporary Password"
              InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon fontSize="small"/></InputAdornment> }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: '#135bec', px: 4 }} onClick={() => setOpen(false)}>Create Account</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
