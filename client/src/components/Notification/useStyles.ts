import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 30,
    right: -20,
    userSelect: 'none',
    border: '1px solid #c7d8e2',
    padding: theme.spacing(1),
    backgroundColor: '#fff',
    width: 400,
    height: 'auto',
    borderRadius: 4,
    boxShadow: '5px 5px 15px rgba(0,0,0,0.125), -5px -5px 15px rgba(0,0,0,0.125)',
  },
}));

export default useStyles;
