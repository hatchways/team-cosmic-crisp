import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import Booking from './Booking/Booking';
import { CircularProgress, Paper, Typography } from '@material-ui/core';
import { Request } from '../../interface/Bookings';
import BookingCalendar from './Calendar/Calendar';
import { getRequests } from '../../helpers/APICalls/bookings';
import moment from 'moment';

export default function Bookings(): JSX.Element {
  const classes = useStyles();
  const [bookings, setBookings] = useState<Array<Request>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextBooking, setNextBooking] = useState<Request | undefined>();
  const [currentBookings, setCurrentBookings] = useState<Array<Request>>([]);
  const [pastBookings, setPastBookings] = useState<Array<Request>>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDateBookings, setSelectedDateBookings] = useState<Array<Request>>([]);
  const today = new Date();

  useEffect(() => {
    setLoading(true);
    getRequests().then((data) => {
      if (data.requests) setBookings(data.requests);
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    const past: Array<Request> = [];
    const current: Array<Request> = [];
    for (const booking of bookings) {
      if (moment(booking.start).isBefore(today, 'day')) {
        past.push(booking);
      } else if (moment(booking.start).isSameOrAfter(today, 'day')) {
        current.push(booking);
      }
    }
    setNextBooking(current.shift());
    setPastBookings([...past]);
    setCurrentBookings([...current]);
  }, [bookings]);

  useEffect(() => {
    if (!moment(selectedDate).isSame(today, 'day')) {
      const dateBookings: Array<Request> = [];
      console.log(selectedDate);
      bookings.forEach((booking) => {
        if (moment(booking.start).isSame(selectedDate, 'day')) {
          dateBookings.push(booking);
        }
      });
      setSelectedDateBookings(dateBookings);
    }
  }, [selectedDate]);

  return (
    <>
      <CssBaseline />
      <Grid container component="main" justify="space-around" className={`${classes.root}`}>
        <Grid item md={4} sm={5} xs={8} className={classes.bookings}>
          {bookings.length === 0 ? (
            <Paper elevation={6} className={classes.paper}>
              {loading ? (
                <CircularProgress />
              ) : (
                <Typography component="span" variant="h6">
                  No Bookings Found
                </Typography>
              )}
            </Paper>
          ) : (
            <>
              <Paper elevation={6} className={classes.paper}>
                {moment(selectedDate).isSame(today, 'day') ? (
                  <>
                    <Typography component="span" variant="subtitle2">
                      YOUR NEXT BOOKING:
                    </Typography>
                    <Booking bookingDetails={nextBooking} />
                  </>
                ) : (
                  <>
                    <Typography component="span" variant="subtitle2">
                      BOOKINGS ON SELECTED DATE:
                    </Typography>
                    {selectedDateBookings.length === 0 && (
                      <Typography component="p" variant="h6">
                        No Bookings on selected Date
                      </Typography>
                    )}
                    {selectedDateBookings.map((booking) => (
                      <Booking key={booking._id} bookingDetails={booking} />
                    ))}
                  </>
                )}
              </Paper>
              <Paper elevation={6} className={`${classes.paper} ${classes.currentBookings}`}>
                <Grid>
                  <Typography component="span" variant="subtitle2">
                    CURRENT BOOKINGS:
                  </Typography>
                  {!moment(selectedDate).isSame(today, 'day') && <Booking bookingDetails={nextBooking} />}
                  {currentBookings.map((booking) => (
                    <Booking key={booking._id} bookingDetails={booking} />
                  ))}
                </Grid>
                <Grid className={classes.pastBookings}>
                  <Typography component="span" variant="subtitle2">
                    PAST BOOKINGS:
                  </Typography>
                  {pastBookings.map((booking) => (
                    <Booking key={booking._id} bookingDetails={booking} />
                  ))}
                </Grid>
              </Paper>
            </>
          )}
        </Grid>
        <Grid item md={4} sm={5} xs={8}>
          <BookingCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </Grid>
      </Grid>
    </>
  );
}
