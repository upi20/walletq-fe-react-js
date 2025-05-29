import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  useTheme,
  Alert,
  Zoom,
  Link,
  Divider,
} from '@mui/material';
import { IconEye, IconEyeOff, IconMail, IconLock, IconArrowRight } from '@tabler/icons-react';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { useAuth } from '../../../hook/useAuth';
import { Link as RouterLink } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string().email('Format email tidak valid').required('Email wajib diisi'),
  password: Yup.string().required('Password wajib diisi'),
});

const AuthLogin = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!formik.isValid) return;

      setLoading(true);
      formik.setErrors({}); // Clear previous errors

      try {
        await login(values.email, values.password);
        // Successful login will be handled by useAuth hook
      } catch (error) {
        console.error('Login failed:', error);

        // Handle validation errors
        if (error.status === 422) {
          const validationErrors = {};
          if (error.errors) {
            Object.entries(error.errors).forEach(([field, messages]) => {
              if (Array.isArray(messages)) {
                validationErrors[field] = messages[0];
                formik.setTouched({ [field]: true }, false);
              }
            });
          }
          if (Object.keys(validationErrors).length > 0) {
            formik.setErrors(validationErrors);
            return;
          }
        }

        // Handle incorrect credentials
        if (error.status === 401 || error.status === 403) {
          formik.setErrors({ submit: 'Email atau password salah' });
          return;
        }

        // Handle other errors
        const message = error.message || 'Terjadi kesalahan saat login';
        formik.setErrors({ submit: message });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.lighter} 0%, ${theme.palette.background.default} 100%)`,
        p: { xs: 2, sm: 4 },
      }}
    >
      <Zoom in={true}>
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            backgroundColor: 'background.paper',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            overflow: 'hidden',
          }}
        >
          {/* Top Gradient Bar */}
          <Box
            sx={{
              height: 4,
              background: (theme) => `linear-gradient(90deg, 
                ${theme.palette.primary.main}, 
                ${theme.palette.primary.dark}
              )`,
            }}
          />

          <Box sx={{ px: 3, py: 4 }}>
            {/* Logo */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <img
                src="/src/assets/logo-landscape-dark.png"
                alt="WalletQ Logo"
                style={{ height: '28px' }}
              />
            </Box>

            {/* Welcome Text */}
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  background: (theme) => `linear-gradient(90deg, 
                    ${theme.palette.primary.main}, 
                    ${theme.palette.primary.dark}
                  )`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Welcome Back! 👋
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                Masuk untuk melanjutkan ke Dashboard Anda
              </Typography>
            </Box>

            {/* Form */}
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2.5}>
                {formik.errors.submit && (
                  <Alert
                    severity="error"
                    variant="filled"
                    sx={{
                      borderRadius: 1,
                      '& .MuiAlert-message': {
                        fontWeight: 500,
                      },
                    }}
                  >
                    {formik.errors.submit}
                  </Alert>
                )}

                <CustomTextField
                  fullWidth
                  id="email"
                  name="email"
                  placeholder="Email address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconMail size={20} stroke={1.5} color={theme.palette.text.secondary} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      backgroundColor: 'grey.50',
                      '&:hover': {
                        backgroundColor: 'grey.100',
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'background.paper',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2,
                          borderColor: 'primary.main',
                        },
                      },
                    },
                  }}
                />

                <CustomTextField
                  fullWidth
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconLock size={20} stroke={1.5} color={theme.palette.text.secondary} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                          sx={{ color: 'text.secondary' }}
                        >
                          {showPassword ? (
                            <IconEyeOff size={20} stroke={1.5} />
                          ) : (
                            <IconEye size={20} stroke={1.5} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      backgroundColor: 'grey.50',
                      '&:hover': {
                        backgroundColor: 'grey.100',
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'background.paper',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2,
                          borderColor: 'primary.main',
                        },
                      },
                    },
                  }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Link
                    component={RouterLink}
                    to="/auth/forgot-password"
                    underline="hover"
                    variant="body2"
                    color="primary"
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.875rem',
                    }}
                  >
                    Lupa password?
                  </Link>
                </Box>

                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderRadius: 1,
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: 'none',
                    },
                    background: (theme) => `linear-gradient(90deg, 
                      ${theme.palette.primary.main}, 
                      ${theme.palette.primary.dark}
                    )`,
                  }}
                  endIcon={loading ? null : <IconArrowRight size={20} />}
                >
                  {loading ? 'Loading...' : 'Login'}
                </Button>

                <Box sx={{ mt: 2 }}>
                  <Divider>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        px: 2,
                        fontWeight: 500,
                        fontSize: '0.875rem',
                      }}
                    >
                      Belum punya akun?
                    </Typography>
                  </Divider>
                </Box>

                <Button
                  component={RouterLink}
                  to="/auth/register"
                  fullWidth
                  size="large"
                  variant="outlined"
                  sx={{
                    py: 1.5,
                    borderWidth: 1.5,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderRadius: 1,
                    textTransform: 'none',
                    borderColor: theme.palette.primary.main,
                    '&:hover': {
                      borderWidth: 1.5,
                      backgroundColor: 'grey.50',
                    },
                  }}
                >
                  Daftar Sekarang
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Zoom>
    </Box>
  );
};

export default AuthLogin;
