import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SideBar from './Sidebar/Sidebar';
import ActiveChat from './ActiveChat/ActiveChat';
import { useMessages } from '../../context/useMessageContext';
import { sendMessage } from '../../helpers/APICalls/messages';

interface RouteParams {
  conversationId: string;
}

export default function Messages(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const { loggedInUser, loggedInUserDetails } = useAuth();
  const { conversations, activeConversation, addMessage, loading, setActiveConversation } = useMessages();
  const { conversationId } = useParams<RouteParams>();

  const [error, setError] = useState<string>('');

  const handleSendMessage = (text: string) => {
    if (activeConversation) {
      sendMessage(activeConversation, text).then((res) => {
        if (res.success) {
          addMessage(res.success.message);
        } else if (res.error) setError(res.error.message);
      });
    }
  };

  useEffect(() => {
    if (conversationId) setActiveConversation(conversationId);
  }, [conversationId]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <Grid item className={classes.drawerWrapper} md={2}>
        {loggedInUserDetails && <SideBar userProfile={loggedInUserDetails} conversations={conversations} />}
      </Grid>
      <Grid item md={10}>
        {activeConversation && (
          <ActiveChat
            conversation={conversations.find((convo) => convo.conversationId === activeConversation)}
            handleSendMessage={handleSendMessage}
          />
        )}
      </Grid>
    </Grid>
  );
}