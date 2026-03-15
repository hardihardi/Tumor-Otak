import React, { useState, useEffect } from 'react';
import {
  Grid, Paper, Typography, Box, Card, CardContent,
  Avatar, LinearProgress, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Divider, Button
} from '@mui/material';
import {
  Psychology as PsychologyIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

interface Stats {
  total_patients: number;
  total_scans: number;
  tumor_detected: number;
  recent_scans: any[];
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    total_patients: 0,
    total_scans: 0,
    tumor_detected: 0,
    recent_scans: []
  });

  const chartData = [
    { name: 'Mon', scans: 4, tumors: 1 },
    { name: 'Tue', scans: 7, tumors: 2 },
    { name: 'Wed', scans: 5, tumors: 1 },
    { name: 'Thu', scans: 8, tumors: 3 },
    { name: 'Fri', scans: 12, tumors: 4 },
    { name: 'Sat', scans: 6, tumors: 1 },
    { name: 'Sun', scans: 3, tumors: 0 },
  ];

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  const statCards = [
    { title: 'Total Pasien', value: stats.total_patients, icon: <PeopleIcon />, color: '#135bec', trend: '+12% from last month' },
    { title: 'Total Analysis', value: stats.total_scans, icon: <PsychologyIcon />, color: '#00d084', trend: '+5% from yesterday' },
    { title: 'Tumor Detected', value: stats.tumor_detected, icon: <TrendingUpIcon />, color: '#ff4d4f', trend: 'Clinically Validated' },
    { title: 'Model Accuracy', value: '94.2%', icon: <CheckCircleIcon />, color: '#7a3e9d', trend: 'ResNet50 Backbone' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Clinical Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Real-time brain tumor analysis and patient monitoring.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 10px 30px 0 rgba(19, 91, 236, 0.05)', position: 'relative', overflow: 'hidden' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Avatar sx={{ bgcolor: `${card.color}15`, color: card.color, borderRadius: 2, width: 48, height: 48 }}>
                    {card.icon}
                  </Avatar>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{card.value}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{card.title}</Typography>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: card.trend.includes('-') ? 'error.main' : 'success.main', fontWeight: 'bold' }}>
                    {card.trend}
                  </Typography>
                </Box>
              </CardContent>
              <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, bgcolor: card.color }} />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3, borderRadius: 4, boxShadow: '0 10px 30px 0 rgba(0,0,0,0.02)' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>Analysis Trends (7 Days)</Typography>
            <Box sx={{ height: 300, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#135bec" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#135bec" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="scans" stroke="#135bec" fillOpacity={1} fill="url(#colorScans)" strokeWidth={3} />
                  <Area type="monotone" dataKey="tumors" stroke="#ff4d4f" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Analysis</Typography>
              <Chip label="Live Feed" size="small" color="primary" variant="outlined" />
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Patient ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Prediction</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Confidence</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.recent_scans && stats.recent_scans.length > 0 ? stats.recent_scans.map((scan) => (
                    <TableRow key={scan.id}>
                      <TableCell sx={{ fontSize: '0.75rem' }}>{scan.patient_id.substring(0, 8)}...</TableCell>
                      <TableCell>
                        <Chip
                          label={scan.prediction || "Normal"}
                          size="small"
                          color={scan.prediction && scan.prediction !== "No Tumor" ? "warning" : "success"}
                          sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={scan.confidence * 100}
                            sx={{ width: 50, height: 6, borderRadius: 3, flexShrink: 0 }}
                          />
                          <Typography variant="caption">{(scan.confidence * 100).toFixed(1)}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                         <Typography variant="caption" color="text.secondary">
                           {new Date(scan.created_at).toLocaleTimeString()}
                         </Typography>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                        No analysis data available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>Model Health</Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Inference Latency</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>1.2s</Typography>
              </Box>
              <LinearProgress variant="determinate" value={15} sx={{ height: 8, borderRadius: 4 }} />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Resource Usage</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>42%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={42} color="secondary" sx={{ height: 8, borderRadius: 4 }} />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Validation Drifts</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>None</Typography>
              </Box>
              <LinearProgress variant="determinate" value={0} color="success" sx={{ height: 8, borderRadius: 4 }} />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>Quick Actions</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" fullWidth size="small" startIcon={<PsychologyIcon />}>New Scan</Button>
              <Button variant="outlined" fullWidth size="small" startIcon={<PeopleIcon />}>Records</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
