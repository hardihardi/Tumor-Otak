import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Grid
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  FiberManualRecord as FiberManualRecordIcon,
  People as PeopleIcon,
  Psychology as PsychologyIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Jan', tumor: 4000, normal: 2400 },
  { name: 'Feb', tumor: 3000, normal: 1398 },
  { name: 'Mar', tumor: 2000, normal: 9800 },
  { name: 'Apr', tumor: 2780, normal: 3908 },
  { name: 'May', tumor: 1890, normal: 4800 },
  { name: 'Jun', tumor: 2390, normal: 3800 },
  { name: 'Jul', tumor: 3490, normal: 4300 },
];

const SummaryCard = ({ title, value, color, icon: Icon }: any) => (
  <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', flex: '1 1 200px' }}>
    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box>
        <Typography color="textSecondary" variant="body2" gutterBottom>{title}</Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{value}</Typography>
      </Box>
      <Box sx={{
        width: 48, height: 48, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `2px solid ${color}`, color: color
      }}>
        <Icon sx={{ fontSize: 20 }} />
      </Box>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Paper sx={{
        p: 4, mb: 4, borderRadius: 4,
        bgcolor: 'primary.main', color: 'white',
        background: 'linear-gradient(90deg, #135bec 0%, #4a90e2 100%)',
        position: 'relative', overflow: 'hidden'
      }}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Sistem Analisis Tumor Otak</Typography>
          <Typography variant="body1">Clinical Decision Support System - Powered by AI & Machine Learning</Typography>
        </Box>
        <Box sx={{
          position: 'absolute', top: -50, right: -50, width: 200, height: 200,
          borderRadius: '50%', background: 'rgba(255,255,255,0.1)'
        }} />
      </Paper>

      {/* Stats Section */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <SummaryCard title="Total Pasien" value={stats?.total_patients || 0} color="#135bec" icon={PeopleIcon} />
        <SummaryCard title="Total MRI Scan" value={stats?.total_scans || 0} color="#00d084" icon={PsychologyIcon} />
        <SummaryCard title="Tumor Terdeteksi" value={stats?.tumor_detected || 0} color="#ff4d4f" icon={WarningIcon} />
        <SummaryCard title="Avg Confidence" value="94.2%" color="#ffa940" icon={TrendingUpIcon} />
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Main Chart */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, borderRadius: 4, height: 400 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Trend Analisis</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
                  <FiberManualRecordIcon sx={{ fontSize: 10, mr: 0.5, color: '#ff4d4f' }} /> Tumor
                </Typography>
                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
                  <FiberManualRecordIcon sx={{ fontSize: 10, mr: 0.5, color: '#00d084' }} /> Normal
                </Typography>
              </Box>
            </Box>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorTumor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff4d4f" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ff4d4f" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d084" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#00d084" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="tumor" stroke="#ff4d4f" fillOpacity={1} fill="url(#colorTumor)" strokeWidth={3} />
                  <Area type="monotone" dataKey="normal" stroke="#00d084" fillOpacity={1} fill="url(#colorNormal)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Info Card */}
        <Grid item xs={12} lg={4}>
          <Card sx={{
            borderRadius: 4, height: '100%', minHeight: 400,
            background: 'linear-gradient(135deg, #135bec 0%, #4a90e2 100%)',
            color: 'white', position: 'relative'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 4 }}>System Status</Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>ML Model Version</Typography>
                <Typography variant="h5">v2.4-stable</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>Backend Latency</Typography>
                <Typography variant="h5">124ms</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>Active Nodes</Typography>
                <Typography variant="h5">4 Cloud Nodes</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity Table */}
      <Box sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Aktivitas Analisis Terbaru</Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
              <TableRow>
                <TableCell>Patient ID</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Prediction</TableCell>
                <TableCell>Confidence</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(stats?.recent_scans || []).map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ fontWeight: 'bold' }}>{row.patient_id}</TableCell>
                  <TableCell>{new Date(row.created_at).toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.analysis_status}
                      size="small"
                      color="success"
                      sx={{ borderRadius: 1.5 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                        label={row.prediction}
                        size="small"
                        variant="outlined"
                        color={row.prediction === 'No Tumor' ? 'success' : 'error'}
                    />
                  </TableCell>
                  <TableCell>{(row.confidence * 100).toFixed(1)}%</TableCell>
                </TableRow>
              ))}
              {(!stats?.recent_scans || stats.recent_scans.length === 0) && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3, opacity: 0.5 }}>
                    Belum ada data analisis terbaru.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
