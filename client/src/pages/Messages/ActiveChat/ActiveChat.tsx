import Grid from '@material-ui/core/Grid';
import useStyles from './useStyles';
import { Conversation, Message } from '../../../interface/Messages';
import Header from './Header/Header';
import Messages from './Messages/Messages';
import Input from './Input/Input';
import { useAuth } from '../../../context/useAuthContext';

interface Props {
  conversation: Conversation;
  handleSendMessage: (text: string) => void;
  messages: Message[];
}

const SideBar = ({ conversation, handleSendMessage, messages }: Props): JSX.Element => {
  const classes = useStyles();
  const { firstName, lastName, online } = conversation.recipent;
  const { loggedInUserDetails } = useAuth();
  return (
    <Grid container direction="column" className={classes.root}>
      {conversation.recipent && (
        <>
          <Header userName={`${firstName} ${lastName}`} online={online} />
          <Grid container direction="column" justify="space-between" className={classes.chatContainer}>
            {messages !== undefined && loggedInUserDetails !== undefined && (
              <Messages messages={messages} otherUser={conversation.recipent} userId={loggedInUserDetails?._id} />
            )}
            <Input handleSendMessage={handleSendMessage} />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default SideBar;
