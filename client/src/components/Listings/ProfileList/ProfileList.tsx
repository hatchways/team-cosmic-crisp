import { useState } from 'react';
import { Box, Grid, Grow, Typography } from '@material-ui/core';

import useStyles from './useStyles';
import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';
import ProfileCard from '../ProfileCard/ProfileCard';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import Pagination from '@material-ui/lab/Pagination';

export default function ProfileList(): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();
  const { sitterProfiles, loading, errorMsg } = useAuth();
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 9;
  const noOfPages = Math.ceil(sitterProfiles.length / itemsPerPage);
  const classes = useStyles();

  if (loading) return <LoadingSpinner />;

  if (errorMsg) updateSnackBarMessage(errorMsg);

  return (
    <Box>
      <Grow in={true}>
        <Grid container spacing={8} justify="space-around" className={classes.profilesGrid}>
          {sitterProfiles.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((sitterProfile) => (
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
      <Box display="flex" justifyContent="center" className={classes.paginationContainer}>
        <Pagination
          count={noOfPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          defaultPage={1}
          siblingCount={0}
          shape="rounded"
          size="large"
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
}
