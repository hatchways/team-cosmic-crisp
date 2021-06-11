import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '90vh',
    background: '#fff',
    padding: '2.5rem 7rem',
    [theme.breakpoints.down(1200)]: {
      padding: '2.5rem',
    },
  },
  secondaryContainer: {
    [theme.breakpoints.up('xl')]: {
      maxWidth: 1475,
    },
  },
  title: {
    fontWeight: 600,
    marginBottom: '2rem',
  },
  profilesContainer: {
    marginTop: '1.5rem',
    marginBottom: '2.5rem',
  },
}));

export default useStyles;
