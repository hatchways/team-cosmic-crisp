import { Typography, Paper, Divider } from '@material-ui/core';
import { Notification } from '../../interface/Notification';
import NotificationItem from './NotificationItem';

import useStyles from './useStyles';

interface Props {
  notifications: Notification[];
}

export default function NotificationDropdown({ notifications }: Props): JSX.Element {
  const classes = useStyles();
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
