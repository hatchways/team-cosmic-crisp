import { useState } from 'react';
import { Button, ClickAwayListener, Paper, Typography, Divider } from '@material-ui/core';
import useStyles from './useStyles';
import useNavBarStyles from '../Navbar/useStyles';
import NotificationItem from './NotificationItem';
import { useEffect } from 'react';
import { Notification } from '../../interface/Notification';
import { getUnreadNotifications } from '../../helpers/APICalls/notifications';

export default function NotificationComponent(): JSX.Element {
  const classes = { ...useStyles(), ...useNavBarStyles() };
  const [open, setOpen] = useState(false);
  const [notifications, setNotification] = useState<Notification[]>([]);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  useEffect(() => {
    async function fetchNotification() {
      const res = await getUnreadNotifications();
    }
    fetchNotification();
  }, []);
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <span className={classes.root}>
        <Button variant="text" className={`${classes.userNavItem}`} onClick={handleClick}>
          Notifications <span className={classes.active} />
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
