import React from 'react';
import { Stack, Typography } from '@mui/material';

import ChildCard from 'src/components/shared/ChildCard';
import { IconBriefcase, IconDeviceDesktop, IconMail, IconMapPin } from '@tabler/icons';
import { useUserData } from '../../../../hook/useUserData';

const IntroCard = () => {
  const { userData } = useUserData(); // Use the shared context

  return (
    <ChildCard>
      <Typography fontWeight={600} variant="h4" mb={2}>
        Introduction
      </Typography>
      <Typography color="textSecondary" variant="subtitle2" mb={2}>
        {userData.profile?.bio || `Hello, I am ${userData.name}. No bio has been set yet.`}
      </Typography>
      <Stack direction="row" gap={2} alignItems="center" mb={3}>
        <IconBriefcase size="21" />
        <Typography variant="h6">{userData.profile?.company || 'Not specified'}</Typography>
      </Stack>
      <Stack direction="row" gap={2} alignItems="center" mb={3}>
        <IconMail size="21" />
        <Typography variant="h6">{userData.email}</Typography>
      </Stack>
      <Stack direction="row" gap={2} alignItems="center" mb={3}>
        <IconDeviceDesktop size="21" />
        <Typography variant="h6">{userData.profile?.website || 'Not specified'}</Typography>
      </Stack>
      <Stack direction="row" gap={2} alignItems="center" mb={1}>
        <IconMapPin size="21" />
        <Typography variant="h6">{userData.profile?.location || 'Not specified'}</Typography>
      </Stack>
    </ChildCard>
  );
}

export default IntroCard;
