import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    cursor: 'pointer',
    margin: '0.5rem 0',
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
    borderRadius: '10px 0 10px 10px',
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
  },
  typingLoader: {
    position: 'relative',
    height: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    padding: '0 0.5rem',
    '& div': {
      display: 'inline-block',
      width: '0.6rem',
      height: '0.6rem',
      borderRadius: '50%',
      background: '#ddd',
      margin: '0 0.3rem',
      animation: 'typing-loader-animation 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite',
      position: 'relative',
      '&:nth-child(1)': {
        animationDelay: '-0.24s',
      },
      '&:nth-child(2)': {
        animationDelay: '-0.12s',
      },
      '&:nth-child(3)': {
        animationDelay: '-0',
      },
    },
  },
  '@keyframes typing-loader-animation': {
    '0%': {
      top: '0rem',
    },
    '25%': {
      top: '0.5rem',
    },
    '100%': {
      top: '-0.5rem',
    },
  },
}));

export default useStyles;
