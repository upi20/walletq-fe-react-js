import { createSlice } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
    accounts: [],
    account: null,
    loading: false,
    error: null,
    totalBalance: 0
};

export const accountSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        getAccountsSuccess: (state, action) => {
            state.accounts = action.payload.accounts;
            state.totalBalance = action.payload.balance;
            state.loading = false;
        },
        getAccountSuccess: (state, action) => {
            state.account = action.payload;
            state.loading = false;
        },
        createAccountSuccess: (state, action) => {
            state.accounts.push(action.payload);
            state.totalBalance += parseFloat(action.payload.initial_balance);
            state.loading = false;
        },
        updateAccountSuccess: (state, action) => {
            const index = state.accounts.findIndex((account) => account.id === action.payload.id);
            if (index !== -1) {
                const oldBalance = parseFloat(state.accounts[index].current_balance);
                const newBalance = parseFloat(action.payload.current_balance);
                state.totalBalance = state.totalBalance - oldBalance + newBalance;
                state.accounts[index] = action.payload;
            }
            state.loading = false;
        },
        deleteAccountSuccess: (state, action) => {
            const index = state.accounts.findIndex((account) => account.id === action.payload);
            if (index !== -1) {
                state.totalBalance -= parseFloat(state.accounts[index].current_balance);
                state.accounts.splice(index, 1);
            }
            state.loading = false;
        }
    }
});

export const {
    startLoading,
    hasError,
    getAccountsSuccess,
    getAccountSuccess,
    createAccountSuccess,
    updateAccountSuccess,
    deleteAccountSuccess
} = accountSlice.actions;

// Async thunks
export const fetchAccounts = () => async (dispatch) => {
    dispatch(startLoading());
    try {
        const response = await axios.get('/user/master-data/account');
        dispatch(getAccountsSuccess(response.data.data));
    } catch (error) {
        dispatch(hasError(error.message));
    }
};

export const fetchAccount = (id) => async (dispatch) => {
    dispatch(startLoading());
    try {
        const response = await axios.get(`/user/master-data/account/${id}`);
        dispatch(getAccountSuccess(response.data.data));
    } catch (error) {
        dispatch(hasError(error.message));
    }
};

export const createAccount = (accountData) => async (dispatch) => {
    dispatch(startLoading());
    try {
        const response = await axios.post('/user/master-data/account', accountData);
        dispatch(createAccountSuccess(response.data.data));
        return response.data;
    } catch (error) {
        dispatch(hasError(error.message));
        throw error;
    }
};

export const updateAccount = (id, accountData) => async (dispatch) => {
    dispatch(startLoading());
    try {
        const response = await axios.put(`/user/master-data/account/${id}`, accountData);
        dispatch(updateAccountSuccess(response.data.data));
        return response.data;
    } catch (error) {
        dispatch(hasError(error.message));
        throw error;
    }
};

export const deleteAccount = (id) => async (dispatch) => {
    dispatch(startLoading());
    try {
        await axios.delete(`/user/master-data/account/${id}`);
        dispatch(deleteAccountSuccess(id));
    } catch (error) {
        dispatch(hasError(error.message));
        throw error;
    }
};

export default accountSlice.reducer;
