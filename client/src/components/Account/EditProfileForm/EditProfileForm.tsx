import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';

import useStyles from './useStyles';
import CustomTextField from '../CustomTextField';

export default function EditProfileForm(): JSX.Element {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h4" align="center" className={classes.formTitle}>
        Edit Profile
      </Typography>
      <form>
        <Grid container spacing={3}>
          <CustomTextField label="FIRST NAME" placeholder="First Name" />
          <CustomTextField label="LAST NAME" placeholder="Last Name" />
          <CustomTextField label="EMAIL ADDRESS" placeholder="user@gmail.com" />
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" align="right" className={classes.formLabel}>
                  PHONE NUMBER
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography align="left" variant="body1" className={classes.phoneNumber}>
                  No Phone number entered
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button color="primary" variant="outlined" size="large">
                  Add a phone number
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <CustomTextField label="WHERE YOU LIVE" placeholder="Address" />
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" align="right" className={classes.formLabel}>
                  DESCRIBE YOURSELF
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField color="secondary" multiline={true} rows={5} label="About you" variant="outlined" fullWidth />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box textAlign="center">
          <Button color="primary" variant="contained" size="large" className={classes.button}>
            SAVE
          </Button>
        </Box>
      </form>
    </Box>
  );
}
