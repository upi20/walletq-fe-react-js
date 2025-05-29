import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { useAuth } from '../../../hook/useAuth';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Format email tidak valid')
    .required('Email wajib diisi'),
  password: Yup.string()
    .min(8, 'Password minimal 8 karakter')
    .required('Password wajib diisi'),
});

const AuthLogin = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await login(values.email, values.password);
        navigate('/');
      } catch (error) {
        console.error('Login failed:', error);
        const message = error.response?.data?.message || 'Terjadi kesalahan pada server';
        formik.setErrors({ submit: message });
      } finally {
        setLoading(false);
      }
    }
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <Box>
            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
            <CustomTextField
              id="email"
              name="email"
              variant="outlined"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              type="email"
              autoComplete="email"
            />
          </Box>

          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomTextField
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <IconEyeOff size="20" /> : <IconEye size="20" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {formik.errors.submit && (
            <Box>
              <Typography color="error" sx={{ mt: 2 }}>
                {formik.errors.submit}
              </Typography>
            </Box>
          )}

          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading || !formik.isValid}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </Button>
        </Stack>
      </form>

      {subtitle}
    </>
  );
};

export default AuthLogin;
