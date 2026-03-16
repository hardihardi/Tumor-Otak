import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Analytics as AnalyticsIcon,
  HealthAndSafety as HealthIcon
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const statCards = [
    { title: 'Total Patients', value: stats?.total_patients || 0, icon: <PeopleIcon />, color: '#135bec', bg: '#e7effd' },
    { title: 'MRI Scans', value: stats?.total_scans || 0, icon: <AnalyticsIcon />, color: '#ff9800', bg: '#fff4e5' },
    { title: 'Tumors Detected', value: stats?.tumors_detected || 0, icon: <HealthIcon />, color: '#f44336', bg: '#fdecea' },
    { title: 'Model Accuracy', value: '94.2%', icon: <TrendingUpIcon />, color: '#4caf50', bg: '#edf7ed' },
  ];

  const chartData = [
    { name: 'Mon', scans: 45 },
    { name: 'Tue', scans: 52 },
    { name: 'Wed', scans: 48 },
    { name: 'Thu', scans: 61 },
    { name: 'Fri', scans: 55 },
    { name: 'Sat', scans: 32 },
    { name: 'Sun', scans: 28 },
  ];

  const pieData = [
    { name: 'Glioma', value: stats?.by_type?.Glioma || 35 },
    { name: 'Meningioma', value: stats?.by_type?.Meningioma || 25 },
    { name: 'Pituitary', value: stats?.by_type?.Pituitary || 20 },
    { name: 'No Tumor', value: stats?.by_type?.['No Tumor'] || 20 },
  ];

  const COLORS = ['#135bec', '#00c49f', '#ffbb28', '#ff8042'];

  if (loading) return <Box p={4}><Skeleton variant="rectangular" height={400} /></Box>;

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold">Dashboard Overview</Typography>
        <Typography variant="body2" color="text.secondary">Welcome back to Bumame Health AI. Real-time diagnostic insights.</Typography>
      </Box>

      <Grid container spacing={3} mb={4}>
        {statCards.map((stat) => (
          <Grid key={stat.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card sx={{ borderRadius: 4, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: stat.bg, color: stat.color, borderRadius: 3 }}>
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">{stat.title}</Typography>
                    <Typography variant="h5" fontWeight="bold">{stat.value}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ borderRadius: 4, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Weekly MRI Volume</Typography>
              <Box height={300} mt={2}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: '#f5f5f5' }} />
                    <Bar dataKey="scans" fill="#135bec" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Recent Analyses</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Patient ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Confidence</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(stats?.recent_scans || []).slice(0, 5).map((scan: any, i: number) => (
                      <TableRow key={i} hover>
                        <TableCell>{scan.patient_id.substring(0, 8)}...</TableCell>
                        <TableCell>
                          <Chip
                            label={scan.prediction}
                            size="small"
                            color={scan.prediction === 'No Tumor' ? 'default' : 'error'}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{scan.confidence?.toFixed(1)}%</TableCell>
                        <TableCell>{new Date(scan.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ borderRadius: 4, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Tumor Classification</Typography>
              <Box height={280} display="flex" justifyContent="center" alignItems="center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Stack spacing={1.5} mt={2}>
                {pieData.map((item: any, index: number) => (
                  <Stack key={item.name} direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: COLORS[index] }} />
                      <Typography variant="body2">{item.name}</Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight="bold">{item.value}</Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
