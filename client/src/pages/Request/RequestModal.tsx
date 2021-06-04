import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './useStyles';

export default function RequestModal(): JSX.Element {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableCell align="center">
      <Button onClick={handleClickOpen}>
        <MoreVertIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Accept User's Request? "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            User Alex is requesting 2 hours of dog sitting on June 11, 2021
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Decline
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </TableCell>
  );
}
