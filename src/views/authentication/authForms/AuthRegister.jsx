import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { Stack } from '@mui/system';
import AuthSocialButtons from './AuthSocialButtons';
import { useState } from 'react';
import axiosServices from '../../../utils/axios';
import { random } from 'lodash';
import { useAuth } from '../../../hook/useAuth';

function AuthRegister({ title, subtitle, subtext }) {
  const { login } = useAuth();
  const [name, setName] = useState('Isep Lutpi Nur');
  const [email, setEmail] = useState(random(100, 999) + 'upi@gmail.com');
  const [password, setPassword] = useState('12345678');
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
      const response = await axiosServices.post('/auth/register', {
        name,
        email,
        password,
        password_confirmation: password,
      });
      setLoading(false);
      login(response.data.token);

      setMessage('✅ Registrasi berhasil!');
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
        setMessage('Terjadi kesalahan pada server');
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
      <AuthSocialButtons title="Sign up with" />

      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign up with
          </Typography>
        </Divider>
      </Box>

      <Box>
        <form onSubmit={handleSubmit}>
          <Stack mb={3}>
            <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
            <CustomTextField
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="name"
              variant="outlined"
              fullWidth
              required
            />
            <CustomFormLabel htmlFor="email">Email Adddress</CustomFormLabel>
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
          </Stack>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
          >
            Sign Up
          </Button>
          {message && (
            <p style={{ marginTop: '10px', color: message.startsWith('✅') ? 'green' : 'red' }}>
              {message}
            </p>
          )}
        </form>
      </Box>
      {subtitle}
    </>
  );
}

export default AuthRegister;
