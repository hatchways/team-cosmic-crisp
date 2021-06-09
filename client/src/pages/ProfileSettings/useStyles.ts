import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '90vh',
    width: '100%',
    background: '#f5f5f5',
    padding: '3.5rem 0rem',
  },
  secondaryContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  paper: {
    minHeight: '75vh',
    width: '100%',
    maxWidth: 685,
    background: '#ffffff',
    borderRadius: theme.shape.borderRadius,
    padding: '2.25rem 2.5rem',
  },
  label: {
    paddingTop: '1.5rem',
    paddingBottom: '1.5rem',
    fontWeight: 700,
  },
}));

export default useStyles;
