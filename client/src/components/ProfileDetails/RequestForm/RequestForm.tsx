import { useState } from 'react';
import { Box, Button, Fade, Grid, Paper, Typography } from '@material-ui/core';
import { KeyboardDatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Rating from '@material-ui/lab/Rating';
import DateFnsUtils from '@date-io/date-fns';

import { Profile } from '../../../interface/Profile';
import useStyles from './useStyles';

export interface Props {
  profile: Profile | null | undefined;
}

export default function RequestForm({ profile }: Props): JSX.Element {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [startDate, setStartDate] = useState<Date | null>(today);
  const [startTime, setStartTime] = useState<Date | null>(today);
  const [endDate, setEndDate] = useState<Date | null>(tomorrow);
  const [endTime, setEndTime] = useState<Date | null>(tomorrow);
  const classes = useStyles();
  return (
    <>
      {profile && (
        <Fade in={true}>
          <Paper elevation={6} className={classes.requestContainer}>
            <Box textAlign="center">
              <Typography align="center" variant="body1" className={classes.price}>
                ${profile.price}/hr
              </Typography>
              <Rating value={4.5} precision={0.5} readOnly />
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
                      color="secondary"
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
                      autoOk
                      color="secondary"
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
                      color="secondary"
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
                      autoOk
                      color="secondary"
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
        </Fade>
      )}
    </>
  );
}
