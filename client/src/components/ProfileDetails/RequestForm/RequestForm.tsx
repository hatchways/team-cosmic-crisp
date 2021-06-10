import { useState } from 'react';
import { Box, Button, CircularProgress, Fade, Grid, Paper, Typography } from '@material-ui/core';
import { KeyboardDatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Rating from '@material-ui/lab/Rating';
import DateFnsUtils from '@date-io/date-fns';
import { Link } from 'react-router-dom';

import { Profile } from '../../../interface/Profile';
import useStyles from './useStyles';
import { postRequest } from '../../../helpers/APICalls/bookings';
import { useAuth } from '../../../context/useAuthContext';
import { useMessages } from '../../../context/useMessageContext';
import { createConversation } from '../../../helpers/APICalls/messages';
import { useHistory } from 'react-router-dom';

export interface Props {
  sitter: Profile | null | undefined;
}

export default function RequestForm({ sitter }: Props): JSX.Element {
  const { loggedInUser } = useAuth();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(tomorrow);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const classes = useStyles();

  const { loggedInUserDetails } = useAuth();
  const { addConversation } = useMessages();
  const history = useHistory();

  const handleSubmit = () => {
    setLoading(true);
    if (sitter) {
      postRequest(sitter._id, startDate, endDate).then((data) => {
        setSuccess(true);
      });
    }
    setLoading(false);
  };

  const sendMessage = () => {
    if (loggedInUserDetails && sitter)
      createConversation(loggedInUserDetails?._id, sitter?._id).then((res) => {
        if (res.success) {
          addConversation(res.success.conversation);
          history.push(`/messages/${res.success.conversation.conversationId}`);
        }
      });
  };

  return (
    <>
      {sitter && (
        <Fade in={true}>
          <Paper elevation={6} className={classes.requestContainer}>
            <Box textAlign="center">
              <Typography align="center" variant="body1" className={classes.price}>
                ${sitter.price}/hr
              </Typography>
              <Rating value={4.5} precision={0.5} readOnly />
            </Box>
            <Box className={classes.dateContainer}>
              <Typography variant="body1" className={classes.title}>
                DROP-IN
              </Typography>
              <Grid container>
                <Grid item xs={8}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      color="secondary"
                      variant="inline"
                      inputVariant="outlined"
                      format="MM/dd/yyyy"
                      value={startDate}
                      InputAdornmentProps={{ position: 'start' }}
                      onChange={(date) => date && setStartDate(date)}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker
                      autoOk
                      color="secondary"
                      variant="inline"
                      inputVariant="outlined"
                      value={startDate}
                      onChange={(time) => time && setStartDate(time)}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <Typography variant="body1" className={classes.title}>
                DROP-OFF
              </Typography>
              <Grid container>
                <Grid item xs={8}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      color="secondary"
                      variant="inline"
                      inputVariant="outlined"
                      format="MM/dd/yyyy"
                      value={endDate}
                      InputAdornmentProps={{ position: 'start' }}
                      onChange={(date) => date && setEndDate(date)}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker
                      autoOk
                      color="secondary"
                      variant="inline"
                      inputVariant="outlined"
                      value={endDate}
                      onChange={(time) => time && setEndDate(time)}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              {/*Show send request button only if user is logged in*/}
              {loggedInUser ? (
                <Box textAlign="center">
                  {!success ? (
                    <Button variant="contained" color="primary" className={classes.submitBtn} onClick={handleSubmit}>
                      {loading ? <CircularProgress /> : 'Send Request'}
                    </Button>
                  ) : (
                    <>
                      {success && (
                        <Typography component="span" variant="subtitle1">
                          Request sent click pay now to continue
                        </Typography>
                      )}
                      <Link
                        to={{
                          pathname: '/checkout',
                          state: {
                            sitter: sitter._id,
                            startDate,
                            endDate,
                          },
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.submitBtn}
                          onClick={handleSubmit}
                        >
                          Pay now
                        </Button>
                      </Link>
                    </>
                  )}
                </Box>
              ) : (
                <Box textAlign="center" className={classes.signInContainer}>
                  <Typography variant="body1" className={classes.signInTitle}>
                    Please &nbsp;
                    <Link to="/login">Sign In</Link>
                    &nbsp; to send a Request!
                  </Typography>
                </Box>
              )}
              <Box textAlign="center">
                {!success ? (
                  <Button variant="contained" color="primary" className={classes.submitBtn} onClick={handleSubmit}>
                    {loading ? <CircularProgress /> : 'Send Request'}
                  </Button>
                ) : (
                  <>
                    {success && (
                      <Typography component="span" variant="subtitle1">
                        Request sent click pay now to continue
                      </Typography>
                    )}
                    <Link
                      to={{
                        pathname: '/checkout',
                        state: {
                          sitter: sitter._id,
                          startDate,
                          endDate,
                        },
                      }}
                    >
                      <Button variant="contained" color="primary" className={classes.submitBtn} onClick={handleSubmit}>
                        Pay now
                      </Button>
                    </Link>
                  </>
                )}
                <Button variant="contained" color="primary" className={classes.submitBtn} onClick={sendMessage}>
                  Message
                </Button>
              </Box>
            </Box>
          </Paper>
        </Fade>
      )}
    </>
  );
}
