import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Grid,
  Typography,
  Avatar,
  Chip,
} from '@material-ui/core';
import useStyles from './useStyles';

import RequestModal from './RequestModal';

function OwnerInfo(): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      <Avatar alt="avatar" src="" className={classes.userAvatar} />
      <Typography className={classes.userDisplayName}>Joe Snow</Typography>
    </Grid>
  );
}

export default function Request(): JSX.Element {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" className={classes.tableName}>
            Requests
          </Typography>
        </Grid>
        <Grid item>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ower Info</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Date created</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
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
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
}
