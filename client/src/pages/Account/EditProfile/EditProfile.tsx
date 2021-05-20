import { Box, CssBaseline, Paper } from '@material-ui/core';

import useStyles from '../useStyles';
import SideBar from '../../../components/Account/Sidebar/Sidebar';
import EditProfileForm from '../../../components/Account/EditProfileForm/EditProfileForm';

export default function EditProfile(): JSX.Element {
  const classes = useStyles();
  return (
    <Box className={classes.mainContainer}>
      <CssBaseline />
      <Box display="flex" maxWidth={925} className={classes.secondaryContainer}>
        <SideBar />
        <Box flex={1}>
          <Paper elevation={5} className={classes.formContainer}>
            <EditProfileForm />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
