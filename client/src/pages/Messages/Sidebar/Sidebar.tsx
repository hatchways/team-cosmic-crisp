import { ChangeEvent, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { User } from '../../../interface/User';
import AvatarDisplay from '../../../components/AvatarDisplay/AvatarDisplay';
import Search from '../../../components/Search/Search';
import AuthMenu from '../../../components/AuthMenu/AuthMenu';

interface Props {
  loggedInUser: User;
  handleDrawerToggle?: () => void;
}

const SideBar = ({ loggedInUser }: Props): JSX.Element => {
  const [search, setSearch] = useState<string>('test');
  const [newChatUser, setNewChatUser] = useState<User | null>(null);
  const classes = useStyles();

  // React.FormEvent<FormControl & FormControlProps>)
  const handleChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setSearch(newInputValue);
    if (newChatUser) {
      setNewChatUser(null);
    }
  };

  return (
    <Grid className={classes.chatSideBanner}>
      <Box className={classes.userPanel}>
        <AvatarDisplay loggedIn user={loggedInUser} />
        <Typography className={classes.userText} variant="h5">
          {loggedInUser.profile.firstName}
        </Typography>
        <AuthMenu />
      </Box>
      <Box>
        <Typography className={classes.chatTitle} variant="h5">
          Users
        </Typography>
        <Search search={search} handleChange={handleChange} />
      </Box>
    </Grid>
  );
};

export default SideBar;
