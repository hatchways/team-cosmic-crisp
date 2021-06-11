import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '90vh',
    background: '#f5f5f5',
  },
  secondaryContainer: {
    width: '100%',
    gap: '4.25rem',
    padding: '4.25rem 5.25rem',
    [theme.breakpoints.down(1675)]: {
      padding: '4.25rem',
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: '4.25rem 6.75rem',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '4.25rem 3.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '4.25rem 0.75rem',
    },
  },
  formContainer: {
    maxWidth: 375,
    margin: '0 auto',
  },
}));

export default useStyles;
