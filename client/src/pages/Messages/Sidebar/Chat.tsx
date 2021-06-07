import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import AvatarDisplay from '../../../components/AvatarDisplay/AvatarDisplay';
import { Profile } from '../../../interface/Profile';
import { Conversation } from '../../../interface/Messages';
import { Box } from '@material-ui/core';
import { useMessages } from '../../../context/useMessageContext';

interface Props {
  userProfile?: Profile;
  conversation: Conversation;
}

const SideBar = ({ conversation }: Props): JSX.Element => {
  const classes = useStyles();
  const { firstName, lastName, profilePhoto, online } = conversation.recipient;
  const { lastMessage, seen } = conversation;
  const { setActiveConversation } = useMessages();
  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={classes.chat}
      wrap="nowrap"
      onClick={() => setActiveConversation(conversation.conversationId)}
    >
      <Grid container alignItems="center">
        <AvatarDisplay loggedIn src={profilePhoto} online={online} offline={!online} />
        <Grid>
          <Typography className={classes.userText} component="div" variant="h5">
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography component="div" variant="body2" className={`${classes.lastText} ${!seen && classes.textNotSeen}`}>
            {lastMessage}
          </Typography>
        </Grid>
      </Grid>
      {!seen && <Box className={classes.notSeenBox} />}
    </Grid>
  );
};

export default SideBar;
