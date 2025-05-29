import React, { useState } from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import img1 from 'src/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons';
import { useAuth } from '../../../../../hook/useAuth';
import LogoutConfirmDialog from '../../../../../components/dialogs/LogoutConfirmDialog';

export const Profile = () => {
  const { logout } = useAuth();
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowLogoutDialog(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={img1} />

          <Box>
            <Typography variant="h6" color="textPrimary">Mathew</Typography>
            <Typography variant="caption" color="textSecondary">Designer</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">              <IconButton
              color="primary"
              onClick={handleLogoutClick}
              aria-label="logout"
              size="small"
            >
              <IconPower size="20" />
            </IconButton>
            </Tooltip>
            <LogoutConfirmDialog
              open={showLogoutDialog}
              onClose={handleLogoutCancel}
              onConfirm={handleLogout}
            />
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
