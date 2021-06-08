import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Box, TextField, InputAdornment, Button } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/Search';
import DateFnsUtils from '@date-io/date-fns';

import useStyles from './useStyles';
import { Filter } from '../../../interface/Profile';

interface Props {
  city?: string;
  startDate?: Date;
  endDate?: Date;
  setFilters: Dispatch<SetStateAction<Filter>>;
}

interface Filters {
  dropIn?: Date | null;
  dropOff?: Date | null;
}

export default function ProfileSearch({ city, startDate, endDate, setFilters }: Props): JSX.Element {
  const [dateFilters, setDateFilters] = useState<Filters>({
    dropIn: startDate,
    dropOff: endDate,
  });
  const classes = useStyles();

  useEffect(() => {
    if (dateFilters.dropIn && dateFilters.dropOff) {
      setFilters({ city, startDate: dateFilters.dropIn, endDate: dateFilters.dropOff });
    }
  }, [dateFilters]);

  return (
    <Box maxWidth={675} display="flex" margin="auto">
      <Box flex={2}>
        <TextField
          variant="outlined"
          color="secondary"
          label="Search by city"
          value={city || ''}
          onChange={(e) => setFilters({ city: e.target.value, startDate, endDate })}
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
      <Box flex={1} display="flex">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            color="secondary"
            autoOk
            variant="inline"
            inputVariant="outlined"
            format="MM/dd"
            label="Drop In"
            value={dateFilters.dropIn}
            onChange={(date) => {
              date !== null && setDateFilters((prevState) => ({ ...prevState, dropIn: date }));
            }}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            color="secondary"
            autoOk
            variant="inline"
            inputVariant="outlined"
            format="MM/dd"
            label="Drop Off"
            value={dateFilters.dropOff}
            onChange={(date) => {
              date !== null && setDateFilters((prevState) => ({ ...prevState, dropOff: date }));
            }}
          />
        </MuiPickersUtilsProvider>
      </Box>
      <Button
        variant="text"
        color="primary"
        disabled={city === undefined && startDate === undefined && endDate === undefined}
        onClick={() => {
          setFilters({});
          setDateFilters({});
        }}
      >
        Reset
      </Button>
    </Box>
  );
}
