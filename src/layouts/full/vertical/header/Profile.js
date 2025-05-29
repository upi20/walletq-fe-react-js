import React, { useState } from 'react';
import { Link } from 'react-router';
import { Box, Menu, Avatar, Typography, Divider, Button, IconButton } from '@mui/material';
import * as dropdownData from './data';
import { IconMail } from '@tabler/icons';
import { Stack } from '@mui/system';
import unlimitedImg from 'src/assets/images/backgrounds/unlimited-bg.png';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import { useAuth } from '../../../../hook/useAuth';
import { useUserData } from '../../../../hook/useUserData';
import LogoutConfirmDialog from '../../../../components/dialogs/LogoutConfirmDialog';
import { formatRupiah } from '../../../../utils/formatRupiah';

const Profile = () => {
  const { logout } = useAuth();
  const { userData } = useUserData(); // Use the shared context
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

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
      handleClose2();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        onClick={handleClick2}
      >
        <Avatar src={userData.profile?.avatar || ''} alt={userData.name || ''} />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
          },
        }}
      >
        <Scrollbar sx={{ height: '100%', maxHeight: '85vh' }}>
          <Box p={3}>
            <Typography variant="h5">User Profile</Typography>
          </Box>
          <Divider />
          <Box p={3}>
            <Stack direction="row" py={3} spacing={2} alignItems="center">
              <Avatar
                src={userData.profile?.avatar || ''}
                alt={userData.name}
                sx={{ width: 95, height: 95 }}
              />
              <Box>
                <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                  {userData.name}
                </Typography>                <Typography variant="subtitle2" color="primary" fontWeight={600}>
                  Rp {formatRupiah(userData.balance, false)}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <IconMail width={15} height={15} />
                  {userData.email}
                </Typography>
              </Box>
            </Stack>
            <Divider />
            {dropdownData.profile.map((profile) => (
              <Box key={profile.title}>
                <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                  <Link to={profile.href}>
                    <Stack direction="row" spacing={2}>
                      <Box
                        width={45}
                        height={45}
                        bgcolor="primary.light"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Avatar
                          src={profile.icon}
                          alt={profile.icon}
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: 0,
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          color="textPrimary"
                          className="text-hover"
                          noWrap
                          sx={{
                            width: '240px',
                          }}
                        >
                          {profile.title}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          sx={{
                            width: '240px',
                          }}
                          noWrap
                        >
                          {profile.subtitle}
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                </Box>
              </Box>
            ))}
            <Box mt={2}>
              <Box bgcolor="primary.light" p={3} mb={3} overflow="hidden" position="relative">
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <Typography variant="h5" mb={2}>
                      Unlimited <br />
                      Access
                    </Typography>
                    <Button variant="contained" color="primary">
                      Upgrade
                    </Button>
                  </Box>
                  <img src={unlimitedImg} alt="unlimited" className="signup-bg"></img>
                </Box>
              </Box>
              <Button variant="outlined" color="primary" onClick={handleLogoutClick} fullWidth>
                Logout
              </Button>
              <LogoutConfirmDialog
                open={showLogoutDialog}
                onClose={handleLogoutCancel}
                onConfirm={handleLogout}
              />
            </Box>
          </Box>
        </Scrollbar>
      </Menu>
    </Box>
  );
};

export default Profile;
