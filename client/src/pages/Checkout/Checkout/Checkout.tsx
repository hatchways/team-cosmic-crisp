import { Button, FormGroup, Grid, List, ListItem, TextField, Typography } from '@material-ui/core';
import { FormEvent, FormEventHandler, useState } from 'react';
import useStyles from './useStyles';
import Radio from '@material-ui/core/Radio';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentMethod, StripeError } from '@stripe/stripe-js';

export default function OrderDetails({}): JSX.Element {
  const classes = useStyles();
  const [paymentType, setPaymentType] = useState<string>('card');

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<StripeError | undefined>(undefined);
  const [processing, setProcessing] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(undefined);
  const [billingDetails, setBillingDetails] = useState<{ email: string; phone: string; name: string }>({
    email: '',
    phone: '',
    name: '',
  });

  const CARD_OPTIONS = {
    iconStyle: 'solid',
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
    setProcessing(true);
    const cardElement = elements.getElement('card');
    if (cardElement) {
      const payload = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
      });
      if (payload.error) {
        setError(payload.error);
      } else {
        setPaymentMethod(payload.paymentMethod);
      }
    }
    setProcessing(false);
  };

  const reset = () => {
    setError(undefined);
    setProcessing(false);
    setPaymentMethod(undefined);
    setBillingDetails({
      email: '',
      phone: '',
      name: '',
    });
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
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={billingDetails.email}
                  variant="outlined"
                  type="email"
                  className={classes.input}
                  onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })}
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
                <Button type="submit" variant="outlined" className={classes.submitBtn} size="large" color="primary">
                  Confirm &amp; Pay
                </Button>
              </form>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
