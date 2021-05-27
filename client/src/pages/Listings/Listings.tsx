import { Box, CssBaseline, Typography } from '@material-ui/core';

import useStyles from './useStyles';
import ProfileSearch from '../../components/Listings/ProfileSearch/ProfileSearch';
import ProfileList from '../../components/Listings/ProfileList/ProfileList';

export default function Listings(): JSX.Element {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center" className={classes.mainContainer}>
      <CssBaseline />
      <Box flex={1} maxWidth={1500}>
        <Typography variant="h3" align="center" className={classes.title}>
          Your search results
        </Typography>
        <ProfileSearch />
        <Box className={classes.profilesContainer}>
          <ProfileList />
        </Box>
      </Box>
    </Box>
  );
}
