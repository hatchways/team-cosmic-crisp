import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import { Paper } from '@material-ui/core';
import Calendar from 'react-calendar';
import './calendar.css';

interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export default function BookingCalendar({ selectedDate, setSelectedDate }: Props): JSX.Element {
  const handleChange = (date: Date) => {
    if (date) setSelectedDate(date);
  };
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Paper elevation={0} className={classes.root}>
        <Calendar value={selectedDate} onChange={handleChange} />
      </Paper>
    </>
  );
}
