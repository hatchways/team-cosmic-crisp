import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  chatContainer: {
    padding: '0 2rem',
    width: '100%',
    flexGrow: 1,
    overflow: 'auto',
  },
}));

export default useStyles;
