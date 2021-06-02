import { ChangeEvent, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { User } from '../../../interface/User';
import AvatarDisplay from '../../../components/AvatarDisplay/AvatarDisplay';
import Search from '../../../components/Search/Search';
import { Profile } from '../../../interface/Profile';
import Chat from './Chat';
import { Conversation } from '../../../interface/Messages';

interface Props {
  userProfile: Profile;
  handleDrawerToggle?: () => void;
}

const SideBar = ({ userProfile }: Props): JSX.Element => {
  const classes = useStyles();
  const [search, setSearch] = useState<string>('test');
  const [newChatUser, setNewChatUser] = useState<User | null>(null);

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
    },
  ]);

  // React.FormEvent<FormControl & FormControlProps>)
  const handleChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setSearch(newInputValue);
    if (newChatUser) {
      setNewChatUser(null);
    }
  };

  return (
    <Grid className={classes.chatSideBanner}>
      <Grid item className={classes.userPanel}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <AvatarDisplay loggedIn profile={userProfile} online />
            <Typography className={classes.userText} component="span" variant="h5">
              {`${userProfile.firstName} ${userProfile.lastName}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography className={classes.chatTitle} variant="h5">
          Chats
        </Typography>
        <Search search={search} handleChange={handleChange} />
        {conversations.map((conversation) => (
          <Chat key={conversation.conversationId} conversation={conversation} />
        ))}
      </Grid>
    </Grid>
  );
};

export default SideBar;
