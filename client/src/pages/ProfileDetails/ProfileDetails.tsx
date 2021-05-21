import { Box, CssBaseline, Grid } from '@material-ui/core';

import useStyles from './useStyles';
import About from '../../components/ProfileDetails/About/About';
import RequestForm from '../../components/ProfileDetails/RequestForm/RequestForm';

//Mock Profile
const userProfile = {
  id: 123,
  firstName: 'John',
  lastName: 'Wick',
  coverPhoto: 'https://i.pinimg.com/originals/61/0e/87/610e87b0783cd8dfa511f567cfc1b31e.jpg',
  profilePhoto: 'https://i.pinimg.com/originals/1a/a4/5e/1aa45ec60e5aaa53474d2ea6193288a3.jpg',
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Axel%2C_the_English_Bulldog.jpg/170px-Axel%2C_the_English_Bulldog.jpg',
    'https://images.pexels.com/photos/3715587/pexels-photo-3715587.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  ],
  city: 'Toronto, Ontario',
  description:
    'Animals are my passion! I will look after your pets with loving care. I have some availability for pet care in my home as well. I have 10 yrs experience at the Animal Hospital, and have owned multiple pets for many years, including numerous rescues. Kindly email, text or call me and I will respond promptly!',
  price: 18,
  rating: 4.35,
};

export default function ProfileDetails(): JSX.Element {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center" className={classes.mainContainer}>
      <CssBaseline />
      <Box maxWidth={1500}>
        <Grid container spacing={6} className={classes.mainGrid}>
          <Grid item xs={12} sm={12} md={8}>
            <About profile={userProfile} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RequestForm price={userProfile.price} rating={userProfile.rating} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
