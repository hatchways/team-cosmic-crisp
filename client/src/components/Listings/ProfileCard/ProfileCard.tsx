import { Avatar, Box, Card, CardActionArea, Divider, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';

import { Profile } from '../../../interface/Profile';
import useStyles from './useStyles';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

interface Props {
  sitter: Profile;
}

export default function ProfileCard({ sitter }: Props): JSX.Element {
  const classes = useStyles();

  if (!sitter) return <LoadingSpinner />;

  return (
    <Link to={`/profile/${sitter._id}`} className={classes.link}>
      <Card raised={true} className={classes.profileCard}>
        <CardActionArea>
          <Box className={classes.cardHeader}>
            <Avatar src={sitter.profilePhoto} className={classes.avatar} />
            <Typography
              variant="h5"
              className={classes.boldFont}
            >{`${sitter.firstName} ${sitter.lastName}`}</Typography>
            <Typography variant="subtitle1" color="secondary" className={classes.boldFont}>
              Professional Dog Sitter
            </Typography>
          </Box>
          <Rating value={4.5} precision={0.5} readOnly />
          <Box className={classes.description}>
            <Typography variant="body1" className={classes.boldFont}>
              {sitter.description?.substr(0, 60)}...
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.cardFooter}>
            <Typography variant="body1" color="secondary" className={classes.location}>
              <LocationOnIcon color="primary" />
              {sitter.city}
            </Typography>
            <Typography variant="body1" className={`${classes.boldFont} ${classes.price}`}>
              ${sitter.price}/hr
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Link>
  );
}
