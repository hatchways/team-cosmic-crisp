import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    background: '#fff',
    padding: '0.5rem 1rem',
    border: '1px solid #bdbdbd',
    width: '100%',
    marginTop: '0.5rem',
  },
  date: {
    fontWeight: 'bold',
  },
  settingsIcon: {
    color: '#bdbdbd',
    '&:hover': {
      color: '#000',
      cursor: 'pointer',
    },
  },
  dateContainer: {
    marginBottom: '0.5rem',
  },
  bookingDetails: { marginBottom: '0.5rem' },
  sitterName: {
    fontWeight: 'bold',
  },
  sitterDetailsContainer: {
    gap: '1rem',
  },
  button: {
    textTransform: 'uppercase',
  },
  accept: {
    color: 'green',
  },
  decline: {
    color: 'red',
  },
  btnDisplay: {
    marginLeft: '1rem',
  },
  checkoutLink: {
    pointerEvents: 'none',
  },
  paidText: {
    fontWeight: 600,
  },
}));

export default useStyles;
