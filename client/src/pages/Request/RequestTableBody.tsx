import { TableBody, TableRow, TableCell, Chip, Grid, Avatar, Typography } from '@material-ui/core';

import RequestModal from './RequestModal';
import { Request } from '../../interface/Bookings';
import { Profile } from '../../interface/Profile';
import { getRequests } from '../../helpers/APICalls/bookings';
import moment from 'moment';

import { useState, useEffect } from 'react';

import useStyles from './useStyles';

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
  }, []);

  function checkLabel(accepted: boolean, declined: boolean): JSX.Element {
    return accepted ? (
      <Chip color="primary" label="Accepted" />
    ) : declined ? (
      <Chip color="secondary" label="Declined" />
    ) : (
      <Chip label="Pending" />
    );
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
              <RequestModal request={request} />
            </TableRow>
          ))
        : null}
    </TableBody>
  );
}
