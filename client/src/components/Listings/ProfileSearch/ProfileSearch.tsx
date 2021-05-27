import { useState } from 'react';
import { Box, TextField, InputAdornment } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/Search';
import DateFnsUtils from '@date-io/date-fns';

import useStyles from './useStyles';

export default function ProfileSearch(): JSX.Element {
  const today = new Date();
  const [startDate, setStartDate] = useState<Date | null>(today);
  const classes = useStyles();
  return (
    <Box maxWidth={575} display="flex" margin="auto">
      <Box flex={2}>
        <TextField
          variant="outlined"
          color="secondary"
          label="Search by city"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            classes: {
              input: classes.searchField,
            },
          }}
          fullWidth
        />
      </Box>
      <Box flex={1}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            color="secondary"
            autoOk
            variant="inline"
            inputVariant="outlined"
            format="MM/dd/yyyy"
            value={startDate}
            InputAdornmentProps={{ position: 'start' }}
            onChange={(date) => setStartDate(date)}
          />
        </MuiPickersUtilsProvider>
      </Box>
    </Box>
  );
}
