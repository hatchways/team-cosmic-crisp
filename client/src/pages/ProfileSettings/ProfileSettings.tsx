import { Box, CssBaseline, Grid, Paper, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import useStyles from './useStyles';
import SideBar from '../../components/Account/Sidebar/Sidebar';
import EditProfileForm from '../../components/Account/EditProfileForm/EditProfileForm';
import ProfilePhoto from '../../components/Account/ProfilePhoto/ProfilePhoto';
import Gallery from '../../components/Gallery/Gallery';
import { useAuth } from '../../context/useAuthContext';

export default function ProfileSettings(): JSX.Element {
  const classes = useStyles();
  const { path } = useParams<{ path?: string }>();
  const { loggedInUserDetails } = useAuth();

  const renderSwitch = (pathname: string): JSX.Element | null => {
    switch (pathname) {
      case 'edit-profile':
        return <EditProfileForm />;
      case 'profile-photo':
        return <ProfilePhoto />;
      case 'gallery':
        return loggedInUserDetails ? (
          <Grid>
            <Typography variant="h4" align="center" className={classes.label}>
              Image Gallery
            </Typography>
            <Gallery gallery={loggedInUserDetails?.gallery} profile={loggedInUserDetails} user={true} />
          </Grid>
        ) : null;

      default:
        return null;
    }
  };
  return (
    <Box className={classes.mainContainer}>
      <CssBaseline />
      <Box display="flex" maxWidth={935} className={classes.secondaryContainer}>
        <SideBar />
        <Box flex={1}>
          <Paper elevation={5} className={classes.paper}>
            {path && renderSwitch(path)}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
