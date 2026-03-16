import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  Button,
  Stack
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

const Permissions = () => {
  const permissionGroups = [
    {
      module: 'Analysis',
      permissions: ['Upload MRI', 'Analyze MRI', 'View Heatmap', 'Download DICOM']
    },
    {
      module: 'Patients',
      permissions: ['View Patients', 'Create Patient', 'Edit Patient', 'Delete Patient']
    },
    {
      module: 'Administration',
      permissions: ['Manage Users', 'Manage Roles', 'View Audit Logs', 'System Settings']
    },
    {
      module: 'Reporting',
      permissions: ['Generate Report', 'Export Data', 'View Statistics']
    }
  ];

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Permissions Registry</Typography>
          <Typography variant="body2" color="text.secondary">Global list of all available permissions in the enterprise system.</Typography>
        </Box>
        <Button variant="contained" startIcon={<SaveIcon />} sx={{ borderRadius: 2, bgcolor: '#135bec', px: 4, width: { xs: '100%', sm: 'auto' } }}>
          Save Changes
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {permissionGroups.map((group) => (
          <Grid key={group.module} size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>{group.module} Module</Typography>
                <Divider sx={{ mb: 2 }} />
                <FormGroup>
                  <Grid container spacing={1}>
                    {group.permissions.map((perm) => (
                      <Grid key={perm} size={{ xs: 12, sm: 6 }}>
                        <FormControlLabel
                          control={<Checkbox defaultChecked size="small" />}
                          label={<Typography variant="body2">{perm}</Typography>}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Permissions;
