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
import {
  IconEye,
  IconEyeOff,
  IconMail,
  IconLock,
  IconArrowRight,
  IconUser,
} from '@tabler/icons-react';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { useAuth } from '../../../hook/useAuth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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

const AuthRegister = () => {
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
        console.log('Registration response:', response); // Debug log

        // Check if we have a token in the response
        const token = response.data?.data?.token || response.data?.token;

        if (!token) {
          throw new Error('No token received from server');
        }

        // Set success status and login
        formik.setStatus({ success: true });
        login(token);

        // Add a small delay before navigation to show success state
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } catch (error) {
        console.error('Registration failed:', error);

        // Menangani error validasi email sudah terdaftar
        if (error.email?.[0] === 'validation.unique') {
          formik.setTouched({ email: true }, false);
          formik.setErrors({ email: 'Email sudah terdaftar' });
          setLoading(false);
          return;
        } // Handle validation errors
        if (error.status === 422) {
          const errorMessages = {};
          Object.entries(error).forEach(([field, messages]) => {
            if (Array.isArray(messages) && field !== 'data') {
              errorMessages[field] = messages[0];
              formik.setTouched({ [field]: true }, false);
            }
          });

          if (Object.keys(errorMessages).length > 0) {
            formik.setErrors(errorMessages);
            setLoading(false);
            return;
          }
        }

        // Default error message
        formik.setErrors({ submit: 'Terjadi kesalahan pada server' });
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
                Buat Akun Baru! ✨
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                Daftar untuk mulai menggunakan WalletQ
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
                {formik.status?.success && (
                  <Alert
                    severity="success"
                    variant="filled"
                    sx={{
                      borderRadius: 1,
                      '& .MuiAlert-message': {
                        fontWeight: 500,
                      },
                    }}
                  >
                    Registrasi berhasil! Anda akan dialihkan...
                  </Alert>
                )}

                <CustomTextField
                  fullWidth
                  id="name"
                  name="name"
                  placeholder="Nama lengkap"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconUser size={20} stroke={1.5} color={theme.palette.text.secondary} />
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
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Alamat email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  autoComplete="email"
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
                  autoComplete="new-password"
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
                    formik.touched.password_confirmation && formik.errors.password_confirmation
                  }
                  autoComplete="new-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconLock size={20} stroke={1.5} color={theme.palette.text.secondary} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          size="small"
                          sx={{ color: 'text.secondary' }}
                        >
                          {showConfirmPassword ? (
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
                  {loading ? 'Loading...' : 'Daftar Sekarang'}
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
                      Sudah punya akun?
                    </Typography>
                  </Divider>
                </Box>

                <Button
                  component={RouterLink}
                  to="/auth/login"
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
                    '&:hover': { borderWidth: 1.5, backgroundColor: 'grey.50' },
                  }}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Zoom>
    </Box>
  );
};

export default AuthRegister;
