import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Toolbar, Typography, Divider, Box
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Assignment as AssignmentIcon,
  Security as SecurityIcon,
  Public as PublicIcon,
  Widgets as WidgetsIcon,
  Psychology as PsychologyIcon,
  VpnKey as VpnKeyIcon
} from '@mui/icons-material';

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sections = [
    {
      title: 'Home',
      items: [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'MRI Analysis', icon: <PsychologyIcon />, path: '/analyze' },
        { text: 'Data Pasien', icon: <PeopleIcon />, path: '/patients' },
        { text: 'Activity Logs', icon: <AssignmentIcon />, path: '/logs' },
      ]
    },
    {
      title: 'Management',
      items: [
        { text: 'Role Management', icon: <SecurityIcon />, path: '/roles' },
        { text: 'Permissions', icon: <VpnKeyIcon />, path: '/permissions' },
        { text: 'User Settings', icon: <SettingsIcon />, path: '/settings' },
      ]
    }
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{
          width: 32, height: 32, bgcolor: 'primary.main', borderRadius: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
        }}>
          <PsychologyIcon sx={{ fontSize: 20 }} />
        </Box>
        <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
          Bumame ML
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ overflowY: 'auto', flexGrow: 1, py: 2 }}>
        {sections.map((section) => (
          <Box key={section.title} sx={{ mb: 3 }}>
            <Typography variant="overline" sx={{ px: 3, color: 'text.secondary', fontWeight: 'bold', fontSize: '0.7rem' }}>
              {section.title}
            </Typography>
            <List sx={{ px: 1 }}>
              {section.items.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(item.path);
                        if (mobileOpen) onClose();
                      }}
                      sx={{
                        borderRadius: 2,
                        mb: 0.5,
                        bgcolor: active ? 'primary.main' : 'transparent',
                        color: active ? 'white' : 'text.secondary',
                        '&:hover': {
                          bgcolor: active ? 'primary.dark' : 'rgba(0,0,0,0.04)',
                          color: active ? 'white' : 'primary.main',
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: active ? 600 : 400 }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box', width: drawerWidth,
            borderRight: '1px solid rgba(0,0,0,0.05)',
            boxShadow: 'none'
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
