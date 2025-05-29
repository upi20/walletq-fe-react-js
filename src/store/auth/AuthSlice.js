import { createSlice } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';

const initialState = {
    isAuthenticated: authService.isTokenValid(authService.getToken()),
    userData: {
        balance: 0,
        accounts: [],
        name: '',
        email: '',
        role: 'User',
        profile: {},
    },
    error: null,
    loading: false
};

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        hasError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
            state.loading = false;
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userData = initialState.userData;
        }
    }
});

export const { startLoading, hasError, setUserData, setAuthenticated, logout } = AuthSlice.actions;

// Async thunk for fetching user data
export const fetchUserData = () => async (dispatch) => {
    dispatch(startLoading());
    try {
        const response = await authService.me();
        dispatch(setUserData({
            balance: parseFloat(response.balance),
            accounts: response.accounts || [],
            name: response.name || '',
            email: response.email || '',
            role: response.role || 'User',
            profile: response.profile || {},
        }));
    } catch (error) {
        dispatch(hasError(error.message));
    }
};

export default AuthSlice.reducer;
