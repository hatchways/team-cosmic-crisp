import { Avatar, Box, GridList, GridListTile, Paper, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import useStyles from './useStyles';

interface Profile {
  profile: {
    id: number;
    firstName: string;
    lastName: string;
    coverPhoto: string;
    profilePhoto: string;
    gallery: Array<string>;
    city: string;
    description: string;
    price: number;
    rating: number;
  };
}

export default function About({ profile }: Profile): JSX.Element {
  const classes = useStyles();
  return (
    <Paper elevation={6} className={classes.detailsContainer}>
      <Box className={classes.imageContainer}>
        <img src={profile.coverPhoto} alt="Profile" className={classes.coverImage} />
        <Avatar alt="User" src={profile.profilePhoto} className={classes.avatar} />
      </Box>
      <Box textAlign="center" className={classes.aboutContainer}>
        <Typography variant="h4" className={classes.name}>
          {`${profile.firstName} ${profile.lastName}`}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Loving Pet Sitter
        </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.location}>
          <LocationOnIcon color="primary" />
          {profile.city}
        </Typography>
        <Box textAlign="left">
          <Typography variant="h5" className={classes.aboutTitle}>
            About Me
          </Typography>
          <Typography variant="body1" className={classes.aboutDescription}>
            {profile.description}
          </Typography>
        </Box>
        <GridList cellHeight={115} cols={5}>
          {profile.gallery.map((photo, index) => (
            <GridListTile cols={1} className={classes.galleryTile} key={index}>
              <img src={photo} alt="Profile" />
            </GridListTile>
          ))}
        </GridList>
      </Box>
    </Paper>
  );
}
