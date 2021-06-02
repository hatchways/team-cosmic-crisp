import { Avatar, Box, Fade, Grid, GridList, GridListTile, Paper, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { Profile } from '../../../interface/Profile';
import useStyles from './useStyles';

export interface Props {
  sitter: Profile | null | undefined;
}

export default function About({ sitter }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <>
      {sitter && (
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
          </Paper>
        </Fade>
      )}
    </>
  );
}
