import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { formatRupiah } from '../../../utils/formatRupiah';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

const TotalAmount = ({ balance = 0, isLoading = false }) => {
  const theme = useTheme();

  return (
    <Box
      p={4}
      borderRadius={1}
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.15)',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          {' '}
          <Typography
            variant="h6"
            color="white"
            sx={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
            gutterBottom
          >
            Total Saldo
          </Typography>
          <Typography
            variant="h3"
            fontWeight={700}
            color="white"
            sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            Rp {formatRupiah(balance)}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AccountBalanceWalletOutlinedIcon
            sx={{
              fontSize: 40,
              color: 'white',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TotalAmount;
