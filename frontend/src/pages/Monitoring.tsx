import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  CloudDone as CloudDoneIcon,
  CheckCircle as CheckCircleIcon,
  FlashOn as FlashOnIcon,
  Memory as MemoryIcon,
  Storage as StorageIcon
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Monitoring = () => {
  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        time: '12:' + (i < 10 ? '0' + i : i),
        cpu: Math.floor(Math.random() * 30) + 20,
        memory: Math.floor(Math.random() * 20) + 40,
      });
    }
    setMetrics(data);
  }, []);

  const services = [
    { name: 'API Gateway', status: 'Healthy', uptime: '14d 2h', load: 15 },
    { name: 'ML Inference', status: 'Healthy', uptime: '14d 2h', load: 68 },
    { name: 'PostgreSQL', status: 'Healthy', uptime: '45d 8h', load: 8 },
  ];

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold">System Monitoring</Typography>
        <Typography variant="body2" color="text.secondary">Real-time health status of Bumame AI infrastructure.</Typography>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ borderRadius: 4, bgcolor: '#135bec', color: 'white' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" mb={2}>
                <Typography variant="subtitle2">System Uptime</Typography>
                <CloudDoneIcon />
              </Stack>
              <Typography variant="h4" fontWeight="bold">99.98%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" mb={2}>
                <Typography variant="subtitle2" color="text.secondary">Avg. Latency</Typography>
                <FlashOnIcon color="warning" />
              </Stack>
              <Typography variant="h4" fontWeight="bold">1.2s</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" mb={2}>
                <Typography variant="subtitle2" color="text.secondary">CPU Usage</Typography>
                <MemoryIcon color="primary" />
              </Stack>
              <Typography variant="h4" fontWeight="bold">24%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" mb={2}>
                <Typography variant="subtitle2" color="text.secondary">Disk Ops</Typography>
                <StorageIcon color="info" />
              </Stack>
              <Typography variant="h4" fontWeight="bold">42MB/s</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ borderRadius: 4, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Resource Performance</Typography>
              <Box height={350} mt={2}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metrics}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis axisLine={false} tickLine={false} fontSize={12} />
                    <Tooltip />
                    <Area type="monotone" dataKey="cpu" stroke="#135bec" fill="#135bec" fillOpacity={0.1} />
                    <Area type="monotone" dataKey="memory" stroke="#00c49f" fill="#00c49f" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Microservices</Typography>
              <List>
                {services.map((s, i) => (
                  <React.Fragment key={s.name}>
                    <ListItem sx={{ py: 1.5 }}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary={s.name} secondary={'Uptime: ' + s.uptime} />
                      <Box sx={{ minWidth: 60, textAlign: 'right' }}>
                        <Typography variant="caption" fontWeight="bold">Load: {s.load}%</Typography>
                      </Box>
                    </ListItem>
                    {i < services.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Monitoring;
