import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Avatar,
  useTheme,
  Skeleton,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { authService } from '../../../services/auth.service';
import { formatRupiah } from '../../../utils/formatRupiah';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const AccountsList = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc',
  });
  const theme = useTheme();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await authService.me();
        setAccounts(response.accounts);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch accounts:', err);
        setError('Gagal memuat data rekening');
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const formatDate = (dateString) => {
    try {
      // Coba parse dengan asumsi format ISO
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // Jika invalid, coba parse format custom (jika ada)
        const [datePart, timePart] = dateString.split(' ');
        const [day, month, year] = datePart.split('-');
        const [hours, minutes, seconds] = (timePart || '00:00:00').split(':');
        return new Date(year, month - 1, day, hours, minutes, seconds);
      }
      return date;
    } catch (error) {
      console.warn('Invalid date format:', dateString);
      return new Date(0); // Return epoch date jika parsing gagal
    }
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sortedAccounts = [...accounts].sort((a, b) => {
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

    setAccounts(sortedAccounts);
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
            borderRadius={1}
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

  const totalBalance = accounts.reduce(
    (sum, account) => sum + parseFloat(account.current_balance),
    0,
  );

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3} px={1}>
        <Box display="flex" alignItems="center">
          <AccountBalanceWalletIcon color="primary" sx={{ mr: 2 }} />
          <Typography variant="h5" fontWeight={600}>
            Daftar Rekening
          </Typography>
        </Box>
        <IconButton
          onClick={handleSortClick}
          size="small"
          sx={{
            bgcolor: Boolean(anchorEl) ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.04)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.08)' },
          }}
        >
          <SortIcon />
        </IconButton>
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
          <Tooltip title="Sort by creation date and time" placement="left">
            <MenuItem onClick={() => handleSort('created')} selected={sortConfig.key === 'created'}>
              <ListItemIcon>
                <AccessTimeIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Sort by Created Date</ListItemText>
              {getSortIcon('created')}
            </MenuItem>
          </Tooltip>
        </Menu>
      </Box>

      <Grid container spacing={2}>
        {isLoading
          ? [...Array(4)].map((_, index) => (
              <Grid xs={12} sm={6} lg={3} key={index}>
                <Box
                  bgcolor={getColor(index)}
                  p={3}
                  borderRadius={1}
                  sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                >
                  <Skeleton variant="circular" width={44} height={44} sx={{ mb: 2 }} />
                  <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="80%" height={32} sx={{ mb: 2 }} />
                  <Skeleton variant="rectangular" height={6} />
                </Box>
              </Grid>
            ))
          : accounts.map((account, index) => {
              const percent = totalBalance > 0 ? (account.current_balance / totalBalance) * 100 : 0;
              return (
                <Grid xs={12} sm={6} lg={3} key={account.id}>
                  <Box
                    bgcolor={getColor(index)}
                    p={3}
                    borderRadius={1}
                    sx={{
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: 'white',
                        width: 44,
                        height: 44,
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
                  </Box>
                </Grid>
              );
            })}
      </Grid>
    </Box>
  );
};

export default AccountsList;
