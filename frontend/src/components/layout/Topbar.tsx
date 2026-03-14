import React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, InputBase,
  Box, Avatar, Badge, alpha
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  ChatBubbleOutline as ChatIcon
} from '@mui/icons-material';

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - 240px)` },
        ml: { sm: `240px` },
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}
    >
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: (theme) => alpha(theme.palette.common.black, 0.05),
          px: 2, py: 0.5, borderRadius: 2,
          width: { xs: '100%', sm: 300 }
        }}>
          <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          <InputBase placeholder="Search..." sx={{ width: '100%' }} />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton size="large" color="inherit">
            <ChatIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Box sx={{ display: { xs: 'none', md: 'block' }, mr: 1, textAlign: 'right' }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Austin Robertson</Typography>
              <Typography variant="caption" color="textSecondary">Marketing Administrator</Typography>
            </Box>
            <Avatar src="https://i.pravatar.cc/300" />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
