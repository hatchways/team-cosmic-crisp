import { useState, useEffect } from 'react';
import { Box, Button, Grid, Grow, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import useStyles from './useStyles';
import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { Profile } from '../../../interface/Profile';
import ProfileCard from '../ProfileCard/ProfileCard';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

export default function ProfileList(): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();
  const { sortByPrice, loading, errorMsg } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [sortAscPrice, setSortAscPrice] = useState<boolean>(true);
  const [sortedProfiles, setSortedProfiles] = useState<Profile[]>([]);
  const itemsPerPage = 9;
  const noOfPages = Math.ceil(sortedProfiles.length / itemsPerPage);
  const classes = useStyles();

  useEffect(() => {
    const profiles = sortByPrice(sortAscPrice);
    setSortedProfiles(profiles);
  }, [sortAscPrice, sortByPrice]);

  if (loading) return <LoadingSpinner />;

  if (errorMsg) updateSnackBarMessage(errorMsg);

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" className={classes.sortContainer}>
        <Button
          variant="text"
          size="large"
          className={classes.sortBtn}
          onClick={() => setSortAscPrice((prevState) => !prevState)}
        >
          Price &nbsp; {sortAscPrice ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </Button>
      </Box>
      <Grow in={true}>
        <Grid
          id="product_tour_sitters"
          container
          spacing={4}
          justify="center"
          alignItems="center"
          className={classes.profilesGrid}
        >
          {sortedProfiles.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((sitterProfile) => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={sitterProfile._id}>
              <ProfileCard sitter={sitterProfile} />
            </Grid>
          ))}
          {sortedProfiles.length === 0 && (
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
