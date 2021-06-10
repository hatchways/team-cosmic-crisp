import { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useStyles from './useStyles';
import { Button, IconButton, Grid, Menu, MenuItem, Modal, Typography } from '@material-ui/core';
import Logo from '../../Images/logo.png';
import { User } from '../../interface/User';
import { Profile } from '../../interface/Profile';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Availability from '../Account/EditProfileForm/Availability';
import CustomTextField from '../Account/EditProfileForm/CustomTextField';
import updateProfile from '../../helpers/APICalls/updateProfile';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useSocket } from '../../context/useSocketContext';

interface Props {
  user: User | null | undefined;
  userProfile: Profile | null | undefined;
  logout(): void;
}

export default function Navbar({ user, userProfile, logout }: Props): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const { updateLoggedInUserDetails } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const { pathname } = useLocation();
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    if (userProfile) setProfile(userProfile);
  }, [userProfile]);
  const { socket } = useSocket();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    socket?.emit('logout', profile?._id);
    handleClose();
    logout();
  };

  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleBecomeSitter = () => {
    setOpenModal(!openModal);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    property: string,
    value?: string,
  ): void => {
    switch (property) {
      case 'isAvailable':
        profile && setProfile({ ...profile, isAvailable: !profile.isAvailable });
        break;
      case 'availability': {
        if (value && profile?.availability) {
          setProfile({
            ...profile,
            availability: profile.availability?.includes(value)
              ? profile.availability.filter((day) => day !== value)
              : [...profile?.availability, value],
          });
        }
        break;
      }
      default:
        profile && setProfile({ ...profile, [property]: e.target.value });
    }
  };

  const handleSaveProfile = async () => {
    const id = profile ? profile._id : '';
    try {
      if (profile && profile.isAvailable) {
        const res = await updateProfile(id, { ...profile, isDogSitter: true });
        updateLoggedInUserDetails(res);
        updateSnackBarMessage('Profile updated you are a sitter now');
      }
    } catch (error) {
      updateSnackBarMessage(`Error updating user profile ${error}`);
    }
  };

  const BecomeSitterModal = ({ profile }: { profile: Profile }) => (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Grid container direction="column" alignItems="flex-start" className={classes.modal}>
        <Grid className={classes.modelHeader}>
          <Typography variant="h4" align="center">
            Become a sitter
          </Typography>
        </Grid>
        <Grid className={classes.modelBody}>
          <Typography component="div" variant="h6" className={classes.modelHeader}>
            Please set your availability to become a sitter
          </Typography>
          <form>
            <Availability profile={profile} handleChange={handleChange} />
            <CustomTextField
              onChange={(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
                handleChange(e, 'price')
              }
              value={profile.price ? profile.price : 0}
              label="price"
              placeholder="price"
              required={profile.isAvailable}
              type="number"
            />
            <Grid container justify="center" className={classes.modalBtn}>
              <Button variant="contained" color="primary" onClick={handleSaveProfile}>
                Save
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Modal>
  );

  const Nav = () => (
    <>
      <Button color="inherit" className={`${classes.btn} ${classes.sitterBtn}`} variant="text">
        become a sitter
      </Button>
      <Link to="/login" className={classes.link}>
        <Button
          color="inherit"
          className={` ${pathname === '/' ? classes.landingBtn : ''} ${classes.btn} ${classes.loginBtn}`}
          variant="outlined"
        >
          Login
        </Button>
      </Link>
      <Link to="/signup" className={classes.link}>
        <Button color="primary" className={`${classes.btn} ${classes.signupbtn}`} variant="contained">
          signup
        </Button>
      </Link>
    </>
  );

  const UserNav = () => (
    <Grid>
      {profile && !profile?.isDogSitter && (
        <>
          <Button className={classes.userNavItem} onClick={handleBecomeSitter}>
            Become a Sitter
          </Button>
          <BecomeSitterModal profile={profile} />
        </>
      )}
      <Button variant="text" className={classes.userNavItem}>
        Notifications <span className={classes.active} />
      </Button>
      <Button variant="text" component={Link} to="/bookings" className={classes.userNavItem}>
        {profile?.isDogSitter ? 'My Jobs' : 'My Sitters'}
      </Button>
      <Button component={Link} to="/messages" variant="text" className={classes.userNavItem}>
        Messages <span className={classes.active} />
      </Button>
    </Grid>
  );

  return (
    <Grid container>
      <AppBar
        position="static"
        className={`${pathname === '/' ? classes.landingNav : ''} ${classes.appBar} ${!user && classes.transparentNav}`}
      >
        <Toolbar>
          <Link to="/listings" className={classes.link}>
            <img src={Logo} alt="logo" />
          </Link>
          <div className={classes.grow} />
          {user ? (
            <>
              <UserNav />
              <IconButton onClick={handleClick} aria-controls="user-menu" aria-haspopup="true">
                {user !== null && user !== undefined && <AvatarDisplay loggedIn={true} profile={profile} />}
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={() => history.push('/user/edit-profile')}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Nav />
          )}
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
