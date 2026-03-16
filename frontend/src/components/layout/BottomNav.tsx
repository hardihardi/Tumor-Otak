import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Psychology as PsychologyIcon,
  MoreHoriz as MoreIcon,
  BarChart as BarChartIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  Settings as SettingsIcon,
  MonitorHeart as MonitorIcon
} from '@mui/icons-material';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path?: string) => {
    setAnchorEl(null);
    if (path) navigate(path);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, display: { sm: 'none' } }} elevation={3}>
      <BottomNavigation
        value={location.pathname}
        onChange={(_e, val) => val !== 'more' && navigate(val)}
        showLabels
      >
        <BottomNavigationAction label="Home" value="/" icon={<DashboardIcon />} />
        <BottomNavigationAction label="Pasien" value="/patients" icon={<PeopleIcon />} />
        <BottomNavigationAction label="Analisis" value="/analyze" icon={<PsychologyIcon />} />
        <BottomNavigationAction label="More" value="more" icon={<MoreIcon />} onClick={handleMoreClick} />
      </BottomNavigation>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MenuItem onClick={() => handleClose('/reports')}>
          <ListItemIcon><BarChartIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Reports" />
        </MenuItem>
        <MenuItem onClick={() => handleClose('/users')}>
          <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Users" />
        </MenuItem>
        <MenuItem onClick={() => handleClose('/logs')}>
          <ListItemIcon><AssignmentIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Logs" />
        </MenuItem>
        <MenuItem onClick={() => handleClose('/monitoring')}>
          <ListItemIcon><MonitorIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Monitoring" />
        </MenuItem>
        <MenuItem onClick={() => handleClose('/settings')}>
          <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default BottomNav;
