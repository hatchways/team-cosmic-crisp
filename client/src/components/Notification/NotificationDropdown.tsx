import { Typography, Paper, Divider, Grid, Button } from '@material-ui/core';
import NotificationItem from './NotificationItem';
import { setReadNotifications } from '../../helpers/APICalls/notifications';
import { useAuth } from '../../context/useAuthContext';
import { NotificationApiData } from '../../interface/Notification';

import useStyles from './useStyles';

export default function NotificationDropdown(): JSX.Element {
  const classes = useStyles();
  const { notifications, updateNotificationsContext } = useAuth();

  const markUnreadNotification = async () => {
    if (notifications && notifications.length === 0) {
      return;
    }
    let res: NotificationApiData;
    try {
      res = await setReadNotifications();
      res.notifications && updateNotificationsContext(res.notifications);
    } catch (error) {
      console.log('error occured when update notification', error);
    }
  };

  return (
    <Paper className={classes.dropdown}>
      <Grid container justify="space-between" alignItems="center">
        <Typography variant="h5" className={classes.notificationTitle}>
          Notifications
        </Typography>
        <Button onClick={markUnreadNotification} className={classes.viewAllBtn}>
          Mark All Read
        </Button>
      </Grid>
      <Divider />
      {notifications.length > 0 ? (
        <NotificationItem />
      ) : (
        <Typography color="secondary" align="center" className={classes.emptyNotificationMessage}>
          There are no new notifications
        </Typography>
        // when the notification is empty, display helper message
      )}
    </Paper>
  );
}
