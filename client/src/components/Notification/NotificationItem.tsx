import { Avatar, Grid, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import { Notification } from '../../interface/Notification';
import moment from 'moment';

import NotificationsIcon from '@material-ui/icons/Notifications';

interface Props {
  notifications: Notification[];
}

export default function NotificationItem({ notifications }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <ul className={classes.listItemContainer}>
      {notifications.map((notification) => (
        <li className={classes.listItem} key={notification._id}>
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
        </li>
      ))}
    </ul>
  );
}
