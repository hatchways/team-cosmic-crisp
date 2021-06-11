import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
  profileCard: {
    maxWidth: 325,
    textAlign: 'center',
    margin: 'auto',
  },
  cardHeader: {
    paddingTop: '1.5rem',
    paddingBottom: '0.75rem',
  },
  avatar: {
    width: '7.5rem',
    height: '7.5rem',
    margin: '0.75rem auto',
  },
  boldFont: {
    fontWeight: 600,
  },
  description: {
    padding: '1rem 2.5rem 2rem 2.5rem',
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
