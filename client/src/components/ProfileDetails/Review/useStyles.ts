import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  reviewContainer: {
    marginBottom: '1.75rem',
  },
  reviewHeader: {
    marginBottom: '0.75rem',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25rem',
    },
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: '1rem',
  },
  avatar: {
    width: '3rem',
    height: '3rem',
    marginRight: '0.5rem',
  },
  desc: {
    margin: '1rem 0rem',
    [theme.breakpoints.down('xs')]: {
      margin: '0.75rem 0rem',
    },
  },
}));

export default useStyles;
