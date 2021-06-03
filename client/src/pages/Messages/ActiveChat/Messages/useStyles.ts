import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chatSideBanner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '1rem 1rem',
    [theme.breakpoints.up('md')]: {
      padding: '2rem 2rem',
    },
  },
  userPanel: {
    marginBottom: '1rem',
  },
  userText: {
    fontWeight: 700,
    paddingLeft: '1rem',
    fontSize: 16,
  },
  chatTitle: {
    fontWeight: 700,
    fontSize: 20,
    margin: '1rem 0',
  },
  chatSummaryContainer: { overflowY: 'auto', marginTop: '1rem' },
  newChatBtn: {
    margin: '1rem 0',
  },
  noChatToSelectText: {
    margin: '1rem 0',
  },
  chat: {
    margin: '1.5rem 0',
    cursor: 'pointer',
  },
  lastText: {
    marginLeft: '1rem',
  },
  textNotSeen: {
    fontWeight: 'bold',
  },
  notSeenBox: {
    width: '0.6rem',
    height: '0.6rem',
    borderRadius: '50%',
    backgroundColor: 'blue',
  },
}));

export default useStyles;
