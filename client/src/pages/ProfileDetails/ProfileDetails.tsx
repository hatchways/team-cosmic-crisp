import { Box, CssBaseline } from '@material-ui/core';
import { useParams } from 'react-router';

import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import About from '../../components/ProfileDetails/About/About';
import RequestForm from '../../components/ProfileDetails/RequestForm/RequestForm';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export default function ProfileDetails(): JSX.Element {
  const { id } = useParams<{ id?: string }>();
  const { sitterProfiles, loading } = useAuth();
  const sitterProfile = sitterProfiles.filter((sitter) => sitter._id === id)[0];
  const classes = useStyles();

  if (loading) return <LoadingSpinner />;

  return (
    <Box display="flex" justifyContent="center" className={classes.mainContainer}>
      <CssBaseline />
      <Box display="flex" maxWidth={1625} className={classes.secondaryContainer}>
        <Box id="product_tour_about_me" flex={2}>
          {sitterProfile && <About sitter={sitterProfile} />}
        </Box>
        <Box flex={1} className={classes.formContainer}>
          {sitterProfile && <RequestForm sitter={sitterProfile} />}
        </Box>
      </Box>
    </Box>
  );
}
