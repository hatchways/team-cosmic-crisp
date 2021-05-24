import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  requestContainer: {
    height: '100%',
    maxHeight: 450,
    padding: '1.5rem 2rem',
  },
  price: {
    fontWeight: 600,
    fontSize: '1.5rem',
    padding: '1rem',
  },
  dateContainer: {
    marginTop: '1.5rem',
  },
  title: {
    fontWeight: 600,
    fontSize: '1rem',
    padding: '0.5rem 0rem',
  },
  submitBtn: {
    marginTop: '2rem',
    minWidth: '10rem',
    height: '3rem',
  },
}));

export default useStyles;
