import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import { Request } from '../../../interface/Bookings';
import Moment from 'react-moment';
import { Button, Paper, Typography } from '@material-ui/core';
import AvatarDisplay from '../../../components/AvatarDisplay/AvatarDisplay';
import SettingsIcon from '@material-ui/icons/Settings';

interface Props {
  bookingDetails: Request | undefined;
}

export default function Bookings({ bookingDetails }: Props): JSX.Element {
  const classes = useStyles();
  if (!bookingDetails) return <></>;
  const { start, accepted, declined, sitter } = bookingDetails;
  return (
    <>
      <CssBaseline />
      <Paper elevation={0} className={classes.root}>
        <Grid container justify="space-between" className={classes.dateContainer}>
          <Typography component="span" className={classes.date}>
            <Moment date={start} interval={0} format="D MMM, YYYY" /> <Moment date={start} interval={0} format="LT" />
          </Typography>
          <SettingsIcon className={classes.settingsIcon} />
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
          wrap="nowrap"
          className={classes.bookingDetails}
        >
          <Grid container alignItems="center" className={classes.sitterDetailsContainer}>
            <AvatarDisplay src={sitter?.profilePhoto} />
            <Typography component="span" className={classes.sitterName}>
              {`${sitter?.firstName} ${sitter?.lastName}`}
            </Typography>
          </Grid>
          <Button size="large" disabled className={classes.button}>
            {accepted ? 'accepted' : declined ? 'declined' : 'pending'}
          </Button>
        </Grid>
      </Paper>
    </>
  );
}
