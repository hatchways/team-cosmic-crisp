import { Box, CssBaseline, Grid } from '@material-ui/core';

import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import About from '../../components/ProfileDetails/About/About';
import RequestForm from '../../components/ProfileDetails/RequestForm/RequestForm';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export default function ProfileDetails(): JSX.Element {
  const { profileDetails, loading } = useAuth();
  const classes = useStyles();

  if (loading) return <LoadingSpinner />;

  return (
    <Box display="flex" justifyContent="center" className={classes.mainContainer}>
      <CssBaseline />
      <Box maxWidth={1500}>
        <Grid container spacing={6} className={classes.mainGrid}>
          <Grid item xs={12} sm={12} md={8}>
            <About profile={profileDetails} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RequestForm profile={profileDetails} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
