import { useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import { KeyboardDatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Rating from '@material-ui/lab/Rating';
import DateFnsUtils from '@date-io/date-fns';

import useStyles from './useStyles';

interface Props {
  price: number;
  rating: number;
}

export default function RequestForm({ price, rating }: Props): JSX.Element {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [startDate, setStartDate] = useState<Date | null>(today);
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(tomorrow);
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  const classes = useStyles();
  return (
    <Paper elevation={6} className={classes.requestContainer}>
      <Box textAlign="center">
        <Typography align="center" variant="body1" className={classes.price}>
          ${price}/hr
        </Typography>
        <Rating value={rating} precision={0.01} readOnly />
      </Box>
      <Box className={classes.dateContainer}>
        <Typography variant="body1" className={classes.title}>
          DROP-IN
        </Typography>
        <Grid container>
          <Grid item xs={8}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                format="MM/dd/yyyy"
                value={startDate}
                InputAdornmentProps={{ position: 'start' }}
                onChange={(date) => setStartDate(date)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                variant="inline"
                inputVariant="outlined"
                value={startTime}
                onChange={(time) => setStartTime(time)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
        <Typography variant="body1" className={classes.title}>
          DROP-OFF
        </Typography>
        <Grid container>
          <Grid item xs={8}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                format="MM/dd/yyyy"
                value={endDate}
                InputAdornmentProps={{ position: 'start' }}
                onChange={(date) => setEndDate(date)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                variant="inline"
                inputVariant="outlined"
                value={endTime}
                onChange={(time) => setEndTime(time)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
        <Box textAlign="center">
          <Button variant="contained" color="primary" className={classes.submitBtn}>
            Send Request
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
