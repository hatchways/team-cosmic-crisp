import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '70%',
    margin: '2rem auto',
    minHeight: '85vh',
    background: '#ffffff',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
  },
  tableName: {
    fontWeight: 600,
  },
  userDisplayName: {
    paddingLeft: theme.spacing(1),
  },
  userAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export default useStyles;
