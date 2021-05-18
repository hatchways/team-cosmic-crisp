import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useStyles from './useStyles';
import { Button, IconButton, Grid, Menu, MenuItem } from '@material-ui/core';
import Logo from '../../Images/logo.png';
import { User } from '../../interface/User';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';

interface Props {
  user: User | null | undefined;
  logout: () => void;
}

export default function Navbar({ user, logout }: Props) {
  const classes = useStyles();

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
      <Button color="inherit" className={`${classes.btn} ${classes.loginBtn}`} variant="outlined">
        Login
      </Button>
      <Button color="inherit" className={`${classes.btn} ${classes.signupbtn}`} variant="contained">
        signup
      </Button>
    </>
  );

  const UserNav = () => (
    <>
      <ul className={classes.userNav}>
        <li className={classes.userNavItem}>
          Notifications <span className={classes.active} />
        </li>
        <li className={classes.userNavItem}>My Jobs</li>
        <li className={classes.userNavItem}>
          Messages <span className={classes.active} />
        </li>
      </ul>
    </>
  );

  return (
    <Grid container>
      <AppBar position="static" className={`${classes.appBar} ${!user && classes.transparentNav}`}>
        <Toolbar>
          <img src={Logo} alt="logo" />
          <div className={classes.grow} />
          {user ? (
            <>
              <UserNav />
              <IconButton onClick={handleClick} aria-controls="user-menu" aria-haspopup="true">
                {user !== null && user !== undefined && <AvatarDisplay loggedIn={true} user={user} />}
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
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
