import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import AvatarDisplay from '../../../components/AvatarDisplay/AvatarDisplay';
import { Profile } from '../../../interface/Profile';
import { Conversation } from '../../../interface/Messages';
import { Box } from '@material-ui/core';

interface Props {
  userProfile?: Profile;
  conversation: Conversation;
  handleChatClick: (convoId: Conversation) => void;
}

const SideBar = ({ userProfile, conversation, handleChatClick }: Props): JSX.Element => {
  const classes = useStyles();
  const { firstName, lastName } = conversation.recipent;
  const { lastMessage, seen, conversationId } = conversation;
  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={classes.chat}
      wrap="nowrap"
      onClick={() => handleChatClick(conversation)}
    >
      <Grid container alignItems="center">
        <AvatarDisplay loggedIn profile={userProfile} online />
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
