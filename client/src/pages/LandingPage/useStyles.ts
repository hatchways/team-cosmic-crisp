import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '100vh',
    background: '#fff',
    [theme.breakpoints.down('sm')]: {
      padding: '1.5rem',
    },
  },
  searchFormContainer: {
    height: '100%',
    width: '100%',
    padding: '3.5rem',
    background: '#fff',
    zIndex: 2,
    [theme.breakpoints.down(1150)]: {
      maxWidth: 575,
      maxHeight: 600,
      textAlign: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '10rem',
      padding: '1.5rem',
    },
  },
  title: {
    fontWeight: 700,
    marginBottom: '3.5rem',
    [theme.breakpoints.down('lg')]: {
      marginBottom: '2.5rem',
      fontSize: '3rem',
    },
    [theme.breakpoints.down(1200)]: {
      fontSize: '2.5rem',
    },
  },
  form: {
    [theme.breakpoints.down(1150)]: {
      padding: '0rem 2.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0rem 1rem',
    },
  },
  label: {
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: '1.15rem',
    marginTop: '2rem',
    [theme.breakpoints.down(1150)]: {
      textAlign: 'left',
      marginTop: '3.25rem',
    },
  },
  input: {
    minWidth: '24.5rem',
  },
  button: {
    minWidth: '13.5rem',
    height: '3.5rem',
    textTransform: 'uppercase',
    marginTop: '3rem',
    [theme.breakpoints.down(1150)]: {
      marginTop: '4.5rem',
    },
  },
  imageContainer: {
    [theme.breakpoints.down(1150)]: {
      height: '100%',
      width: '100%',
      display: 'static',
      position: 'fixed',
      top: 0,
      left: 0,
    },
  },
  image: {
    height: '100%',
    width: '100%',
    backgroundPosition: '50% 30%',
    objectFit: 'cover',
  },
}));

export default useStyles;
