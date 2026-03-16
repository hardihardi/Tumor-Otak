import React, { useState, useEffect } from 'react';
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
  MenuItem,
  Skeleton
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Mail as MailIcon,
  Lock as LockIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const Users = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role_id: 2 // Default to Doctor/Radiologist
  });

  const fetchUsers = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/v1/users/')
      .then(res => res.json())
      .then(data => {
        setUsers(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (res.ok) {
        setOpen(false);
        setNewUser({ name: '', email: '', password: '', role_id: 2 });
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const res = await fetch(`http://localhost:8080/api/v1/users/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold">User Management</Typography>
          <Typography variant="body2" color="text.secondary">Manage access and roles for Bumame medical staff.</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, bgcolor: '#135bec', width: { xs: '100%', sm: 'auto' } }}
          onClick={() => setOpen(true)}
        >
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
              <Typography variant="h4" fontWeight="bold">{users.length}</Typography>
              <Typography variant="body2" color="text.secondary">Total Staff Members</Typography>
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
              <Typography variant="h4" fontWeight="bold">Active Roles</Typography>
              <Typography variant="body2" color="text.secondary">Role-based Access Control</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Box p={3} borderBottom="1px solid #f0f0f0">
          <TextField
            placeholder="Search users..."
            size="small"
            fullWidth
            sx={{ maxWidth: 400 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <TableContainer component={Paper} elevation={0} sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8f9fa' }}>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Joined</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                [1,2,3].map(i => <TableRow key={i}><TableCell colSpan={4}><Skeleton /></TableCell></TableRow>)
              ) : filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ width: 36, height: 36, fontSize: '1rem', bgcolor: '#135bec' }}>
                        {user.name.substring(0, 1)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">{user.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip label={user.role_name || 'Staff'} size="small" variant="outlined" color="primary" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{new Date(user.created_at).toLocaleDateString()}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="error" onClick={() => handleDelete(user.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {!loading && filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No users found.</Typography>
                  </TableCell>
                </TableRow>
              )}
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
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            />
            <TextField
              fullWidth
              label="Email Address"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              InputProps={{ startAdornment: <InputAdornment position="start"><MailIcon fontSize="small"/></InputAdornment> }}
            />
            <TextField
              fullWidth
              select
              label="System Role"
              value={newUser.role_id}
              onChange={(e) => setNewUser({...newUser, role_id: Number(e.target.value)})}
            >
              <MenuItem value={1}>Administrator</MenuItem>
              <MenuItem value={2}>Radiologist</MenuItem>
              <MenuItem value={3}>Doctor</MenuItem>
              <MenuItem value={4}>Lab Technician</MenuItem>
            </TextField>
            <TextField
              fullWidth
              type="password"
              label="Temporary Password"
              value={newUser.password}
              onChange={(e) => setNewUser({...newUser, password: e.target.value})}
              InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon fontSize="small"/></InputAdornment> }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#135bec', px: 4 }}
            onClick={handleAddUser}
            disabled={!newUser.name || !newUser.email || !newUser.password}
          >
            Create Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
