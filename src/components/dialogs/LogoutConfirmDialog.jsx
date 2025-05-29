import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const LogoutConfirmDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="logout-dialog-title">Konfirmasi Logout</DialogTitle>
      <DialogContent>
        <Typography variant="body1" id="logout-dialog-description">
          Apakah Anda yakin ingin keluar dari aplikasi?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Batal
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error" autoFocus>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutConfirmDialog;
