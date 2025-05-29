import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { IconEdit, IconTrash } from '@tabler/icons';
import axios from '../../../utils/axios';
import { formatRupiah } from '../../../utils/formatRupiah';

const AccountsList = ({ onEdit, onRefresh }) => {
    const [accounts, setAccounts] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [accountToDelete, setAccountToDelete] = useState(null);

    const fetchAccounts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/user/master-data/account');
            const { accounts, balance } = response.data;
            setAccounts(accounts || []);
            setTotalBalance(balance || 0);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, [onRefresh]);

    const handleEdit = (account) => {
        onEdit(account);
    };

    const handleDeleteClick = (account) => {
        setAccountToDelete(account);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!accountToDelete) return;

        try {
            await axios.delete(`/user/master-data/account/${accountToDelete.id}`);
            fetchAccounts(); // Refresh the list after deletion
            setDeleteDialogOpen(false);
            setAccountToDelete(null);
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setAccountToDelete(null);
    };

    return (
        <Card variant="outlined">
            <Box p={3}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h5">Accounts</Typography>
                    <Typography variant="h6">Total Balance: {formatRupiah(totalBalance)}</Typography>
                </Stack>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Account Name</TableCell>
                                <TableCell>Initial Balance</TableCell>
                                <TableCell>Current Balance</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accounts.map((account) => (
                                <TableRow key={account.id}>
                                    <TableCell>{account.name}</TableCell>
                                    <TableCell>{formatRupiah(account.initial_balance)}</TableCell>
                                    <TableCell>{formatRupiah(account.current_balance)}</TableCell>
                                    <TableCell>{account.type || '-'}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() => handleEdit(account)}
                                            >
                                                <IconEdit size={18} />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleDeleteClick(account)}
                                            >
                                                <IconTrash size={18} />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteCancel}
                    aria-labelledby="delete-dialog-title"
                    aria-describedby="delete-dialog-description"
                >
                    <DialogTitle id="delete-dialog-title">
                        Delete Account
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="delete-dialog-description">
                            Are you sure you want to delete account "{accountToDelete?.name}"?
                            This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteCancel} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteConfirm}
                            color="error"
                            variant="contained"
                            autoFocus
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Card>
    );
};

export default AccountsList;
