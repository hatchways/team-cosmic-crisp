import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useStyles from './useStyles';
import { Button, IconButton, Grid, Menu, MenuItem } from '@material-ui/core';
import Logo from '../../Images/logo.png';
import { User } from '../../interface/User';
import { Profile } from '../../interface/Profile';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface Props {
  user: User | null | undefined;
  profile: Profile | null | undefined;
  logout(): void;
}

export default function Navbar({ user, profile, logout }: Props): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const Nav = () => (
    <>
      <Button color="inherit" className={`${classes.btn} ${classes.sitterBtn}`} variant="text">
        become a sitter
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/login"
        className={` ${pathname === '/' ? classes.landingBtn : ''} ${classes.btn} ${classes.loginBtn}`}
        variant="outlined"
      >
        Login
      </Button>
      <Button
        component={Link}
        to="/signup"
        color="primary"
        className={`${classes.btn} ${classes.signupbtn}`}
        variant="contained"
      >
        signup
      </Button>
    </>
  );

  const UserNav = () => (
    <Grid>
      {profile?.isDogSitter ? (
        <Button component={Link} to="/requests" variant="text" className={classes.userNavItem}>
          Request
        </Button>
      ) : null}
      <Button variant="text" className={classes.userNavItem}>
        Notifications <span className={classes.active} />
      </Button>
      <Button component={Link} to="/bookings" variant="text" className={classes.userNavItem}>
        My Bookings
      </Button>
      <Button variant="text" className={classes.userNavItem}>
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
