import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { useAuth } from '../../../hook/useAuth';
import axiosServices from '../../../utils/axios';
import { useNavigate } from 'react-router-dom';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const userFriendlyMessage = {
    'validation.unique': 'Email sudah digunakan',
    'validation.required': 'Field wajib diisi',
    'validation.email': 'Format email tidak valid',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const response = await axiosServices.post('/auth/login', {
        email,
        password,
      });
      setLoading(false);
      login(response.data.data.token);

      setMessage('✅ Login berhasil!');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.log(error);

      setLoading(false);
      const { data, status } = error;
      if (status === 422) {
        const errors = data;
        const errorMessages = Object.keys(errors).map((key) => {
          return userFriendlyMessage[errors[key][0]] || errors[key][0];
        });
        setMessage(errorMessages.join(', '));
      } else {
        setMessage(data.message);
      }
      return false;
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <form onSubmit={handleSubmit}>
        <Stack mb={3}>
          <Box>
            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
            <CustomTextField
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              variant="outlined"
              fullWidth
              required
              type="email"
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomTextField
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="password"
              variant="outlined"
              fullWidth
              required
              type="password"
            />
          </Box>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
          >
            Sign In
          </Button>
          {message && (
            <p style={{ marginTop: '10px', color: message.startsWith('✅') ? 'green' : 'red' }}>
              {message}
            </p>
          )}
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default AuthLogin;
