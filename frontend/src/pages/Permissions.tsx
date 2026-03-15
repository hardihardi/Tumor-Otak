import React from 'react';
import { Typography, Paper, Box, Grid, Card, CardContent, Checkbox, FormControlLabel, Button } from '@mui/material';

const Permissions = () => {
  const permissionGroups = [
    {
      title: 'MRI Analysis',
      items: ['Upload MRI', 'Analyze MRI', 'View Heatmap', 'Download DICOM']
    },
    {
      title: 'Patient Management',
      items: ['View Patients', 'Create Patient', 'Edit Patient', 'Delete Patient']
    },
    {
      title: 'User & Security',
      items: ['Manage Users', 'Manage Roles', 'View Audit Logs', 'System Settings']
    },
    {
      title: 'Reporting',
      items: ['Generate Report', 'Export Data', 'View Statistics']
    }
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Permission Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure granular access controls for system modules
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {permissionGroups.map((group) => (
          <Grid size={{ xs: 12, md: 6 }} key={group.title}>
            <Card sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', borderBottom: '2px solid', borderColor: 'primary.main', pb: 1, mb: 2 }}>
                  {group.title}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {group.items.map((item) => (
                    <FormControlLabel
                      key={item}
                      control={<Checkbox defaultChecked color="primary" />}
                      label={item}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined">Reset to Defaults</Button>
        <Button variant="contained" sx={{ px: 4 }}>Save Changes</Button>
      </Box>
    </Box>
  );
};

export default Permissions;
