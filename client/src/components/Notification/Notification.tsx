import { Button } from '@material-ui/core';
import useStyles from './useStyles';
import useNavBarStyles from '../Navbar/useStyles';

export default function Notification(): JSX.Element {
  const classes = { ...useStyles(), ...useNavBarStyles() };
  return (
    <Button variant="text" className={classes.userNavItem}>
      Notifications <span className={classes.active} />
    </Button>
  );
}
