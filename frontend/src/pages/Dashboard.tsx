import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Brain Tumor Detection Dashboard
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {[
          { label: 'Total MRI Scans', value: '128', color: 'primary.main' },
          { label: 'Tumors Detected', value: '12', color: 'error.main' },
          { label: 'Pending Analysis', value: '5', color: 'text.secondary' },
          { label: 'Success Rate', value: '98%', color: 'success.main' },
        ].map((item) => (
          <Paper key={item.label} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, flex: '1 1 200px' }}>
            <Typography sx={{ color: item.color }} gutterBottom>{item.label}</Typography>
            <Typography variant="h3">{item.value}</Typography>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default Dashboard;
