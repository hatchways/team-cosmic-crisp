import { Box, CssBaseline, Paper } from '@material-ui/core';

import useStyles from '../useStyles';
import SideBar from '../../../components/Account/Sidebar/Sidebar';
import UploadPhoto from '../../../components/Account/UploadPhoto/UploadPhoto';

export default function ProfilePhoto(): JSX.Element {
  const classes = useStyles();
  return (
    <Box className={classes.mainContainer}>
      <CssBaseline />
      <Box display="flex" maxWidth={935} className={classes.secondaryContainer}>
        <SideBar />
        <Box flex={1}>
          <Paper elevation={5} className={classes.formContainer}>
            <UploadPhoto />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
