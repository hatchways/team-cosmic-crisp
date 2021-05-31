import Grid from '@material-ui/core/Grid';
import useStyles from './useStyles';
import { Typography, List, ListItem, Divider, Button, Avatar } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, TimePicker } from '@material-ui/pickers';
import Rating from '@material-ui/lab/Rating';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface Props {
  userProfile: {
    firstName: string;
    lastName: string;
    profilePhoto: string;
    price: number;
    rating: number;
  };
  startDate: Date | null;
  endDate: Date | null;
  totalHours: number;
  subTotal: number;
  serviceFee: number;
  setStartDate: (date: MaterialUiPickersDate) => void;
  setEndDate: (date: MaterialUiPickersDate) => void;
  checkout: () => void;
}

export default function OrderDetails({
  userProfile,
  startDate,
  endDate,
  totalHours,
  subTotal,
  serviceFee,
  setStartDate,
  setEndDate,
  checkout,
}: Props): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <Grid container direction="row" className={classes.order}>
        <Grid className={classes.orderDetailsContainer}>
          <Typography variant="h4">Customise Your Order</Typography>
          <Grid container justify="space-between" className={classes.orderDetails}>
            <Grid>
              <Grid container>
                <Avatar alt="sitter" src={userProfile.profilePhoto} className={classes.avatar} />
                <Grid>
                  <Typography
                    className={classes.userName}
                  >{`${userProfile.firstName} ${userProfile.lastName}`}</Typography>
                  <Typography component="legend">{`Hourly Rate: $${userProfile.price}`}</Typography>
                  <Grid container alignItems="center">
                    <Typography component="legend">Ratings:</Typography>
                    <Rating size="large" readOnly value={userProfile.rating} precision={0.2} />
                    <Typography>{userProfile.rating}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container direction="column">
                  <Grid>
                    <Typography variant="body1">DROP-IN</Typography>
                    <KeyboardDatePicker
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      format="MM/dd/yyyy"
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      InputAdornmentProps={{ position: 'start' }}
                    />
                    <TimePicker
                      variant="inline"
                      inputVariant="outlined"
                      value={startDate}
                      onChange={(time) => setStartDate(time)}
                    />
                  </Grid>
                  <Grid>
                    <Typography variant="body1">DROP-OFF</Typography>
                    <KeyboardDatePicker
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      format="MM/dd/yyyy"
                      value={endDate}
                      onChange={(date) => setEndDate(date)}
                      InputAdornmentProps={{ position: 'start' }}
                    />

                    <TimePicker
                      variant="inline"
                      inputVariant="outlined"
                      value={endDate}
                      onChange={(time) => setEndDate(time)}
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <List component="ul" className={classes.summaryList}>
            <ListItem>
              <Typography variant="h6">Summary</Typography>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Typography component="legend">Total Hours</Typography> {totalHours}
            </ListItem>
            <ListItem className={classes.listItem}>
              <Typography component="legend">Price</Typography> ${userProfile.price}/hr
            </ListItem>
            <ListItem className={classes.listItem}>
              <Typography component="legend">Subtotal</Typography> ${subTotal}
            </ListItem>
            <ListItem className={classes.listItem}>
              <Typography component="legend">Service Fee</Typography> ${serviceFee}
            </ListItem>
            <Divider />
            <ListItem className={classes.listItem}>
              <Typography component="legend">Total</Typography> ${serviceFee + subTotal}
            </ListItem>
            <ListItem>
              <Button
                size="large"
                variant="outlined"
                color="primary"
                className={classes.checkoutBtn}
                onClick={checkout}
              >
                Continue to Payment
              </Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}
