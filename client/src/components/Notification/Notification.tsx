import { useState } from 'react';
import { Button, ClickAwayListener } from '@material-ui/core';
import useStyles from './useStyles';
import useNavBarStyles from '../Navbar/useStyles';
import NotificationItem from './NotificationItem';

export default function Notification(): JSX.Element {
  const classes = { ...useStyles(), ...useNavBarStyles() };
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <span className={classes.root}>
        <Button variant="text" className={`${classes.userNavItem}`} onClick={handleClick}>
          Notifications <span className={classes.active} />
        </Button>
        {open ? (
          <div className={classes.dropdown}>
            <NotificationItem />
          </div>
        ) : null}
      </span>
    </ClickAwayListener>
  );
}
