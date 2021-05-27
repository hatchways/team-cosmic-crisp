import Avatar from '@material-ui/core/Avatar';
import { User } from '../../interface/User';

interface Props {
  loggedIn?: boolean;
  user?: User;
  src?: string;
}

const AvatarDisplay = ({ user, src }: Props): JSX.Element => {
  return <Avatar alt="Profile Image" src={user?.profile?.profilePhoto || src} />;
};

export default AvatarDisplay;
