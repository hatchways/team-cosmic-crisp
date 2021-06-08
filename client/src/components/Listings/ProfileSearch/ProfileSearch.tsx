import { Dispatch, SetStateAction, useState } from 'react';
import { Box, TextField, InputAdornment, Button } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/Search';
import DateFnsUtils from '@date-io/date-fns';

import useStyles from './useStyles';

interface Props {
  city?: string;
  date?: Date;
  setFilters: Dispatch<SetStateAction<{ city?: string | undefined; date?: Date | undefined }>>;
  reset: () => void;
}

export default function ProfileSearch({ city, date, setFilters, reset }: Props): JSX.Element {
  const today = new Date();
  const [startDate, setStartDate] = useState<Date | null>(today);
  const classes = useStyles();
  return (
    <Box id="product_tour_search_box" maxWidth={675} display="flex" margin="auto">
      <Box flex={2}>
        <TextField
          variant="outlined"
          color="secondary"
          label="Search by city"
          value={city || ''}
          onChange={(e) => setFilters({ city: e.target.value, date })}
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
            onChange={(date) => {
              setStartDate(date);
              date !== null && setFilters({ city, date });
            }}
          />
        </MuiPickersUtilsProvider>
      </Box>
      <Button variant="text" color="primary" disabled={city === undefined && date === undefined} onClick={reset}>
        reset
      </Button>
    </Box>
  );
}
