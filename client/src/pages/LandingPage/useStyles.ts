import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  mainContainer: {
    minHeight: '100vh',
    background: '#fff',
  },
  searchFormContainer: {
    height: '100%',
    width: '100%',
    padding: '1.5rem 3rem',
  },
  title: {
    fontWeight: 700,
    marginBottom: '3.5rem',
  },
  label: {
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: '1.15rem',
    marginTop: '2rem',
  },
  input: {
    minWidth: '24.5rem',
  },
  button: {
    minWidth: '13.5rem',
    height: '3.5rem',
    textTransform: 'uppercase',
    marginTop: '3rem',
  },
  image: {
    height: '100%',
    width: '100%',
    backgroundPosition: '50% 30%',
    objectFit: 'cover',
  },
}));

export default useStyles;
