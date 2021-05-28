import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import { Request } from '../../../interface/Bookings';
import Moment from 'react-moment';
import { Button, Paper, Typography } from '@material-ui/core';
import AvatarDisplay from '../../../components/AvatarDisplay/AvatarDisplay';
import SettingsIcon from '@material-ui/icons/Settings';
import { acceptRequest, declineRequest } from '../../../helpers/APICalls/bookings';

interface Props {
  bookingDetails: Request | undefined;
  changeBooking: (bookingDetails: Request, newBooking: Request) => void;
}

export default function Bookings({ bookingDetails, changeBooking }: Props): JSX.Element {
  const classes = useStyles();
  if (!bookingDetails) return <></>;
  const { _id, start, accepted, declined, sitter, user } = bookingDetails;
  const handleClick = (type: string) => {
    if (type === 'accept')
      acceptRequest(_id).then((data) => {
        if (data.request) changeBooking(bookingDetails, data.request);
      });
    else if (type === 'reject')
      declineRequest(_id).then((data) => {
        if (data.request) changeBooking(bookingDetails, data.request);
      });
  };

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
          {user === undefined && (
            <>
              {!accepted && (
                <Button className={`${classes.button} ${classes.accept}`} onClick={() => handleClick('accept')}>
                  accept
                </Button>
              )}

              <Button className={`${classes.button} ${classes.decline}`} onClick={() => handleClick('reject')}>
                decline
              </Button>
            </>
          )}
        </Grid>
      </Paper>
    </>
  );
}
