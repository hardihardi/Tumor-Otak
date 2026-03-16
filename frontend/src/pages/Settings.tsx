import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Stack,
  Divider,
  MenuItem,
  Avatar
} from '@mui/material';
import {
  Save as SaveIcon,
  CloudUpload as CloudUploadIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Storage as StorageIcon,
  WhatsApp as WhatsAppIcon
} from '@mui/icons-material';

const Settings = () => {
  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold">System Settings</Typography>
          <Typography variant="body2" color="text.secondary">Configure enterprise branding, notifications, and system parameters.</Typography>
        </Box>
        <Button variant="contained" startIcon={<SaveIcon />} sx={{ borderRadius: 2, bgcolor: '#135bec', px: 4, width: { xs: '100%', sm: 'auto' } }}>
          Apply Changes
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>General Information</Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Organization Name" defaultValue="Bumame Health AI" variant="outlined" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Contact Email" defaultValue="support@bumame.com" variant="outlined" />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth multiline rows={2} label="System Description" defaultValue="AI-powered medical imaging analysis for neuro-oncology diagnostics." />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <WhatsAppIcon color="success" />
                    <span>WhatsApp Integration (Fonnte)</span>
                  </Stack>
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <TextField fullWidth label="API Token" type="password" defaultValue="TOKEN_HIDDEN_12345" variant="outlined" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Button fullWidth variant="outlined" sx={{ height: '56px', borderRadius: 2 }}>Test Connection</Button>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlLabel control={<Switch defaultChecked />} label="Send automatic result notifications to patients" />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <StorageIcon color="primary" />
                    <span>Database Management</span>
                  </Stack>
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" startIcon={<CloudUploadIcon />} sx={{ borderRadius: 2 }}>Export Backup (.sql)</Button>
                  <Button variant="outlined" color="error" sx={{ borderRadius: 2 }}>Flush Audit Logs</Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Branding</Typography>
                <Divider sx={{ mb: 3 }} />
                <Box textAlign="center" py={2}>
                  <Avatar
                    variant="rounded"
                    sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: '#e3f2fd', color: '#135bec' }}
                  >
                    LOGO
                  </Avatar>
                  <Button size="small">Change Logo</Button>
                </Box>
                <TextField fullWidth select label="Theme Mode" defaultValue="Light" sx={{ mt: 2 }}>
                  <MenuItem value="Light">Light Mode</MenuItem>
                  <MenuItem value="Dark">Dark Mode</MenuItem>
                  <MenuItem value="System">System Default</MenuItem>
                </TextField>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Security Policy</Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={1}>
                  <FormControlLabel control={<Switch defaultChecked />} label="Two-factor authentication" />
                  <FormControlLabel control={<Switch />} label="Strict password policy" />
                  <FormControlLabel control={<Switch defaultChecked />} label="Audit log encryption" />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
