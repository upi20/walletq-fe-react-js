import React, { useState, useEffect } from 'react';
import { Grid, Alert, Skeleton } from '@mui/material';

import AccountsList from '../../components/dashboards/main/AccountsList';
import TotalAmount from '../../components/dashboards/main/TotalAmount';
import authService from '../../services/auth.service';
import { UserDataContext } from '../../hook/useUserData';

const Main = () => {
  const [userData, setUserData] = useState({
    balance: 0,
    accounts: [],
    name: '',
    email: '',
    role: 'User',
    profile: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Centralized data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await authService.me();
        setUserData({
          balance: parseFloat(response.balance),
          accounts: response.accounts || [],
          name: response.name || '',
          email: response.email || '',
          role: response.role || 'User',
          profile: response.profile || {},
        });
      } catch (error) {
        setError('Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.');
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Early return if loading
  if (loading) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Skeleton variant="rectangular" height={200} />
        </Grid>
        <Grid item xs={12} lg={12}>
          <Skeleton variant="rectangular" height={400} />
        </Grid>
      </Grid>
    );
  }

  // Early return if there's an error in data
  if (error) {
    return (
      <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <AccountsList accounts={userData.accounts} />
        </Grid>
      </Grid>
    </UserDataContext.Provider>
  );
};

export default Main;
