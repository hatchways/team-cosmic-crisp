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
import { useAuth } from '../../context/useAuthContext';
import { createNotificationData } from '../../interface/Notification';
import { useSocket } from '../../context/useSocketContext';

interface Props {
  request: Request;
  updateRequest: (newRequest: Request) => void;
}

export default function RequestModal({ request, updateRequest }: Props): JSX.Element {
  const classes = useStyles();
  const { createNotification, loggedInUserDetails } = useAuth();

  const [open, setOpen] = useState(false);
  const { start, end, _id } = request;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { socket } = useSocket();

  const calcHours = (start: Date, end: Date): number => {
    const startDate = moment(start);
    const endDate = moment(end);
    return endDate.diff(startDate, 'hours');
  };

  const handleDecline = (): void => {
    declineRequest(_id).then((data) => {
      if (data.request) {
        updateRequest(data.request);
        console.log(data);
        if (request && request.user) {
          const receiverNotification: createNotificationData = {
            types: 'default',
            description: `You request to ${loggedInUserDetails?.firstName} ${loggedInUserDetails?.lastName} has been declined!`,
            targetProfileId: '',
            targetUserId: data.request.user,
          };
          createNotification(receiverNotification);
          //send notification to user
          socket?.emit('send-notification', { ...receiverNotification, recipient: data?.request.sitter?._id });
        }
        handleClose();
      }
    });
  };
  const handleAccept = (): void => {
    acceptRequest(_id).then((data) => {
      if (data.request) {
        updateRequest(data.request);
        if (request && request.user) {
          const receiverNotification: createNotificationData = {
            types: 'default',
            description: `You request to ${loggedInUserDetails?.firstName} ${loggedInUserDetails?.lastName} has been accepted!`,
            targetProfileId: '',
            targetUserId: data.request.user,
          };
          createNotification(receiverNotification);
          //send notification to user
          socket?.emit('send-notification', { ...receiverNotification, recipient: data?.request.sitter?._id });
        }
        handleClose();
      }
    });
  };

  return (
    <TableCell align="center">
      <Button onClick={handleClickOpen} disabled={request.paid}>
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
