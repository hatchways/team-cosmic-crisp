import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  user: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6,
  },
  usernameDate: {
    fontSize: 11,
    color: '#BECCE2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bubble: {
    backgroundImage: 'linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)',
    borderRadius: '0 10px 10px 10px',
  },
  userBubble: {
    borderRadius: '0 10px 10px 10px',
    background: theme.palette.primary.main,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    padding: 8,
  },
  userText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: -0.2,
    padding: 8,
  },
  date: {
    fontSize: 11,
    color: '#BECCE2',
    marginTop: 5,
  },
}));

export default useStyles;
