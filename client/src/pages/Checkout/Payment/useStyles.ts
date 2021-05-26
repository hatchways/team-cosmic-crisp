import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem auto 0',
  },
  radioBtn: {
    color: theme.palette.primary.main,
    '&$checked': {
      color: theme.palette.primary.main,
    },
  },
  paymentContainer: {
    margin: '2rem 0',
  },
  form: {
    maxWidth: '500px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: '0.3rem 0',
  },
  cardElement: {
    marginTop: '0.3rem',
    border: '1px solid #ddd',
    padding: '18.5px 14px',
    borderRadius: '5px',
  },
  submitBtn: {
    margin: '0.5rem auto',
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#fff',
    },
  },
}));

export default useStyles;
