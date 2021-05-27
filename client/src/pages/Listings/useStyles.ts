import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  mainContainer: {
    minHeight: '90vh',
    background: '#fff',
    padding: '2.5rem 7rem',
  },
  title: {
    fontWeight: 600,
    marginBottom: '2rem',
  },
  profilesContainer: {
    marginTop: '3.5rem',
  },
}));

export default useStyles;
