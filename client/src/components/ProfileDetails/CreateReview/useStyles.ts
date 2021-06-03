import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  mainContainer: {
    marginTop: '2.5rem',
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: '1rem',
  },
  avatar: {
    marginRight: '0.5rem',
  },
  ratingContainer: {
    marginTop: '1rem',
    marginBottom: '0.75rem',
  },
  rating: {
    fontSize: '1rem',
    marginRight: '0.5rem',
  },
  btnContainer: {
    marginTop: '2rem',
  },
}));

export default useStyles;
