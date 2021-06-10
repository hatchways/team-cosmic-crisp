import Grid from '@material-ui/core/Grid';
import useStyles from './useStyles';
import { Conversation } from '../../../interface/Messages';
import Header from './Header/Header';
import Messages from './Messages/Messages';
import Input from './Input/Input';
import { useAuth } from '../../../context/useAuthContext';
import { useMessages } from '../../../context/useMessageContext';
import { CircularProgress } from '@material-ui/core';

interface Props {
  conversation?: Conversation;
  handleSendMessage: (text: string) => void;
}

const ActiceChat = ({ conversation, handleSendMessage }: Props): JSX.Element => {
  const classes = useStyles();
  const { loggedInUserDetails } = useAuth();
  const { loading, messages } = useMessages();
  return (
    <Grid
      container
      direction="column"
      className={`${classes.root} ${conversation ? classes.active : classes.notActive}`}
    >
      {conversation && conversation.recipient && (
        <>
          <Header
            userName={`${conversation.recipient.firstName} ${conversation.recipient.lastName}`}
            online={conversation.recipient.online}
          />
          <Grid container direction="column" justify="space-between" className={classes.chatContainer}>
            {loading ? (
              <CircularProgress />
            ) : (
              messages !== undefined &&
              loggedInUserDetails !== undefined && (
                <Messages
                  messages={messages}
                  conversationId={conversation.conversationId}
                  otherUser={conversation.recipient}
                  userId={loggedInUserDetails?._id}
                />
              )
            )}
          </Grid>
          <Input handleSendMessage={handleSendMessage} />
        </>
      )}
    </Grid>
  );
};

export default ActiceChat;
