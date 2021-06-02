import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formTitle: {
    paddingTop: '1.5rem',
    paddingBottom: '3.5rem',
    fontWeight: 700,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  uploadMessage: {
    width: theme.spacing(24),
    fontWeight: 500,
  },
}));

export default useStyles;
