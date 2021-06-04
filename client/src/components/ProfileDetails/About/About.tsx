import { useState } from 'react';
import { Avatar, Button, Box, Fade, Grid, GridList, GridListTile, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { Profile } from '../../../interface/Profile';
import { useAuth } from '../../../context/useAuthContext';
import useStyles from './useStyles';
import SitterReview from '../Review/Review';
import CreateReview from '../CreateReview/CreateReview';

export interface Props {
  sitter: Profile;
}

export default function About({ sitter }: Props): JSX.Element {
  const [toggle, setToggle] = useState<boolean>(false);
  const { loggedInUser } = useAuth();
  const classes = useStyles();

  return (
    <Fade in={true}>
      <Paper elevation={6} className={classes.detailsContainer}>
        <Box className={classes.imageContainer}>
          <img src={sitter.coverPhoto} alt="Profile" className={classes.coverImage} />
          <Avatar alt="User" src={sitter.profilePhoto} className={classes.avatar} />
        </Box>
        <Box textAlign="center" className={classes.aboutContainer}>
          <Typography variant="h4" className={classes.name}>
            {`${sitter.firstName} ${sitter.lastName}`}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Loving Pet Sitter
          </Typography>
          <Typography variant="body1" color="textSecondary" className={classes.location}>
            <LocationOnIcon color="primary" />
            {sitter.city}
          </Typography>
          <Grid container justify="center" alignItems="center">
            <Typography className={classes.dayAvailable}>Availability:</Typography>
            {sitter.availability.length === 0 && <Typography className={classes.dayAvailable}>N/A</Typography>}
            {sitter.availability.map((day) => (
              <Typography key={day} className={classes.dayAvailable}>
                {day}
              </Typography>
            ))}
          </Grid>
          <Box textAlign="left">
            <Typography variant="h5" className={classes.aboutTitle}>
              About Me
            </Typography>
            <Typography variant="body1" className={classes.aboutDescription}>
              {sitter.description}
            </Typography>
          </Box>
          <GridList cellHeight={115} cols={5}>
            {sitter.gallery.map((photo, index) => (
              <GridListTile cols={1} className={classes.galleryTile} key={index}>
                <img src={photo} alt="Profile" />
              </GridListTile>
            ))}
          </GridList>
        </Box>
        <Box className={classes.reviewsContainer}>
          <Button
            variant="text"
            className={classes.reviewBtn}
            onClick={() => setToggle((prevToggle) => !prevToggle)}
            endIcon={toggle ? <RemoveIcon /> : <AddIcon />}
          >
            Ratings and Reviews ({sitter.reviews.length})
          </Button>

          {toggle && (
            <Fade in={true}>
              <Box>
                {sitter.reviews.map((review) => (
                  <SitterReview review={review} key={review._id} />
                ))}
              </Box>
            </Fade>
          )}

          {loggedInUser ? (
            <CreateReview sitterId={sitter._id} />
          ) : (
            <Typography variant="body1">
              Please &nbsp;
              <Link to="/login">Sign In</Link>
              &nbsp; to create a Review
            </Typography>
          )}
        </Box>
      </Paper>
    </Fade>
  );
}
