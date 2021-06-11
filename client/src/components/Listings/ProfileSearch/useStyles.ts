import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    [theme.breakpoints.down(600)]: {
      flexDirection: 'column',
      gap: '1.15rem',
    },
  },
  searchField: {
    fontWeight: 700,
  },
  resetBtn: {
    [theme.breakpoints.down(600)]: {
      marginTop: '0.75rem',
    },
  },
}));

export default useStyles;
