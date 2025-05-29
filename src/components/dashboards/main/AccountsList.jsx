import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  useTheme,
  Skeleton,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Card,
  CardContent,
  Stack,
  LinearProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { formatRupiah } from '../../../utils/formatRupiah';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const AccountsList = ({ accounts = [], isLoading = false }) => {
  const [sortedAccounts, setSortedAccounts] = useState(accounts);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'balance',
    direction: 'desc',
  });
  const [error, setError] = useState(null);
  const theme = useTheme();

  const totalBalance = sortedAccounts.reduce(
    (sum, account) => sum + parseFloat(account.current_balance),
    0,
  );

  // Update sortedAccounts when accounts prop changes
  React.useEffect(() => {
    setSortedAccounts(accounts);
  }, [accounts]);

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        const [datePart, timePart] = dateString.split(' ');
        const [day, month, year] = datePart.split('-');
        const [hours, minutes, seconds] = (timePart || '00:00:00').split(':');
        return new Date(year, month - 1, day, hours, minutes, seconds);
      }
      return date;
    } catch (error) {
      console.warn('Invalid date format:', dateString);
      return new Date(0);
    }
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const newSortedAccounts = [...sortedAccounts].sort((a, b) => {
      if (key === 'name') {
        return direction === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (key === 'balance') {
        const aBalance = parseFloat(a.current_balance);
        const bBalance = parseFloat(b.current_balance);
        return direction === 'asc' ? aBalance - bBalance : bBalance - aBalance;
      }
      if (key === 'created') {
        const aDate = formatDate(a.created_at);
        const bDate = formatDate(b.created_at);
        return direction === 'asc'
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      }
      return 0;
    });

    setSortedAccounts(newSortedAccounts);
    handleSortClose();
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <ArrowUpwardIcon fontSize="small" sx={{ ml: 1 }} />
    ) : (
      <ArrowDownwardIcon fontSize="small" sx={{ ml: 1 }} />
    );
  };

  const getColor = (index) => {
    const colors = [
      'rgba(63, 81, 181, 0.08)', // primary
      'rgba(255, 152, 0, 0.08)', // warning
      'rgba(156, 39, 176, 0.08)', // secondary
      'rgba(3, 169, 244, 0.08)', // info
      'rgba(76, 175, 80, 0.08)', // success
    ];
    return colors[index % colors.length];
  };

  const getTextColor = (index) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.secondary.main,
      theme.palette.info.main,
      theme.palette.success.main,
    ];
    return colors[index % colors.length];
  };

  if (error) {
    return (
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Box
            bgcolor="rgba(244, 67, 54, 0.08)"
            textAlign="center"
            p={3}
            borderRadius={2}
            sx={{ boxShadow: '0 2px 6px rgba(244, 67, 54, 0.1)' }}
          >
            <Typography color="error" align="center">
              {error}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <Box>
      <Paper
        elevation={1}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
          spacing={3}
        >
          <Stack direction="row" alignItems="center" spacing={2.5}>
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.light,
                color: theme.palette.primary.main,
                width: 48,
                height: 48,
                boxShadow: `0 0 0 4px ${theme.palette.primary.light}`,
              }}
            >
              <AccountBalanceWalletIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Daftar Rekening
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle1" color="textSecondary">
                  {sortedAccounts.length} Rekening Aktif
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  •
                </Typography>
                <Typography variant="subtitle1" color="primary" fontWeight={600}>
                  Total: {formatRupiah(totalBalance)}
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <Tooltip title="Urutkan Rekening">
            <IconButton
              onClick={handleSortClick}
              size="large"
              sx={{
                bgcolor: Boolean(anchorEl)
                  ? `${theme.palette.primary.light} !important`
                  : 'transparent',
                color: Boolean(anchorEl)
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
                '&:hover': {
                  bgcolor: theme.palette.primary.light,
                  color: theme.palette.primary.main,
                },
              }}
            >
              <SortIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleSortClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            elevation: 1,
            sx: {
              minWidth: 200,
              mt: 1,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            },
          }}
        >
          <MenuItem onClick={() => handleSort('name')} selected={sortConfig.key === 'name'}>
            <ListItemIcon>
              <SortByAlphaIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Sort by Name</ListItemText>
            {getSortIcon('name')}
          </MenuItem>
          <MenuItem onClick={() => handleSort('balance')} selected={sortConfig.key === 'balance'}>
            <ListItemIcon>
              <AttachMoneyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Sort by Balance</ListItemText>
            {getSortIcon('balance')}
          </MenuItem>
          <MenuItem onClick={() => handleSort('created')} selected={sortConfig.key === 'created'}>
            <ListItemIcon>
              <AccessTimeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Sort by Created Date</ListItemText>
            {getSortIcon('created')}
          </MenuItem>
        </Menu>
      </Paper>

      <Grid container spacing={3}>
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Grid xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    bgcolor: getColor(index),
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    borderRadius: 2,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Skeleton
                      variant="circular"
                      width={48}
                      height={48}
                      sx={{
                        mb: 2,
                        bgcolor: 'rgba(0,0,0,0.08)',
                      }}
                    />
                    <Skeleton
                      variant="text"
                      width="60%"
                      sx={{
                        mb: 1,
                        bgcolor: 'rgba(0,0,0,0.08)',
                      }}
                    />
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={32}
                      sx={{
                        mb: 2,
                        bgcolor: 'rgba(0,0,0,0.08)',
                      }}
                    />
                    <Skeleton
                      variant="rectangular"
                      height={6}
                      sx={{
                        borderRadius: 3,
                        bgcolor: 'rgba(0,0,0,0.08)',
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : sortedAccounts.map((account, index) => {
              const percent = totalBalance > 0 ? (account.current_balance / totalBalance) * 100 : 0;
              return (
                <Grid xs={12} sm={6} md={4} lg={3} key={account.id}>
                  <Card
                    sx={{
                      height: '100%',
                      bgcolor: getColor(index),
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      borderRadius: 2,
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
                        bgcolor: `${getColor(index).replace('0.08', '0.12')}`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Avatar
                        sx={{
                          bgcolor: 'white',
                          width: 48,
                          height: 48,
                          mb: 2,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                          '& .MuiSvgIcon-root': {
                            color: getTextColor(index),
                          },
                        }}
                      >
                        <AccountBalanceWalletIcon />
                      </Avatar>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: 'text.primary' }}
                        fontWeight={500}
                        mb={0.5}
                      >
                        {account.name}
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{ color: getTextColor(index) }}
                        mb={2}
                      >
                        {formatRupiah(account.current_balance)}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={percent}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'rgba(0,0,0,0.04)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3,
                            bgcolor: getTextColor(index),
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
      </Grid>
    </Box>
  );
};

export default AccountsList;
