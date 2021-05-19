import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '0.5rem',
  },
  transparentNav: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
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
    marginRight: 35,
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
    '&:hover': {
      background: '#fff',
      color: theme.palette.primary.main,
    },
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
}));

export default useStyles;
