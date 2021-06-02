import { useState } from 'react';
import { Button, ClickAwayListener, Paper, Typography, Divider } from '@material-ui/core';
import useStyles from './useStyles';
import useNavBarStyles from '../Navbar/useStyles';
import NotificationItem from './NotificationItem';
import { useEffect } from 'react';
import { useAuth } from '../../context/useAuthContext';

export default function NotificationComponent(): JSX.Element {
  const classes = { ...useStyles(), ...useNavBarStyles() };
  const [open, setOpen] = useState(false);
  const { notifications } = useAuth();

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <span className={classes.root}>
        <Button variant="text" className={`${classes.userNavItem}`} onClick={handleClick}>
          Notifications {notifications.length > 0 ? <span className={classes.active} /> : null}
        </Button>
        {open ? (
          <Paper className={classes.dropdown}>
            <Typography variant="h5" className={classes.notificationTitle}>
              Notifications
            </Typography>
            <Divider />
            <NotificationItem />
          </Paper>
        ) : null}
      </span>
    </ClickAwayListener>
  );
}
