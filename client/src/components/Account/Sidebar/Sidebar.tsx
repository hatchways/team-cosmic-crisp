import { Box, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import { useStyles } from './useStyles';

export default function SideBar(): JSX.Element {
  const classes = useStyles();
  const { pathname } = useLocation();
  return (
    <Box maxWidth={250} className={classes.sideBarContainer}>
      <List className={classes.sideBar}>
        <ListItem>
          <Link
            to="/user/editProfile"
            className={`${classes.links} ${pathname === '/user/editProfile' ? classes.active : ''}`}
          >
            <ListItemText
              disableTypography
              primary={
                <Typography variant="body1" className={classes.linkText}>
                  Edit Profile
                </Typography>
              }
            />
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/user/profilePhoto"
            className={`${classes.links} ${pathname === '/user/profilePhoto' ? classes.active : ''}`}
          >
            <ListItemText
              disableTypography
              primary={
                <Typography variant="body1" className={classes.linkText}>
                  Profile Photo
                </Typography>
              }
            />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/user/payment" className={`${classes.links} ${pathname === '/user/payment' ? classes.active : ''}`}>
            <ListItemText
              disableTypography
              primary={
                <Typography variant="body1" className={classes.linkText}>
                  Payment
                </Typography>
              }
            />
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/user/security"
            className={`${classes.links} ${pathname === '/user/security' ? classes.active : ''}`}
          >
            <ListItemText
              disableTypography
              primary={
                <Typography variant="body1" className={classes.linkText}>
                  Security
                </Typography>
              }
            />
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/user/settings"
            className={`${classes.links} ${pathname === '/user/settings' ? classes.active : ''}`}
          >
            <ListItemText
              disableTypography
              primary={
                <Typography variant="body1" className={classes.linkText}>
                  Settings
                </Typography>
              }
            />
          </Link>
        </ListItem>
      </List>
    </Box>
  );
}
