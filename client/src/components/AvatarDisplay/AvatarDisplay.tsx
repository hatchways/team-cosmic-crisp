import Avatar from '@material-ui/core/Avatar';
import { Profile } from '../../interface/Profile';
import { User } from '../../interface/User';

interface Props {
  loggedIn?: boolean;
  user?: User | null | undefined;
  profile?: Profile | null | undefined;
  src?: string;
}

const AvatarDisplay = ({ profile, src }: Props): JSX.Element => {
  return <Avatar alt="Profile Image" src={profile?.profilePhoto || src} />;
};

export default AvatarDisplay;
