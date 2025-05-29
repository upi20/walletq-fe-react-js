import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Stack,
  CardMedia,
  styled,
  Fab,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import profilecover from 'src/assets/images/backgrounds/profilebg.jpg';
import {
  IconBrandDribbble,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandYoutube,
  IconFileDescription,
  IconUserCheck,
  IconUserCircle,
} from '@tabler/icons';
import ProfileTab from './ProfileTab';
import BlankCard from '../../../shared/BlankCard';
import { useUserData } from '../../../../hook/useUserData';
import { formatRupiah } from '../../../../utils/formatRupiah';

const ProfileBanner = () => {
  const { userData } = useUserData(); // Use the shared context

  const ProfileImage = styled(Box)(() => ({
    backgroundImage: 'linear-gradient(#50b2fc,#f44c66)',
    borderRadius: '50%',
    width: '110px',
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  }));

  return (
    <>
      <BlankCard>
        <CardMedia component="img" image={profilecover} alt={profilecover} height="330" />
        <Grid container spacing={0}>
          <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
            <Box
              display="flex"
              alignItems="center"
              textAlign="center"
              justifyContent="center"
              sx={{
                mt: '-85px',
              }}
            >
              <ProfileImage>
                <Avatar
                  src={userData.profile?.avatar || ''}
                  alt={userData.name}
                  sx={{
                    borderRadius: '50%',
                    width: '100px',
                    height: '100px',
                    border: '4px solid #fff',
                  }}
                />
              </ProfileImage>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, lg: 8 }} sx={{ mt: 3 }}>
            <Stack direction="row" justifyContent="end" spacing={2} alignItems="center">
              <Box>
                <Typography color="text.secondary">
                  <IconFileDescription width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  {userData.profile?.posts || 0}
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Posts
                </Typography>
              </Box>
              <Box>
                <Typography color="text.secondary">
                  <IconUserCircle width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  {userData.profile?.followers || 0}
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Followers
                </Typography>
              </Box>
              <Box>
                <Typography color="text.secondary">
                  <IconUserCheck width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  {userData.profile?.following || 0}
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Following
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
            <Box textAlign="center">
              <Typography variant="h5" fontWeight={600}>
                {userData.name}
              </Typography>              <Typography variant="h6" fontWeight={600} color="primary">
                Rp {formatRupiah(userData.balance, false)}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ lg: 4, xs: 12 }} sx={{ order: { xs: '3', sm: '3', lg: '3' } }}>
            <Stack direction={'row'} gap={2} alignItems="center" justifyContent="center" my={2}>
              <Fab size="small" color="primary" sx={{ backgroundColor: '#1877F2' }}>
                <IconBrandFacebook size="16" />
              </Fab>
              <Fab size="small" color="primary" sx={{ backgroundColor: '#1DA1F2' }}>
                <IconBrandTwitter size="18" />
              </Fab>
              <Fab size="small" color="error" sx={{ backgroundColor: '#EA4C89' }}>
                <IconBrandDribbble size="18" />
              </Fab>
              <Fab size="small" color="error" sx={{ backgroundColor: '#CD201F' }}>
                <IconBrandYoutube size="18" />
              </Fab>
            </Stack>
          </Grid>
        </Grid>
        <ProfileTab />
      </BlankCard>
    </>
  );
};

export default ProfileBanner;
