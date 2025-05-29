import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, LinearProgress, Avatar, useTheme, Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid2';

import axiosServices from '../../../utils/axios';
import { formatRupiah } from '../../../utils/formatRupiah';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const TopCards = () => {
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosServices.get('/auth/me');
        setBalance(parseFloat(response.balance));
        setAccounts(response.accounts || []);
        setIsLoading(false);
      } catch (err) {
        console.error('Gagal fetch data:', err);
        setError('Gagal memuat data rekening');
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getColor = (index) => {
    const colors = [
      theme.palette.primary.light,
      theme.palette.warning.light,
      theme.palette.secondary.light,
      theme.palette.error.light,
      theme.palette.success.light,
      theme.palette.info.light,
    ];
    return colors[index % colors.length];
  };

  if (error) {
    return (
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Box bgcolor={theme.palette.error.light} textAlign="center" padding={2}>
            <Typography color="error" align="center">
              {error}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[1, 2, 3].map((index) => (
          <Grid size={{ xs: 12, sm: 4, lg: 3 }} key={index}>
            <Box bgcolor={getColor(index)} textAlign="center" padding={2}>
              <Skeleton variant="circular" width={40} height={40} sx={{ mx: 'auto', mb: 1 }} />
              <Skeleton variant="text" width="60%" sx={{ mx: 'auto' }} />
              <Skeleton variant="text" width="80%" sx={{ mx: 'auto' }} height={32} />
              <Skeleton variant="rectangular" height={8} sx={{ mt: 0.5, borderRadius: 5 }} />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {[{ name: 'Total', current_balance: balance }, ...accounts].map((item, index) => {
        const percent = balance > 0 ? (item.current_balance / balance) * 100 : 0;
        return (
          <Grid size={{ xs: 12, sm: 4, lg: 3 }} key={index}>
            <Box bgcolor={getColor(index)} textAlign="center" padding={2}>
              <Avatar sx={{ bgcolor: 'white', width: 40, height: 40, mx: 'auto', mb: 1 }}>
                <AccountBalanceWalletIcon color="primary" fontSize="small" />
              </Avatar>
              <Typography variant="subtitle2" color="text.secondary">
                {item.name}
              </Typography>
              <Typography variant="h5" fontWeight={700} color="primary.main">
                Rp {formatRupiah(item.current_balance, false)}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={percent}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  mt: 0.5,
                  backgroundColor: theme.palette.grey[200],
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 5,
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TopCards;
