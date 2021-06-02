import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import AvatarDisplay from '../../../components/AvatarDisplay/AvatarDisplay';
import { Profile } from '../../../interface/Profile';
import { Conversation } from '../../../interface/Messages';

interface Props {
  userProfile?: Profile;
  conversation: Conversation;
}

const SideBar = ({ userProfile, conversation }: Props): JSX.Element => {
  const classes = useStyles();
  const { firstName, lastName } = conversation.recipent;
  return (
    <Grid container alignItems="center" justify="space-between" className={classes.chat}>
      <Grid item>
        <AvatarDisplay loggedIn profile={userProfile} online />
        <Typography className={classes.userText} component="span" variant="h5">
          {`${firstName} ${lastName}`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SideBar;
