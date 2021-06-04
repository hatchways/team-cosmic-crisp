import { Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Grid } from '@material-ui/core';
import useStyles from './useStyles';

import RequestModal from './RequestModal';
export default function Request(): JSX.Element {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container direction="column" spacing={3}>
        <Grid item>Requests</Grid>
        <Grid item>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Owner Info</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Date created</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Rajiv</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>$35</TableCell>
                  <TableCell>2 days ago</TableCell>
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
