import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formTitle: {
    paddingTop: '1.5rem',
    paddingBottom: '3.5rem',
    fontWeight: 600,
  },
  formLabel: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  phoneNumber: {
    fontStyle: 'italic',
    fontWeight: 500,
  },
  button: {
    marginTop: '3.5rem',
    marginBottom: '1.75rem',
    minWidth: '8.5rem',
    borderRadius: theme.shape.borderRadius,
  },
  shouldNotDisplay: {
    display: 'none',
  },
}));

export default useStyles;
