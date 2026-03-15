import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Dialog,
  DialogTitle, DialogContent, TextField, DialogActions,
  FormControl, InputLabel, Select, MenuItem, Chip, Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon
} from '@mui/icons-material';

interface Patient {
  id: string;
  nik: string;
  name: string;
  date_of_birth: string;
  gender: string;
  created_at: string;
}

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [open, setOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    nik: '',
    date_of_birth: '',
    gender: 'Male'
  });

  const fetchPatients = () => {
    fetch('http://localhost:8080/api/v1/patients/')
      .then(res => res.json())
      .then(data => setPatients(data.patients || []));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/patients/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPatient),
      });

      if (response.ok) {
        fetchPatients();
        handleClose();
        setNewPatient({ name: '', nik: '', date_of_birth: '', gender: 'Male' });
      }
    } catch (err) {
      console.error('Error creating patient:', err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Data Pasien</Typography>
          <Typography variant="body2" color="textSecondary">Kelola rekam medis dan data demografis pasien.</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen} sx={{ px: 3 }}>
          Tambah Pasien
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <SearchIcon color="action" />
        <TextField
          variant="standard"
          placeholder="Cari pasien berdasarkan nama atau NIK..."
          fullWidth
          InputProps={{ disableUnderline: true }}
        />
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Nama Pasien</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>NIK</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tanggal Lahir</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id} hover>
                <TableCell sx={{ fontWeight: 600 }}>{patient.name}</TableCell>
                <TableCell>{patient.nik}</TableCell>
                <TableCell>
                  <Chip
                    label={patient.gender}
                    size="small"
                    color={patient.gender === 'Male' ? 'primary' : 'secondary'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{new Date(patient.date_of_birth).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary"><EditIcon /></IconButton>
                  <IconButton size="small" color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {patients.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3, opacity: 0.5 }}>
                  Belum ada data pasien.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 'bold' }}>Tambah Pasien Baru</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label="Nama Lengkap"
            fullWidth
            value={newPatient.name}
            onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
          />
          <TextField
            label="NIK"
            fullWidth
            value={newPatient.nik}
            onChange={(e) => setNewPatient({ ...newPatient, nik: e.target.value })}
          />
          <TextField
            label="Tanggal Lahir"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newPatient.date_of_birth}
            onChange={(e) => setNewPatient({ ...newPatient, date_of_birth: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={newPatient.gender}
              label="Gender"
              onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
            >
              <MenuItem value="Male">Laki-laki</MenuItem>
              <MenuItem value="Female">Perempuan</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose}>Batal</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ px: 4 }}>Simpan</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Patients;
