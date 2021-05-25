import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
  profileCard: {
    textAlign: 'center',
  },
  cardHeader: {
    paddingTop: '1rem',
    paddingBottom: '0.5rem',
  },
  avatar: {
    width: '6.5rem',
    height: '6.5rem',
    margin: '0.5rem auto',
  },
  boldFont: {
    fontWeight: 600,
  },
  description: {
    padding: '0.5rem 2.5rem 2rem 2.5rem',
  },
  cardFooter: {
    padding: '1rem',
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
    gap: '0.25rem',
  },
  price: {
    fontSize: '1rem',
  },
}));

export default useStyles;
