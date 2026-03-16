import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Chip
} from '@mui/material';
import {
  Download as DownloadIcon
} from '@mui/icons-material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const tumorData = [
  { name: 'Glioma', value: 45, color: '#135bec' },
  { name: 'Meningioma', value: 30, color: '#00c49f' },
  { name: 'Pituitary', value: 15, color: '#ffbb28' },
  { name: 'No Tumor', value: 10, color: '#ff4d4f' },
];

const performanceData = [
  { date: '03-09', accuracy: 94.2, latency: 1.2 },
  { date: '03-10', accuracy: 93.8, latency: 1.1 },
  { date: '03-11', accuracy: 94.5, latency: 1.3 },
  { date: '03-12', accuracy: 95.1, latency: 1.2 },
  { date: '03-13', accuracy: 94.7, latency: 1.4 },
  { date: '03-14', accuracy: 95.3, latency: 1.2 },
  { date: '03-15', accuracy: 95.8, latency: 1.1 },
];

const Reports = () => {
  const [tab, setTab] = useState(0);

  const handleExport = (format: string) => {
    console.log(`Exporting report as ${format}...`);
  };

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
          <Typography variant="h4" fontWeight="bold">Laporan Analitik</Typography>
          <Typography variant="body2" color="text.secondary">Rekapitulasi data medis dan operasional enterprise.</Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <Button fullWidth startIcon={<DownloadIcon />} variant="contained" size="small" onClick={() => handleExport('PDF')}>Export PDF</Button>
          <Button fullWidth startIcon={<DownloadIcon />} variant="outlined" size="small" onClick={() => handleExport('CSV')}>CSV</Button>
        </Stack>
      </Box>

      <Paper sx={{ mb: 4, borderRadius: 3, overflowX: 'auto' }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
          <Tab label="Analisis Tumor" />
          <Tab label="Performa AI" />
          <Tab label="Audit Operasional" />
        </Tabs>
      </Paper>

      {tab === 0 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ borderRadius: 4, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">Jenis Tumor Terdeteksi</Typography>
                <Box height={300}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tumorData}
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {tumorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ borderRadius: 4, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">Tren Akurasi Model (%)</Typography>
                <Box height={300}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" fontSize={12} />
                      <YAxis domain={[90, 100]} fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="accuracy" name="Accuracy" fill="#135bec" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee', borderRadius: 4, overflowX: 'auto' }}>
              <Table>
                <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Week</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Total Scans</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Tumors</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Avg. Confidence</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Mar W3</TableCell>
                    <TableCell>142</TableCell>
                    <TableCell>89</TableCell>
                    <TableCell>94.8%</TableCell>
                    <TableCell><Chip label="Validated" size="small" color="success" /></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}

      {tab === 1 && (
        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="bold">Latensi Inferensi (detik)</Typography>
            <Box height={400} mt={2}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="latency" name="Latency (s)" fill="#00c49f" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      )}

      {tab === 2 && (
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee', borderRadius: 4 }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8f9fa' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Module</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Aktivitas</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Top Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>MRI Analysis</TableCell>
                <TableCell>842</TableCell>
                <TableCell>RUN_ANALYSIS</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Reports;
