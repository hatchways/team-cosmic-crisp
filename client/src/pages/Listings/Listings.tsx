import { Box, CssBaseline, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import useStyles from './useStyles';
import ProfileSearch from '../../components/Listings/ProfileSearch/ProfileSearch';
import ProfileList from '../../components/Listings/ProfileList/ProfileList';
import { useAuth } from '../../context/useAuthContext';
import searchSitterProfilesAPI from '../../helpers/APICalls/searchProfiles';
import { SitterProfilesApiData } from '../../interface/AuthApiData';

export default function Listings(): JSX.Element {
  const classes = useStyles();
  const { updateSitterProfilesContext, setLoading } = useAuth();
  const [filters, setFilters] = useState<{ city?: string; date?: Date }>({});

  const fetchSitterProfiles = async ({ city, date }: { city?: string; date?: Date }) => {
    setLoading(true);
    await searchSitterProfilesAPI({ city, date }).then((data: SitterProfilesApiData) => {
      if (data.success) {
        updateSitterProfilesContext(data.success);
      } else if (data.error) {
        // setErrorMsg(data.error.message);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (filters?.city || filters?.date) fetchSitterProfiles(filters);
  }, [filters]);
  const reset = () => {
    setFilters({});
    fetchSitterProfiles({});
  };
  return (
    <Box display="flex" justifyContent="center" className={classes.mainContainer}>
      <CssBaseline />
      <Box flex={1} maxWidth={1500}>
        <Typography variant="h3" align="center" className={classes.title}>
          Your search results
        </Typography>
        <ProfileSearch city={filters?.city} date={filters?.date} setFilters={setFilters} reset={reset} />
        <Box className={classes.profilesContainer}>
          <ProfileList />
        </Box>
      </Box>
    </Box>
  );
}
