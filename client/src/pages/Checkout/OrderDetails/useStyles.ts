import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem auto 0',
  },
  paper: {
    padding: '2rem 3rem',
    minWidth: '100%',
  },
  summaryList: {
    border: '1px solid #ddd',
  },
  listItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  order: {
    gap: '4rem',
  },
  orderDetailsContainer: {
    flex: '1',
  },
  orderDetails: {
    margin: '2rem 0',
  },
  avatar: {
    height: '5rem',
    width: '5rem',
    marginRight: '2rem',
  },
  userName: {
    fontSize: '1.5rem',
  },
  checkoutBtn: {
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#fff',
    },
  },
}));

export default useStyles;
