import React, { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import AccountsList from '../../../components/apps/accounts/AccountsList';
import AccountForm from '../../../components/apps/accounts/AccountForm';

const BCrumb = [
    {
        to: '/',
        title: 'Home',
    },
    {
        title: 'Accounts',
    },
];

const AccountsPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleCreateClick = () => {
        setSelectedAccount(null);
        setIsFormOpen(true);
    };

    const handleEditAccount = (account) => {
        setSelectedAccount(account);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedAccount(null);
    };

    const handleSuccess = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <PageContainer title="Accounts" description="Manage your accounts">
            <Box>
                <Breadcrumb title="Accounts Management" items={BCrumb} />
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button variant="contained" onClick={handleCreateClick}>
                            Create New Account
                        </Button>
                    </Box>          <AccountsList
                        onEdit={handleEditAccount}
                        onRefresh={refreshKey}
                    />

                    <AccountForm
                        open={isFormOpen}
                        onClose={handleCloseForm}
                        account={selectedAccount}
                        onSuccess={handleSuccess}
                    />
                </Container>
            </Box>
        </PageContainer>
    );
};

export default AccountsPage;
