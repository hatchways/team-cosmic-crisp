import { Grid, Grow, Typography } from '@material-ui/core';

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
      <Grid container spacing={8} justify="space-around">
        {sitterProfiles.map((sitterProfile) => (
          <Grid item xs={12} sm={4} key={sitterProfile._id}>
            <ProfileCard sitter={sitterProfile} />
          </Grid>
        ))}
        {sitterProfiles.length === 0 && (
          <Grid item>
            <Typography component="div" variant="h3">
              No Sitters Found
            </Typography>
            <Typography component="div" variant="body1">
              Please change filters to view more
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grow>
  );
}
