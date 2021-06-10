import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  detailsContainer: {
    minHeight: '75vh',
    overflow: 'hidden',
  },
  imageContainer: {
    height: '35vh',
    position: 'relative',
  },
  avatar: {
    position: 'absolute',
    bottom: '-15%',
    left: '50%',
    transform: 'translate(-50%, 15%)',
    height: '8.5rem',
    width: '8.5rem',
    border: '5px solid white',
  },
  coverImage: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  aboutContainer: {
    marginTop: '7.5%',
    padding: '2.5rem',
  },
  name: {
    fontWeight: 600,
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  aboutTitle: {
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  aboutDescription: {
    lineHeight: '200%',
    marginBottom: '1rem',
  },
  galleryTile: {
    borderRadius: 16,
    marginRight: '1rem',
    overflow: 'hidden',
  },
  dayAvailable: {
    textTransform: 'capitalize',
    margin: '0 0.25rem',
  },
  reviewsContainer: {
    padding: '0.5rem 2.5rem 2.5rem 2.5rem',
  },
  signInTitle: {
    marginBottom: '2.5rem',
  },
  reviewMainTitle: {
    fontWeight: 600,
    fontSize: '1rem',
    marginBottom: '1.5rem',
    textDecoration: 'underline',
  },
  paginationContainer: {
    marginTop: '3.5rem',
  },
}));

export default useStyles;
