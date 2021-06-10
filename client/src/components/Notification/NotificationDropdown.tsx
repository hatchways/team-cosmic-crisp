import { Typography, Paper, Divider, Grid, Button } from '@material-ui/core';
import NotificationItem from './NotificationItem';
import { useEffect } from 'react';
import { setReadNotifications } from '../../helpers/APICalls/notifications';
import { useAuth } from '../../context/useAuthContext';
import { NotificationApiData } from '../../interface/Notification';
import { Link } from 'react-router-dom';

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
    //change the notification state after dropdown unmounted
    //in this case, update the notification Context in useAuthContext
    return function cleanup() {
      res.notifications && updateNotificationsContext(res.notifications);
    };
  }, []);
  // this useEffect hook only needs to run when the dropdown first mount
  // so the dependency here is empty
  return (
    <Paper className={classes.dropdown}>
      <Grid container justify="space-between" alignItems="center">
        <Typography variant="h5" className={classes.notificationTitle}>
          Notifications
        </Typography>
        <Button component={Link} to="/notifications" className={classes.viewAllBtn}>
          View All
        </Button>
      </Grid>
      <Divider />
      {notifications.length > 0 ? (
        <NotificationItem notifications={notifications} />
      ) : (
        <Typography color="secondary" align="center" className={classes.emptyNotificationMessage}>
          There are no new notifications
        </Typography>
        // when the notification is empty, display helper message
      )}
    </Paper>
  );
}
