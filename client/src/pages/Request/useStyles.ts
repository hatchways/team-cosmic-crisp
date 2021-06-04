import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '80%',
    margin: '2rem auto',
    minHeight: '85vh',
    background: '#ffffff',
    borderRadius: theme.shape.borderRadius,
  },
}));

export default useStyles;
