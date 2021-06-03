import { Typography, Paper, Divider } from '@material-ui/core';
import NotificationItem from './NotificationItem';
import { useEffect } from 'react';
import { setReadNotifications } from '../../helpers/APICalls/notifications';
import { useAuth } from '../../context/useAuthContext';
import { NotificationApiData } from '../../interface/Notification';

import useStyles from './useStyles';

export default function NotificationDropdown(): JSX.Element {
  const classes = useStyles();
  const { notifications, updateNotificationsContext } = useAuth();

  useEffect(() => {
    if (notifications && notifications.length === 0) {
      return;
    }
    let res: NotificationApiData;
    async function markUnreadNotification() {
      try {
        res = await setReadNotifications();
      } catch (error) {
        console.log('error occured when update notification', error);
      }
    }
    markUnreadNotification();
    return function cleanup() {
      res.notifications && updateNotificationsContext(res.notifications);
    };
  }, []);
  return (
    <Paper className={classes.dropdown}>
      <Typography variant="h5" className={classes.notificationTitle}>
        Notifications
      </Typography>
      <Divider />
      <NotificationItem notifications={notifications} />
    </Paper>
  );
}
