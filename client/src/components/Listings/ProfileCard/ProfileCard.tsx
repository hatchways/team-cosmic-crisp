import { Avatar, Box, Card, CardActionArea, Divider, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';

import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';
import searchProfileDetails from '../../../helpers/APICalls/searchProfileDetails';
import useStyles from './useStyles';
import { Profile } from '../../../interface/Profile';

interface Props {
  profile: Profile;
}

export default function ProfileCard({ profile }: Props): JSX.Element {
  const { updateProfileDetailsContext, setLoading } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyles();

  const getProfileDetails = (id: string) => {
    setLoading(true);
    searchProfileDetails(id).then((data) => {
      if (data.success) {
        updateProfileDetailsContext(data.success);
      } else if (data.error) {
        setLoading(false);
        updateSnackBarMessage(data.error.message);
      }
    });
  };
  return (
    <Link to={`/profile/${profile._id}`} onClick={() => getProfileDetails(profile._id)} className={classes.link}>
      <Card raised={true} className={classes.profileCard}>
        <CardActionArea>
          <Box className={classes.cardHeader}>
            <Avatar src={profile.profilePhoto} className={classes.avatar} />
            <Typography
              variant="h5"
              className={classes.boldFont}
            >{`${profile.firstName} ${profile.lastName}`}</Typography>
            <Typography variant="subtitle1" color="secondary" className={classes.boldFont}>
              Professional Dog Sitter
            </Typography>
          </Box>
          <Rating value={4.5} precision={0.5} readOnly />
          <Box className={classes.description}>
            <Typography variant="body1" className={classes.boldFont}>
              {profile.description?.substr(0, 60)}...
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.cardFooter}>
            <Typography variant="body1" color="secondary" className={classes.location}>
              <LocationOnIcon color="primary" />
              {profile.city}
            </Typography>
            <Typography variant="body1" className={`${classes.boldFont} ${classes.price}`}>
              ${profile.price}/hr
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Link>
  );
}
