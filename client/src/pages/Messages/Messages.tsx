import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SideBar from './Sidebar/Sidebar';
import { Conversation } from '../../interface/Messages';
import ActiveChat from './ActiveChat/ActiveChat';

export default function Messages(): JSX.Element {
  const classes = useStyles();

  const { loggedInUser, loggedInUserDetails } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      conversationId: '123456',
      recipent: {
        _id: '123',
        firstName: 'Michale',
        lastName: 'Scott',
        profilePhoto: '#',
      },
      lastMessage: 'Test message',
      seen: false,
      messages: [
        {
          read: false,
          _id: '1234',
          content: 'Test message',
          sender: '123',
          createdAt: new Date(),
        },
        {
          read: false,
          _id: '1234',
          content: 'Test message',
          sender: '123',
          createdAt: new Date(),
        },
      ],
    },
    {
      conversationId: '123456',
      recipent: {
        _id: '125',
        firstName: 'Michale',
        lastName: 'Scott',
        profilePhoto: '#',
      },
      lastMessage: 'Test message',
      seen: true,
      messages: [
        {
          read: false,
          _id: '1234',
          content: 'Test message',
          sender: '125',
          createdAt: new Date(),
        },
      ],
    },
  ]);
  const [activeConvo, setActiveConvo] = useState<Conversation | null>(null);

  const handleChatClick = (convoId: Conversation) => {
    setActiveConvo(convoId);
  };

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <Grid item className={classes.drawerWrapper} md={2}>
        {loggedInUserDetails && (
          <SideBar userProfile={loggedInUserDetails} conversations={conversations} handleChatClick={handleChatClick} />
        )}
      </Grid>
      <Grid item md={10}>
        {activeConvo && <ActiveChat conversation={activeConvo} />}
      </Grid>
    </Grid>
  );
}