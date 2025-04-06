import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Paper, Grid, useTheme } from '@mui/material';
import axiosServices from '../../../utils/axios';
import { formatRupiah } from '../../../utils/formatRupiah';

const AccountBreakdown = () => {
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosServices.get('/user/master-data/account');
        setBalance(response.data.data.balance);
        setAccounts(response.data.data.accounts);
      } catch (err) {
        console.error('Gagal fetch data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Distribusi Rekening (% dari Total)
      </Typography>

      {accounts.map((acc, index) => {
        const percent = balance > 0 ? (acc.current_balance / balance) * 100 : 0;

        return (
          <Box key={index} mb={2}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="subtitle2">{acc.name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">{percent.toFixed(1)}%</Typography>
              </Grid>
            </Grid>

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

            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Rp {formatRupiah(acc.current_balance, false)}
            </Typography>
          </Box>
        );
      })}
    </Paper>
  );
};

export default AccountBreakdown;
