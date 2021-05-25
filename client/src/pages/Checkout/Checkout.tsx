import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import { Paper, Typography, List, ListItem, ListItemText, Divider, Button, Avatar, Box } from '@material-ui/core';
import OrderDetails from './OrderDetails/OrderDetails';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export default function Checkout(): JSX.Element {
  const classes = useStyles();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  //sample sitter
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
  return (
    <>
      <CssBaseline />
      <Grid
        container
        component="main"
        className={`${classes.root}`}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item md={8} sm={10} xs={12}>
          <Paper elevation={6} className={classes.paper}>
            <OrderDetails
              userProfile={userProfile}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
