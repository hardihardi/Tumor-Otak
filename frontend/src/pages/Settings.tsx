import React from 'react';
import { Typography, Paper, Box, Grid, TextField, Button, Switch, FormControlLabel, Divider } from '@mui/material';

const Settings = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>User Settings</Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Profile Information</Typography>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Full Name" defaultValue="Admin User" fullWidth />
              <TextField label="Email Address" defaultValue="admin@bumame.com" fullWidth />
              <TextField label="Job Title" defaultValue="Lead Radiologist" fullWidth />
              <Button variant="contained" sx={{ alignSelf: 'flex-start', mt: 2 }}>Update Profile</Button>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>System Preferences</Typography>
            <Box sx={{ mt: 2 }}>
              <FormControlLabel control={<Switch defaultChecked />} label="Email Notifications for new scans" />
              <Divider sx={{ my: 2 }} />
              <FormControlLabel control={<Switch defaultChecked />} label="Automatic report generation" />
              <Divider sx={{ my: 2 }} />
              <FormControlLabel control={<Switch />} label="Dark Mode (Beta)" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
