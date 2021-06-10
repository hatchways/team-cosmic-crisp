import { Avatar, Grid, Typography, List, ListItem } from '@material-ui/core';
import useStyles from './useStyles';
import { Notification } from '../../interface/Notification';
import moment from 'moment';
import { markSingleNotification } from '../../helpers/APICalls/notifications';
import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';

import NotificationsIcon from '@material-ui/icons/Notifications';

export default function NotificationItem(): JSX.Element {
  const classes = useStyles();
  const { loggedInUserDetails, notifications, updateNotificationsContext } = useAuth();
  const history = useHistory();
  const handleClick = async (id: string) => {
    try {
      const res = await markSingleNotification(id);
      res.notifications && updateNotificationsContext(res.notifications);
      loggedInUserDetails?.isDogSitter && history.push('/requests');
      !loggedInUserDetails?.isDogSitter && history.push('/bookings');
    } catch (error) {
      console.log('Error update notification', error);
    }
  };
  return (
    <List className={classes.listItemContainer}>
      {notifications.map((notification) => (
        <ListItem className={classes.listItem} key={notification._id} onClick={() => handleClick(notification._id)}>
          <Grid container direction="row" alignItems="center" className={classes.listContainer}>
            <Grid item xs={2}>
              {notification.thumbnail ? (
                <Avatar alt="notification icon" src={notification.thumbnail} className={classes.notiAvatar} />
              ) : (
                <Avatar className={classes.notiAvatar}>
                  <NotificationsIcon />
                </Avatar>
              )}
            </Grid>
            <Grid item xs={9}>
              <Grid container direction="column" justify="space-around" alignItems="flex-start" spacing={1}>
                <Grid item>
                  <Typography>{notification.description}</Typography>
                </Grid>
                <Grid item>
                  <Typography color="secondary" className={classes.notificationTime}>
                    {moment(notification.date).fromNow()}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              {!notification.read ? <div className={classes.unReadNotification}></div> : null}
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
}
