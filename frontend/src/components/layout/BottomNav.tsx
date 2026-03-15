import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Psychology as PsychologyIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, display: { sm: 'none' } }} elevation={3}>
      <BottomNavigation value={location.pathname} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Home" value="/" icon={<DashboardIcon />} />
        <BottomNavigationAction label="Pasien" value="/patients" icon={<PeopleIcon />} />
        <BottomNavigationAction label="Analisis" value="/analyze" icon={<PsychologyIcon />} />
        <BottomNavigationAction label="Log" value="/logs" icon={<AssignmentIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
