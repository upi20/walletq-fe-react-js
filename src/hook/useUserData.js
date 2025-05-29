import { createContext, useContext } from 'react';

export const UserDataContext = createContext({
    userData: {
        balance: 0,
        accounts: [],
        name: '',
        email: '',
        role: 'User',
        profile: {}
    },
    setUserData: () => { }
});

export const useUserData = () => {
    const context = useContext(UserDataContext);
    if (context === undefined) {
        throw new Error('useUserData must be used within a UserDataProvider');
    }
    return context;
};
