import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';

interface Props {
  handleSubmit: (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
    }>,
  ) => void;
}

export default function Login({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();

  const loginDemoUser = async (
    setFeildValue: (field: string, value: string, shouldValidate?: boolean | undefined) => void,
    // eslint-disable-next-line
    submitForm: (() => Promise<void>) & (() => Promise<any>),
  ) => {
    setFeildValue('email', 'guest@example.com');
    setFeildValue('password', '123456');
    submitForm();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is not valid'),
        password: Yup.string()
          .required('Password is required')
          .max(100, 'Password is too long')
          .min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting, setFieldValue, submitForm }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Typography className={classes.label}>E-mail address</Typography>
          <TextField
            id="email"
            color="secondary"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="email"
            autoComplete="email"
            autoFocus
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            onChange={handleChange}
            variant="outlined"
            placeholder="Your email"
          />
          <Typography className={classes.label}>Password</Typography>
          <TextField
            id="password"
            color="secondary"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
              endAdornment: <Typography className={classes.forgot}>Forgot?</Typography>,
            }}
            type="password"
            autoComplete="current-password"
            helperText={touched.password ? errors.password : ''}
            error={touched.password && Boolean(errors.password)}
            value={values.password}
            onChange={handleChange}
            variant="outlined"
            placeholder="Your password"
          />
          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Login'}
            </Button>
            <Button
              size="large"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => loginDemoUser(setFieldValue, submitForm)}
            >
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Demo Login'}
            </Button>
          </Box>
          {/* <div style={{ height: 95 }} /> */}
        </form>
      )}
    </Formik>
  );
}
