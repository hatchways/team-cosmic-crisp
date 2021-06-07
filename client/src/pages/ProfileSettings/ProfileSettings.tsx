import { Box, CssBaseline, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import useStyles from './useStyles';
import SideBar from '../../components/Account/Sidebar/Sidebar';
import EditProfileForm from '../../components/Account/EditProfileForm/EditProfileForm';
import ProfilePhoto from '../../components/Account/ProfilePhoto/ProfilePhoto';

export default function ProfileSettings(): JSX.Element {
  const classes = useStyles();
  const { path } = useParams<{ path?: string }>();

  const renderSwitch = (pathname: string): JSX.Element | null => {
    switch (pathname) {
      case 'edit-profile':
        return <EditProfileForm />;
      case 'profile-photo':
        return <ProfilePhoto />;

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
