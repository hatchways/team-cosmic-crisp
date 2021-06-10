import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 80px)',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      overflowX: 'hidden',
    },
  },
  dashboard: { backgroundColor: '#FFFFFF' },
  drawerWrapper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: '300px',
    },
  },
  activeConvoContainer: {
    // margin: '0 auto',
  },
}));

export default useStyles;
