import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Stack, LinearProgress,
  Button, Chip, Divider, Paper
} from '@mui/material';
import {
  People as PeopleIcon,
  Psychology as PsychologyIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  FiberManualRecord as FiberManualRecordIcon,
  Timeline as TimelineIcon,
  Speed as SpeedIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalScans: 0,
    tumorDetected: 0,
    accuracy: '94.2%'
  });
  const [recentScans, setRecentScans] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));

    fetch('http://localhost:8080/api/v1/mri/recent')
      .then(res => res.json())
      .then(data => setRecentScans(data.scans || []))
      .catch(err => console.error(err));
  }, []);

  const chartData = [
    { name: 'Mon', count: 4, tumor: 1 },
    { name: 'Tue', count: 7, tumor: 2 },
    { name: 'Wed', count: 5, tumor: 2 },
    { name: 'Thu', count: 9, tumor: 3 },
    { name: 'Fri', count: 12, tumor: 4 },
    { name: 'Sat', count: 6, tumor: 1 },
    { name: 'Sun', count: 3, tumor: 0 },
  ];

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold">Clinical Dashboard</Typography>
        <Typography variant="body2" color="text.secondary">Real-time brain tumor analysis and patient monitoring.</Typography>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ borderRadius: 4, borderBottom: '4px solid #135bec' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Box p={1} borderRadius={2} bgcolor="#eef4ff">
                  <PeopleIcon color="primary" />
                </Box>
              </Stack>
              <Typography variant="h4" fontWeight="bold">{stats.totalPatients}</Typography>
              <Typography variant="body2" color="text.secondary">Total Pasien</Typography>
              <Typography variant="caption" color="success.main" fontWeight="bold">+12% from last month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ borderRadius: 4, borderBottom: '4px solid #00c49f' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Box p={1} borderRadius={2} bgcolor="#e6fcf5">
                  <PsychologyIcon sx={{ color: '#00c49f' }} />
                </Box>
              </Stack>
              <Typography variant="h4" fontWeight="bold">{stats.totalScans}</Typography>
              <Typography variant="body2" color="text.secondary">Total Analisis</Typography>
              <Typography variant="caption" color="success.main" fontWeight="bold">+5% from yesterday</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ borderRadius: 4, borderBottom: '4px solid #ff4d4f' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Box p={1} borderRadius={2} bgcolor="#fff1f0">
                  <TrendingUpIcon sx={{ color: '#ff4d4f' }} />
                </Box>
              </Stack>
              <Typography variant="h4" fontWeight="bold">{stats.tumorDetected}</Typography>
              <Typography variant="body2" color="text.secondary">Tumor Detected</Typography>
              <Typography variant="caption" color="primary.main" fontWeight="bold">Clinically Validated</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ borderRadius: 4, borderBottom: '4px solid #722ed1' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Box p={1} borderRadius={2} bgcolor="#f9f0ff">
                  <CheckCircleIcon sx={{ color: '#722ed1' }} />
                </Box>
              </Stack>
              <Typography variant="h4" fontWeight="bold">{stats.accuracy}</Typography>
              <Typography variant="body2" color="text.secondary">Model Accuracy</Typography>
              <Typography variant="caption" color="success.main" fontWeight="bold">ResNet50 Backbone</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Analytics Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ borderRadius: 4, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Analysis Trends (7 Days)</Typography>
              <Box height={350} mt={2}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#135bec" strokeWidth={3} fill="#135bec" fillOpacity={0.1} />
                    <Area type="monotone" dataKey="tumor" stroke="#ff4d4f" strokeWidth={2} fill="#ff4d4f" fillOpacity={0.05} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Model & System Health */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Model Health</Typography>
                <Stack spacing={2} mt={2}>
                  <Box>
                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                      <Typography variant="caption">Inference Latency</Typography>
                      <Typography variant="caption" fontWeight="bold">1.2s</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={40} sx={{ height: 6, borderRadius: 3 }} />
                  </Box>
                  <Box>
                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                      <Typography variant="caption">Resource Usage</Typography>
                      <Typography variant="caption" fontWeight="bold">42%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={42} color="secondary" sx={{ height: 6, borderRadius: 3 }} />
                  </Box>
                  <Box>
                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                      <Typography variant="caption">Validation Drifts</Typography>
                      <Typography variant="caption" fontWeight="bold">None</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={100} color="success" sx={{ height: 6, borderRadius: 3 }} />
                  </Box>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Typography variant="caption" fontWeight="bold" gutterBottom display="block">Quick Actions</Typography>
                <Stack direction="row" spacing={1}>
                  <Button fullWidth size="small" variant="outlined" startIcon={<PsychologyIcon />} onClick={() => window.location.href='/analyze'}>New Scan</Button>
                  <Button fullWidth size="small" variant="outlined" startIcon={<PeopleIcon />} onClick={() => window.location.href='/patients'}>Records</Button>
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight="bold">Recent Analysis</Typography>
                  <Chip label="Live Feed" size="small" variant="outlined" color="primary" />
                </Box>
                <Stack spacing={2}>
                  {recentScans.slice(0, 3).map((scan, i) => (
                    <Box key={i}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">Patient ID</Typography>
                          <Typography variant="body2" fontWeight="bold">{scan.patient_id.substring(0, 8)}...</Typography>
                        </Box>
                        <Chip label={scan.prediction || 'Normal'} size="small" color={scan.prediction === 'No Tumor' ? 'success' : 'warning'} />
                      </Stack>
                      {i < 2 && <Divider sx={{ mt: 1.5 }} />}
                    </Box>
                  ))}
                  {recentScans.length === 0 && (
                    <Typography variant="caption" color="text.secondary" align="center" display="block">No recent activity.</Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
