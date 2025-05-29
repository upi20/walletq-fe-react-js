import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';
import axios from '../../../utils/axios';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    initial_balance: Yup.number()
        .required('Initial balance is required')
        .min(0, 'Initial balance must be positive'),
    type: Yup.string(),
    note: Yup.string(),
});

const AccountForm = ({ open, onClose, account = null, onSuccess }) => {
    const isEdit = Boolean(account);

    const formik = useFormik({
        initialValues: {
            name: account?.name || '',
            initial_balance: account?.initial_balance || '0',
            type: account?.type || '',
            note: account?.note || '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                if (isEdit) {
                    await axios.put(`/user/master-data/account/${account.id}`, values);
                } else {
                    await axios.post('/user/master-data/account', values);
                }
                onSuccess?.();
                onClose();
            } catch (error) {
                console.error('Error saving account:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>{isEdit ? 'Edit Account' : 'Create New Account'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Account Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />

                            <TextField
                                fullWidth
                                id="initial_balance"
                                name="initial_balance"
                                label="Initial Balance"
                                type="number"
                                value={formik.values.initial_balance}
                                onChange={formik.handleChange}
                                error={formik.touched.initial_balance && Boolean(formik.errors.initial_balance)}
                                helperText={formik.touched.initial_balance && formik.errors.initial_balance}
                            />

                            <TextField
                                fullWidth
                                id="type"
                                name="type"
                                label="Account Type"
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                error={formik.touched.type && Boolean(formik.errors.type)}
                                helperText={formik.touched.type && formik.errors.type}
                            />

                            <TextField
                                fullWidth
                                id="note"
                                name="note"
                                label="Note"
                                multiline
                                rows={3}
                                value={formik.values.note}
                                onChange={formik.handleChange}
                                error={formik.touched.note && Boolean(formik.errors.note)}
                                helperText={formik.touched.note && formik.errors.note}
                            />
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={formik.isSubmitting}
                    >
                        {isEdit ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AccountForm;
