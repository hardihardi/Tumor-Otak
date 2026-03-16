import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, TextField, InputAdornment,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid, Chip, MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const Patients = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    nik: '',
    name: '',
    date_of_birth: '',
    gender: 'Male'
  });

  const fetchPatients = () => {
    fetch('http://localhost:8080/api/v1/patients/')
      .then(res => res.json())
      .then(data => setPatients(data.patients || []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAddPatient = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/patients/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPatient)
      });
      if (res.ok) {
        setOpen(false);
        setNewPatient({ nik: '', name: '', date_of_birth: '', gender: 'Male' });
        fetchPatients();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.nik.includes(search)
  );

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2,
        mb: 4
      }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Data Pasien</Typography>
          <Typography variant="body2" color="text.secondary">Kelola rekam medis dan data demografis pasien.</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Tambah Pasien
        </Button>
      </Box>

      <Box mb={3}>
        <TextField
          fullWidth
          placeholder="Cari pasien berdasarkan nama atau NIK..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ bgcolor: 'white', borderRadius: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 4, border: '1px solid #e0e0e0', boxShadow: 'none', overflowX: 'auto' }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Nama Pasien</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>NIK</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tanggal Lahir</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Box sx={{ p: 1, bgcolor: '#f0f4ff', borderRadius: 2, color: 'primary.main', display: 'flex' }}>
                       <PersonIcon fontSize="small" />
                    </Box>
                    <Typography variant="body2" fontWeight="bold">{p.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{p.nik}</TableCell>
                <TableCell>
                  <Chip label={p.gender} size="small" color={p.gender === 'Male' ? 'primary' : 'secondary'} variant="outlined" />
                </TableCell>
                <TableCell>{new Date(p.date_of_birth).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary"><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredPatients.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">Data tidak ditemukan.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold' }}>Registrasi Pasien Baru</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="NIK (Nomor Induk Kependudukan)"
                value={newPatient.nik}
                onChange={(e) => setNewPatient({ ...newPatient, nik: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Nama Lengkap"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Tanggal Lahir"
                InputLabelProps={{ shrink: true }}
                value={newPatient.date_of_birth}
                onChange={(e) => setNewPatient({ ...newPatient, date_of_birth: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                fullWidth
                label="Gender"
                value={newPatient.gender}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)}>Batal</Button>
          <Button variant="contained" onClick={handleAddPatient}>Simpan Pasien</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Patients;
