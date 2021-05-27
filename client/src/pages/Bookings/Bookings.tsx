import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import Booking from './Booking/Booking';
import { Paper, Typography } from '@material-ui/core';
import { Request } from '../../interface/Bookings';
import BookingCalendar from './Calendar/Calendar';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export default function Bookings(): JSX.Element {
  const classes = useStyles();
  const bookings = [
    {
      accepted: true,
      declined: false,
      paid: true,
      _id: '60a7f6713407a107aeda5b46',
      start: new Date('2021-05-21T00:00:00.000Z'),
      end: new Date('2021-07-30T00:00:00.000Z'),
      __v: 0,
      sitter: {
        _id: '60a5f2ba4669b503748ef058',
        username: 'guest_user',
        email: 'guest@example.com',
        register_date: '2021-05-20T05:25:14.416Z',
        __v: 0,
        registerDate: '2021-05-27T17:24:36.678Z',
      },
    },
    {
      accepted: false,
      declined: true,
      paid: true,
      _id: '60a7f6713407a107aeda5b461',
      start: new Date('2021-05-31T00:00:00.000Z'),
      end: new Date('2021-07-30T00:00:00.000Z'),
      __v: 0,
      sitter: {
        _id: '60a5f2ba4669b503748ef058',
        username: 'guest_user',
        email: 'guest@example.com',
        register_date: '2021-05-20T05:25:14.416Z',
        __v: 0,
        registerDate: '2021-05-27T17:24:36.678Z',
      },
    },
    {
      accepted: true,
      declined: false,
      paid: true,
      _id: '60a7f6713407a107aeda5b462',
      start: new Date('2021-06-19T00:00:00.000Z'),
      end: new Date('2021-07-30T00:00:00.000Z'),
      __v: 0,
      sitter: {
        _id: '60a5f2ba4669b503748ef058',
        username: 'guest_user',
        email: 'guest@example.com',
        register_date: '2021-05-20T05:25:14.416Z',
        __v: 0,
        registerDate: '2021-05-27T17:24:36.678Z',
      },
    },
    {
      accepted: false,
      declined: false,
      paid: true,
      _id: '60a7f6713407a107aeda5b463',
      start: new Date('2021-05-28T00:00:00.000Z'),
      end: new Date('2021-07-30T00:00:00.000Z'),
      __v: 0,
      sitter: {
        _id: '60a5f2ba4669b503748ef058',
        username: 'guest_user',
        email: 'guest@example.com',
        register_date: '2021-05-20T05:25:14.416Z',
        __v: 0,
        registerDate: '2021-05-27T17:24:36.678Z',
      },
    },
  ];
  const [nextBooking, setNextBooking] = useState<Request | undefined>();
  const [currentBookings, setCurrentBookings] = useState<Array<Request>>([]);
  const [pastBookings, setPastBookings] = useState<Array<Request>>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDateBookings, setSelectedDateBookings] = useState<Array<Request>>([]);
  const today = new Date();

  useEffect(() => {
    const past: Array<Request> = [];
    const current: Array<Request> = [];
    for (const booking of bookings) {
      if (compareDates(booking.start, today) === -1) {
        past.push(booking);
      } else if (compareDates(booking.start, today) >= 0) {
        current.push(booking);
      }
    }
    setNextBooking(current.shift());
    setPastBookings([...past]);
    setCurrentBookings([...current]);
  }, []);

  useEffect(() => {
    if (compareDates(selectedDate, today) !== 0) {
      const dateBookings: Array<Request> = [];
      bookings.forEach((booking) => {
        if (compareDates(selectedDate, booking.start) === 0) dateBookings.push(booking);
      });
      setSelectedDateBookings(dateBookings);
    }
  }, [selectedDate]);

  const compareDates = (time1: Date, time2: Date) => {
    const date1: number = time1.setHours(0, 0, 0, 0);
    const date2: number = time2.setHours(0, 0, 0, 0);
    if (date1 === date2) return 0;
    else if (date1 < date2) return -1;
    else return 1;
  };

  return (
    <>
      <CssBaseline />
      <Grid container component="main" justify="space-around" className={`${classes.root}`}>
        <Grid item md={4} sm={5} xs={8} className={classes.bookings}>
          <Paper elevation={6} className={classes.paper}>
            {compareDates(selectedDate, today) === 0 ? (
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
          <Paper elevation={6} className={`${classes.paper}`}>
            <Grid>
              <Typography component="span" variant="subtitle2">
                CURRENT BOOKINGS:
              </Typography>
              {compareDates(selectedDate, today) !== 0 && <Booking bookingDetails={nextBooking} />}
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
        </Grid>
        <Grid item md={4} sm={5} xs={8}>
          <BookingCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </Grid>
      </Grid>
    </>
  );
}
