import { TableBody, TableRow, TableCell, Chip, Grid, Avatar, Typography } from '@material-ui/core';

import RequestModal from './RequestModal';

import useStyles from './useStyles';

function OwnerInfo(): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      <Avatar alt="avatar" src="" className={classes.userAvatar} />
      <Typography className={classes.userDisplayName}>Joe Snow</Typography>
    </Grid>
  );
}

export default function RequestTableBody(): JSX.Element {
  return (
    <TableBody>
      <TableRow>
        <TableCell align="center">
          <OwnerInfo />
        </TableCell>
        <TableCell align="center">
          <Chip label="Pending" />
        </TableCell>
        <TableCell align="center">$35</TableCell>
        <TableCell align="center">2 days ago</TableCell>
        <RequestModal />
      </TableRow>
    </TableBody>
  );
}
