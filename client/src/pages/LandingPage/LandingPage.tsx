import { useState } from 'react';
import { Box, CssBaseline, TextField, Button, Typography } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import useStyles from './useStyles';
import cover from '../../Images/Landing Cover Image.jpg';

export default function LandingPage(): JSX.Element {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const classes = useStyles();
  return (
    <Box display="flex" className={classes.mainContainer}>
      <CssBaseline />
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        <Box maxWidth={650} maxHeight={500} className={classes.searchFormContainer}>
          <Typography variant="h2" className={classes.title}>
            Find the care your dog deserves
          </Typography>
          <form>
            <Typography className={classes.label}>Where</Typography>
            <TextField variant="outlined" placeholder="Anywhere" className={classes.input} />
            <Typography className={classes.label}>Drop In / Drop Off</Typography>
            <Box display="flex">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  autoOk
                  color="secondary"
                  variant="inline"
                  inputVariant="outlined"
                  placeholder="mm/dd/yyyy"
                  format="MM/dd/yyyy"
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  autoOk
                  color="secondary"
                  variant="inline"
                  inputVariant="outlined"
                  placeholder="mm/dd/yyyy"
                  format="MM/dd/yyyy"
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </MuiPickersUtilsProvider>
            </Box>
            <Button variant="contained" color="primary" size="large" className={classes.button}>
              Find My Dog Sitter
            </Button>
          </form>
        </Box>
      </Box>
      <Box flex={1}>
        <img src={cover} alt="Landing Page" className={classes.image} />
      </Box>
    </Box>
  );
}
