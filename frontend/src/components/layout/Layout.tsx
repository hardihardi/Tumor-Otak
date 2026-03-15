import React, { useState } from 'react';
import { Box, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BottomNav from './BottomNav';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f4f7fe', minHeight: '100vh' }}>
      <Topbar onMenuClick={handleDrawerToggle} />
      {!isMobile && <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          pb: isMobile ? 10 : 3 // Space for bottom nav
        }}
      >
        <Toolbar />
        {children}
      </Box>
      {isMobile && <BottomNav />}
    </Box>
  );
};

export default Layout;
