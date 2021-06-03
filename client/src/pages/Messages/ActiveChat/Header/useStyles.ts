import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    margin: '2rem 0',
    padding: '2rem 0',
    boxShadow: '0 2px 20px 0 rgba(88,133,196,0.10)',
  },
  username: {
    margin: '0 1rem',
  },
  statusText: {
    fontSize: 12,
    color: '#BFC9DB',
    letterSpacing: -0.17,
  },
  statusDot: {
    height: 8,
    width: 8,
    borderRadius: '50%',
    marginRight: 5,
    backgroundColor: '#D0DAE9',
  },
  online: {
    background: '#1CED84',
  },
}));

export default useStyles;
