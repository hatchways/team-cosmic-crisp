import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    padding: '0 2rem',
  },
  chatContainer: {
    maxHeight: 'calc( 100vh - 280px )',
    width: '100%',
    flexGrow: 1,
    overflow: 'auto',
  },
}));

export default useStyles;
