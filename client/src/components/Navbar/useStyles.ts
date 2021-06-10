import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '0.5rem',
  },
  transparentNav: {
    boxShadow: 'none',
  },
  landingNav: {
    position: 'fixed',
    top: 0,
    background: 'transparent',
    color: '#fff',
  },
  landingBtn: {
    color: '#fff !important',
    border: '1px solid #A9A9A9 !important',
  },
  grow: {
    flexGrow: 1,
  },
  btn: {
    width: '9rem',
    height: '3rem',
    borderRadius: theme.shape.borderRadius,
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    boxShadow: 'none',
    marginRight: 30,
    textTransform: 'uppercase',
  },
  sitterBtn: {
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.main,
      background: '#fff',
    },
  },
  link: {
    textDecoration: 'none',
  },
  loginBtn: {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#fff',
    },
  },
  signupbtn: {
    background: theme.palette.primary.main,
    color: '#fff',
  },
  userNavItem: {
    fontWeight: 'bold',
    fontSize: '1rem',
    margin: '0 0.8rem',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  active: {
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'green',
    position: 'relative',
    top: '-10px',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    width: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '2rem 2rem 3rem 2rem',
  },
  modelHeader: {
    marginBottom: '1rem',
  },
  modalBtn: {
    marginTop: '2rem',
  },
}));

export default useStyles;
