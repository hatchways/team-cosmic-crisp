import { Box, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import { useStyles } from './useStyles';

export default function SideBar(): JSX.Element {
  const classes = useStyles();
  const { pathname } = useLocation();
  const path = pathname.split('/')[2];
  console.log(path === 'editprofile' ? 'classes.active' : '');
  return (
    <Box maxWidth={250} className={classes.sideBarContainer}>
      <List className={classes.sideBar}>
        <ListItem>
          <Link to="/user/editprofile" className={`${classes.links} ${path === 'editprofile' ? classes.active : ''}`}>
            <ListItemText
              disableTypography
              primary={
                <Typography variant="h6" className={classes.linkText}>
                  Edit Profile
                </Typography>
              }
            />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/user/profilephoto" className={`${classes.links} ${path === 'profilephoto' ? classes.active : ''}`}>
            <ListItemText
              disableTypography
              primary={
                <Typography variant="h6" className={classes.linkText}>
                  Profile Photo
                </Typography>
              }
            />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/user/payment" className={`${classes.links} ${path === 'payment' ? classes.active : ''}`}>
            <ListItemText
              disableTypography
              primary={
                <Typography variant="h6" className={classes.linkText}>
                  Payment
                </Typography>
              }
            />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/user/security" className={`${classes.links} ${path === 'security' ? classes.active : ''}`}>
            <ListItemText
              disableTypography
              primary={
                <Typography variant="h6" className={classes.linkText}>
                  Security
                </Typography>
              }
            />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/user/settings" className={`${classes.links} ${path === 'settings' ? classes.active : ''}`}>
            <ListItemText
              disableTypography
              primary={
                <Typography variant="h6" className={classes.linkText}>
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
