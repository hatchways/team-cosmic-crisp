import { TableBody, TableRow, TableCell, Chip, Grid, Avatar, Typography } from '@material-ui/core';

import RequestModal from './RequestModal';
import { Request } from '../../interface/Bookings';
import { Profile } from '../../interface/Profile';
import { getRequests } from '../../helpers/APICalls/bookings';
import moment from 'moment';

import { useState, useEffect } from 'react';

import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';

interface Props {
  profile: Profile | undefined;
}

function OwnerInfo({ profile }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Avatar alt="avatar" src={profile?.profilePhoto} className={classes.userAvatar} />
      <Typography className={classes.userDisplayName}>{`${profile?.firstName} ${profile?.lastName}`}</Typography>
    </Grid>
  );
}

export default function RequestTableBody(): JSX.Element {
  const { notifications } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await getRequests();
        res && res.requests ? setRequests(res?.requests) : null;
      } catch (error) {
        console.log('error getting requests', error);
      }
    }
    fetchRequests();
  }, [notifications]);

  function checkLabel(accepted: boolean, declined: boolean): JSX.Element {
    return accepted ? (
      <Chip color="primary" label="Accepted" />
    ) : declined ? (
      <Chip color="secondary" label="Declined" />
    ) : (
      <Chip label="Pending" />
    );
  }

  function updateRequest(newRequest: Request): void {
    const newRequests = requests.map((request) => {
      return request._id === newRequest._id ? newRequest : request;
    });
    setRequests(newRequests as Request[]);
  }

  return (
    <TableBody>
      {requests
        ? requests.map((request) => (
            <TableRow key={request._id}>
              <TableCell align="center">
                <OwnerInfo profile={request.sitter} />
              </TableCell>
              <TableCell align="center">{checkLabel(request.accepted, request.declined)}</TableCell>
              <TableCell align="center">{moment(request.start).format('MMMM Do YYYY, h:mm a')}</TableCell>
              <TableCell align="center">{moment(request.start).format('MMMM Do YYYY, h:mm a')}</TableCell>
              <TableCell align="center">
                {request.paid ? <Chip color="primary" label="Paid" /> : <Chip color="secondary" label="Unpaid" />}
              </TableCell>
              <RequestModal request={request} updateRequest={updateRequest} />
            </TableRow>
          ))
        : null}
    </TableBody>
  );
}
