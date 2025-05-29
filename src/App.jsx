import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import router from './routes/Router';
import { UserDataContext } from './hook/useUserData';
import { fetchUserData, setAuthenticated } from './store/auth/AuthSlice';
import authService from './services/auth.service';
import './App.css';

function App() {
  const theme = ThemeSettings();
  const dispatch = useDispatch();
  const customizer = useSelector((state) => state.customizer);
  const { userData, isAuthenticated } = useSelector((state) => state.auth);

  // Centralized data fetching
  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      const isValid = authService.isTokenValid(token);
      dispatch(setAuthenticated(isValid));
      if (isValid) {
        dispatch(fetchUserData());
      }
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      {' '}
      <RTL direction={customizer.activeDir}>
        <CssBaseline />
        <UserDataContext.Provider value={{ userData }}>
          <RouterProvider router={router} />
        </UserDataContext.Provider>
      </RTL>
    </ThemeProvider>
  );
}

export default App;
