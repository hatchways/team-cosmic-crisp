import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  reviewContainer: {
    marginBottom: '1.75rem',
  },
  reviewHeader: {
    marginBottom: '0.75rem',
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
}));

export default useStyles;
