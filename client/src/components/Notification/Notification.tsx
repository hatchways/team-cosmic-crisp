import { useState } from 'react';
import { Button, ClickAwayListener } from '@material-ui/core';
import useStyles from './useStyles';
import useNavBarStyles from '../Navbar/useStyles';
import NotificationDropdown from './NotificationDropdown';
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
      <span className={classes.root} id="product_tour_navigation_button">
        <Button variant="text" className={`${classes.userNavItem}`} onClick={handleClick}>
          Notifications {notifications.length > 0 ? <span className={classes.active} /> : null}
        </Button>
        {open ? <NotificationDropdown /> : null}
      </span>
    </ClickAwayListener>
  );
}
