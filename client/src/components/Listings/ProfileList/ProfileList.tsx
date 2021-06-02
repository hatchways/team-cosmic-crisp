import { Grid, Grow } from '@material-ui/core';

import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';
import ProfileCard from '../ProfileCard/ProfileCard';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

export default function ProfileList(): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();
  const { sitterProfiles, loading, errorMsg } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (errorMsg) updateSnackBarMessage(errorMsg);

  return (
    <Grow in={true}>
      <Grid container spacing={8}>
        {sitterProfiles.map((sitterProfile) => (
          <Grid item xs={12} sm={4} key={sitterProfile._id}>
            <ProfileCard sitter={sitterProfile} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
}
