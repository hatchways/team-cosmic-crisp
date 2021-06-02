import { Avatar, Grid, Typography } from '@material-ui/core';
import useStyles from './useStyles';

export default function NotificationItem(): JSX.Element {
  const classes = useStyles();

  return (
    <ul className={classes.listItemContainer}>
      <li className={classes.listItem}>
        <Grid container direction="row" alignItems="center" className={classes.listContainer}>
          <Grid item xs={2}>
            <Avatar alt="Sample Avatar" src="" className={classes.notiAvatar} />
          </Grid>
          <Grid item xs={9}>
            <Grid container direction="column" justify="space-around" alignItems="flex-start" spacing={1}>
              <Grid item>
                <Typography>You got a new message from User Walter White</Typography>
              </Grid>
              <Grid item>
                <Typography color="secondary" className={classes.notificationTime}>
                  1 day ago
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <div className={classes.unReadNotification}></div>
          </Grid>
        </Grid>
      </li>
    </ul>
  );
}
