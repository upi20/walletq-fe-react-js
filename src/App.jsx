import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import router from './routes/Router';
import { UserDataContext } from './hook/useUserData';
import authService from './services/auth.service';
import './App.css';

function App() {
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.customizer);

  const [userData, setUserData] = useState({
    balance: 0,
    accounts: [],
    name: '',
    email: '',
    role: 'User',
    profile: {},
  });

  // Centralized data fetching
  useEffect(() => {
    const fetchData = async () => {
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
        console.error('Error fetching user data:', error);
      }
    };

    const token = authService.getToken();
    if (token && authService.isTokenValid(token)) {
      fetchData();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <RTL direction={customizer.activeDir}>
        <CssBaseline />
        <UserDataContext.Provider value={{ userData, setUserData }}>
          <RouterProvider router={router} />
        </UserDataContext.Provider>
      </RTL>
    </ThemeProvider>
  );
}

export default App;
