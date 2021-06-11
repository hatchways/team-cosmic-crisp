import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formTitle: {
    paddingTop: '1.5rem',
    paddingBottom: '3.5rem',
    fontWeight: 700,
  },
  uploadMessage: {
    width: theme.spacing(24),
    fontWeight: 500,
  },
  imagesContainer: {
    width: '100%',
    height: '30vh',
    minHeight: '250px',
    position: 'relative',
    marginBottom: '2rem',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    background: '#aeaeae',
    '&:hover .addPhotoIcon': {
      display: 'block',
    },
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7,
    },
  },
  avatarContainer: {
    position: 'absolute',
    bottom: '-5%',
    left: '50%',
    transform: 'translate(-50%, 15%)',
    height: '8.5rem',
    width: '8.5rem',
    cursor: 'pointer',
    borderRadius: '50%',
    '&:hover .addPhotoIcon': {
      display: 'block',
    },
  },
  avatar: {
    background: '#000',
    height: '8.5rem',
    width: '8.5rem',
    border: '5px solid white',
    '&:hover': {
      opacity: 0.7,
    },
  },
  addPhotoIcon: {
    width: '3rem',
    height: '3rem',
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    zIndex: 2,
    display: 'none',
    cursor: 'pointer',
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: '#fff',
      },
    },
  },
}));

export default useStyles;
