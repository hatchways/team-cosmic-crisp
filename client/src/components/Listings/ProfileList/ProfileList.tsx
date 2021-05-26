import { Grid, Grow } from '@material-ui/core';

import { useAuth } from '../../../context/useAuthContext';
import ProfileCard from '../ProfileCard/ProfileCard';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

export default function ProfileList(): JSX.Element {
  const { userProfiles, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <Grow in={true}>
      <Grid container spacing={8}>
        {userProfiles.map((userProfile, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <ProfileCard user={userProfile} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
}
