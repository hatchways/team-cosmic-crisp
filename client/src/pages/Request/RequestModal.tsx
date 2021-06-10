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
import { Request } from '../../interface/Bookings';
import useStyles from './useStyles';
import moment from 'moment';
import { acceptRequest, declineRequest } from '../../helpers/APICalls/bookings';

interface Props {
  request: Request;
  updateRequest: (newRequest: Request) => void;
}

export default function RequestModal({ request, updateRequest }: Props): JSX.Element {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const { start, end, _id } = request;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const calcHours = (start: Date, end: Date): number => {
    const startDate = moment(start);
    const endDate = moment(end);
    return endDate.diff(startDate, 'hours');
  };

  const handleDecline = (): void => {
    declineRequest(_id).then((data) => {
      if (data.request) {
        updateRequest(data.request);
        handleClose();
      }
    });
  };
  const handleAccept = (): void => {
    acceptRequest(_id).then((data) => {
      if (data.request) {
        updateRequest(data.request);
        handleClose();
      }
    });
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
        <DialogTitle id="alert-dialog-title">{`Accept ${request.sitter?.firstName}'s Request?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span className={classes.dialogText}>{request.sitter?.firstName} </span>
            requested<span className={classes.dialogText}> {calcHours(start, end)} </span>hours of dog sitting starting
            from
            <span className={classes.dialogText}> {moment(start).format('h:mm a, MMM Do YYYY')}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDecline} color="primary">
            Decline
          </Button>
          <Button onClick={handleAccept} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </TableCell>
  );
}