import Grid from '@material-ui/core/Grid';
import useStyles from './useStyles';
import { Conversation } from '../../../interface/Messages';
import { Box } from '@material-ui/core';
import Header from './Header/Header';
import Messages from './Messages/Messages';
import Input from './Input/Input';
import { useAuth } from '../../../context/useAuthContext';

interface Props {
  conversation: Conversation;
}

const SideBar = ({ conversation }: Props): JSX.Element => {
  const classes = useStyles();
  const { firstName, lastName, _id, online } = conversation.recipent;
  const { messages } = conversation;
  const { loggedInUserDetails } = useAuth();
  return (
    <Grid container direction="column" className={classes.root}>
      {conversation.recipent && (
        <>
          <Header userName={`${firstName} ${lastName}`} online={online} />
          <Box className={classes.chatContainer}>
            {messages !== undefined && loggedInUserDetails !== undefined && (
              <Messages messages={messages} otherUser={conversation.recipent} userId={loggedInUserDetails?._id} />
            )}
            <Input />
          </Box>
        </>
      )}
    </Grid>
  );
};

export default SideBar;
