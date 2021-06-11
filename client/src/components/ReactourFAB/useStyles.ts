import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  fab: {
    position: 'fixed',
    bottom: '1.5rem',
    left: '1.5rem',
    width: '3.5rem',
    height: '3.5rem',
  },
  iconBtn: {
    width: '1.5rem',
    height: '1.5rem',
  },
}));

export default useStyles;
