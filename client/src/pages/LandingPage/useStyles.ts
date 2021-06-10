import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '100vh',
    background: '#fff',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
    },
  },
  searchFormContainer: {
    height: '100%',
    width: '100%',
    padding: '3.25rem',
    marginTop: '2.85rem',
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    zIndex: 2,
    [theme.breakpoints.down(1150)]: {
      maxWidth: 525,
      maxHeight: 625,
      textAlign: 'center',
      boxShadow:
        'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 475,
      maxHeight: 550,
      marginTop: '3.5rem',
      padding: '1.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 415,
      padding: '0.85rem',
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
      padding: '0rem 1.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0rem 1.15rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0rem 0.5rem',
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
    [theme.breakpoints.down('sm')]: {
      marginTop: '2.5rem',
    },
  },
  input: {
    width: '100%',
    maxWidth: '25rem',
  },
  button: {
    minWidth: '13.5rem',
    height: '3.5rem',
    textTransform: 'uppercase',
    marginTop: '3rem',
    [theme.breakpoints.down(1150)]: {
      marginTop: '3.75rem',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '2.5rem',
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
