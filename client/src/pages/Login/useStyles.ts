import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';

const useStyles = makeStyles(() => ({
  root: {
    height: 'calc( 100vh - 80px )',
    minWidth: '100%',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '100%',
    paddingTop: 23,
    marginTop: '-80px',
  },
  welcome: {
    fontSize: '2.5rem',
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    fontFamily: "'Open Sans'",
    textAlign: 'center',
  },
  signupLinkContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    fontWeight: 'bold',
  },
  signupLink: {
    color: theme.palette.primary.main,
  },
  signupBtn: {
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
