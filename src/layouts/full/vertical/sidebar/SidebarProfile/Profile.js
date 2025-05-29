import React, { useState } from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { IconPower } from '@tabler/icons';
import { useAuth } from '../../../../../hook/useAuth';
import LogoutConfirmDialog from '../../../../../components/dialogs/LogoutConfirmDialog';
import { useUserData } from '../../../../../hook/useUserData';
import { formatRupiah } from '../../../../../utils/formatRupiah';

export const Profile = () => {
  const { logout } = useAuth();
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { userData } = useUserData();

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

  if (hideMenu) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Tooltip title={userData.name} placement="right">
          <Avatar
            src={userData.profile?.avatar || ''}
            alt={userData.name}
            sx={{
              width: 40,
              height: 40,
              cursor: 'pointer',
              margin: '0 auto'
            }}
          />
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        mt: 'auto',
        bgcolor: (theme) => theme.palette.mode === 'dark'
          ? 'rgba(0,0,0,0.05)'
          : 'secondary.light',
        borderRadius: (theme) => theme.shape.borderRadius,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={2}
      >
        <Avatar
          alt={userData.name}
          src={userData.profile?.avatar || ''}
          sx={{ width: 42, height: 42 }}
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            noWrap
          >
            {userData.name}
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="600"
            color="primary"
            noWrap
          >
            Rp {formatRupiah(userData.balance, false)}
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <Tooltip title="Logout" placement="top">
            <IconButton
              color="primary"
              onClick={handleLogoutClick}
              aria-label="logout"
              size="small"
              sx={{
                bgcolor: (theme) => theme.palette.primary.light,
                ':hover': {
                  bgcolor: (theme) => theme.palette.primary.main,
                  color: 'white'
                }
              }}
            >
              <IconPower size="18" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <LogoutConfirmDialog
        open={showLogoutDialog}
        onClose={handleLogoutCancel}
        onConfirm={handleLogout}
      />
    </Box>
  );
};
