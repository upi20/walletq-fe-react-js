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
  Container,
  Grid,
  useTheme,
} from '@mui/material';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { useAuth } from '../../../hook/useAuth';
import { useNavigate } from 'react-router-dom';
import axiosServices from '../../../utils/axios';

const validationSchema = Yup.object({
  name: Yup.string().min(3, 'Nama minimal 3 karakter').required('Nama wajib diisi'),
  email: Yup.string().email('Format email tidak valid').required('Email wajib diisi'),
  password: Yup.string()
    .min(8, 'Password minimal 8 karakter')
    .matches(/[a-z]/, 'Password harus mengandung huruf kecil')
    .matches(/[A-Z]/, 'Password harus mengandung huruf besar')
    .matches(/[0-9]/, 'Password harus mengandung angka')
    .required('Password wajib diisi'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Password tidak sama')
    .required('Konfirmasi password wajib diisi'),
});

const AuthRegister = ({ title, subtitle, subtext }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axiosServices.post('/auth/register', values);
        login(response.data.data.token);
        navigate('/');
      } catch (error) {
        console.error('Registration failed:', error);
        const message = error.response?.data?.message || 'Terjadi kesalahan pada server';
        formik.setErrors({ submit: message });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          background: theme.palette.primary.light,
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={3} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h1"
                fontWeight={800}
                color="primary.main"
                textAlign={{ xs: 'center', md: 'left' }}
                sx={{ mb: 2 }}
              >
                Welcome to WalletQ
              </Typography>
              <Typography
                variant="h6"
                fontWeight={500}
                color="textSecondary"
                textAlign={{ xs: 'center', md: 'left' }}
              >
                Kelola keuangan Anda dengan mudah dan aman
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                p: 4,
                backgroundColor: 'white',
                borderRadius: 3,
                boxShadow: theme.shadows[3],
              }}
            >
              <Box mb={3}>
                <Typography variant="h5" fontWeight={600} textAlign="center">
                  {title}
                </Typography>
                {subtext && (
                  <Typography variant="subtitle2" color="textSecondary" textAlign="center" mt={1}>
                    {subtext}
                  </Typography>
                )}
              </Box>

              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2.5}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600} color="textSecondary" mb={1}>
                      Informasi Personal
                    </Typography>
                    <Stack spacing={2}>
                      <CustomTextField
                        fullWidth
                        id="name"
                        name="name"
                        placeholder="Masukkan nama lengkap"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        sx={{
                          'input::placeholder': {
                            color: theme.palette.text.secondary,
                            opacity: 0.8,
                            fontSize: '0.875rem',
                          },
                        }}
                      />

                      <CustomTextField
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Masukkan email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        autoComplete="email"
                        sx={{
                          'input::placeholder': {
                            color: theme.palette.text.secondary,
                            opacity: 0.8,
                            fontSize: '0.875rem',
                          },
                        }}
                      />
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" fontWeight={600} color="textSecondary" mb={1}>
                      Keamanan Akun
                    </Typography>
                    <Stack spacing={2}>
                      <CustomTextField
                        fullWidth
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Minimal 8 karakter"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        autoComplete="new-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                size="small"
                              >
                                {showPassword ? <IconEyeOff size="20" /> : <IconEye size="20" />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          'input::placeholder': {
                            color: theme.palette.text.secondary,
                            opacity: 0.8,
                            fontSize: '0.875rem',
                          },
                        }}
                      />

                      <CustomTextField
                        fullWidth
                        id="password_confirmation"
                        name="password_confirmation"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Konfirmasi password"
                        value={formik.values.password_confirmation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.password_confirmation &&
                          Boolean(formik.errors.password_confirmation)
                        }
                        helperText={
                          formik.touched.password_confirmation &&
                          formik.errors.password_confirmation
                        }
                        autoComplete="new-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                                size="small"
                              >
                                {showConfirmPassword ? (
                                  <IconEyeOff size="20" />
                                ) : (
                                  <IconEye size="20" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          'input::placeholder': {
                            color: theme.palette.text.secondary,
                            opacity: 0.8,
                            fontSize: '0.875rem',
                          },
                        }}
                      />
                    </Stack>
                  </Box>

                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={loading || !formik.isValid}
                    sx={{
                      py: 1.5,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {loading ? 'Loading...' : 'Daftar Sekarang'}
                  </Button>
                </Stack>
              </form>

              {subtitle && (
                <Typography variant="body2" textAlign="center" sx={{ mt: 3 }} color="textSecondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AuthRegister;
