import { Paper, TableContainer, Table, Grid, Typography } from '@material-ui/core';
import useStyles from './useStyles';

import RequestTableHead from './RequestTableHead';
import RequestTableBody from './RequestTableBody';

export default function JobRequest(): JSX.Element {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" className={classes.tableName}>
            Sitting Requests
          </Typography>
        </Grid>
        <Grid item>
          <TableContainer>
            <Table>
              <RequestTableHead />
              <RequestTableBody />
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
}
