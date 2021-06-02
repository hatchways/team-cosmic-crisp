import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '2rem 1rem',
    margin: '1rem 0',
    border: 'none',
  },
  currentBookings: {
    maxHeight: '60vh',
    overflowY: 'auto',
  },
  pastBookings: {
    marginTop: '1rem',
  },
}));

export default useStyles;
