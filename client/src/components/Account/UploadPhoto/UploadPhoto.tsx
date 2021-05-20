import { Box, Typography, Avatar, Grid, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from './useStyles';
import profile_url from '../../../Images/b1f0e680702e811aa8ba333cb19c0e0ea95e8e31.png';
//this image here is just for mockup, will be updated in
//the future when amazon s3 links are avialible

export default function UploadPhoto(): JSX.Element {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h4" align="center" className={classes.formTitle}>
        Profile Photo
      </Typography>
      <Grid container direction="column" alignItems="center" spacing={4}>
        <Grid item>
          <Avatar alt="Profile picture" src={profile_url} className={classes.large} />
        </Grid>
        <Grid item>
          <Typography align="center" color="secondary" className={classes.uploadMessage}>
            Be sure to use a photo that clearly shows your face
          </Typography>
        </Grid>
        <Grid item>
          <Button color="primary" variant="outlined" size="large">
            <Box px={2} py={1}>
              Upload a file from your device
            </Box>
          </Button>
        </Grid>
        <Grid item>
          <Button color="secondary" startIcon={<DeleteIcon style={{ color: 'black' }} />}>
            Delete Photo
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
