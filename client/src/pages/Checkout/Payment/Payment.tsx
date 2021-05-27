import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { FormEvent, useState } from 'react';
import useStyles from './useStyles';
import Radio from '@material-ui/core/Radio';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentMethod } from '@stripe/stripe-js';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { CircularProgress } from '@material-ui/core';

interface Props {
  userProfile: {
    id: string;
  };
  hours: number;
  requestId: string;
}

type Responce = {
  error?: { message: string };
  success?: boolean;
  requires_action?: boolean;
  payment_intent_client_secret?: string;
};

export default function Payment({ userProfile, hours, requestId }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const [paymentType, setPaymentType] = useState<string>('card');

  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState<boolean>(false);
  const [billingDetails, setBillingDetails] = useState<{ email: string; phone: string; name: string }>({
    email: '',
    phone: '',
    name: '',
  });

  const CARD_OPTIONS = {
    iconStyle: 'solid' as const,
    style: {
      base: {
        iconColor: '#F04040',
        color: '#000',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: '#fce883',
        },
        '::placeholder': {
          color: '#A9A9A9',
        },
      },
      invalid: {
        iconColor: '#A9A9A9',
        color: '#A9A9A9',
      },
    },
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    if (!billingDetails.name || !billingDetails.email) {
      updateSnackBarMessage('Please enter proper name and email');
      return;
    }
    setProcessing(true);
    const cardElement = elements.getElement('card');
    if (cardElement) {
      const payload = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
      });
      if (payload.error) {
        updateSnackBarMessage(payload.error.message || 'Something went wrong Please try again');
      } else {
        await stripePaymentMethodHandler(payload.paymentMethod);
      }
    }
    setProcessing(false);
  };

  const stripePaymentMethodHandler = async (paymentMethod: PaymentMethod) => {
    const res = await fetch(`/requests/${requestId}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payment_method_id: paymentMethod.id,
        sitter: userProfile.id,
        hours,
      }),
    });
    const paymentResponse = await res.json();

    // Handle server response
    handleServerResponse(paymentResponse);
  };

  const handleServerResponse = async (response: Responce) => {
    if (response.error) {
      updateSnackBarMessage(response.error.message);
    } else if (response.requires_action && stripe && response.payment_intent_client_secret) {
      // Use Stripe.js to handle the required card action
      const { error: errorAction, paymentIntent } = await stripe.handleCardAction(
        response.payment_intent_client_secret,
      );

      if (errorAction) {
        updateSnackBarMessage('Someting went wrong please try again');
        // updateSnackBarMessage(errorAction);
      } else if (paymentIntent) {
        // The card action has been handled
        // The PaymentIntent can be confirmed again on the server
        const serverResponse = await fetch(`/requests/${requestId}/pay`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payment_intent_id: paymentIntent.id }),
        });
        handleServerResponse(await serverResponse.json());
      }
    } else {
      updateSnackBarMessage('Payment success');
      resetForm();
    }
  };

  const resetForm = () => {
    setProcessing(false);
    setBillingDetails({
      email: '',
      phone: '',
      name: '',
    });
    elements?.getElement('card')?.clear();
  };

  return (
    <>
      <Grid>
        <Typography variant="h4">Checkout</Typography>
        <Grid container direction="column" className={classes.paymentContainer}>
          <Grid>
            <Typography variant="h6">Payment Options</Typography>
          </Grid>
          <Grid>
            <Grid container alignItems="center">
              <Radio
                checked={paymentType === 'card'}
                onChange={(e) => setPaymentType(e.target.value)}
                value="card"
                className={classes.radioBtn}
                color="primary"
              />
              <Typography component="legend">Credit &amp; Debit Card</Typography>
            </Grid>
            {paymentType === 'card' && (
              <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={billingDetails.name}
                  variant="outlined"
                  className={classes.input}
                  onChange={(e) => setBillingDetails({ ...billingDetails, name: e.target.value })}
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={billingDetails.email}
                  variant="outlined"
                  type="email"
                  className={classes.input}
                  onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })}
                  required
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={billingDetails.phone}
                  variant="outlined"
                  className={classes.input}
                  onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })}
                />
                <CardElement options={CARD_OPTIONS} className={classes.cardElement} />
                <Button type="submit" variant="contained" className={classes.submitBtn} size="large" color="primary">
                  {processing ? <CircularProgress style={{ color: 'white' }} /> : 'Confirm & Pay'}
                </Button>
              </form>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
