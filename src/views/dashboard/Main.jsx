import React from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

import TopCards from '../../components/dashboards/main/TopCards';
import PageContainer from '../../components/container/PageContainer';

const Main = () => {
  return (
    <PageContainer title="Dashboard" description="Dashboard page">
      <Box>
        <Grid container spacing={3}>
          <Grid size={12}>
            <TopCards />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Main;
