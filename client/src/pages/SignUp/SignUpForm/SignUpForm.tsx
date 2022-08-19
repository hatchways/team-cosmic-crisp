import { Box, Button, CircularProgress, Typography, TextField } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import useStyles from './useStyles';
import DemoButton from '../../../components/DemoButton/DemoButton';

interface Props {
  handleSubmit: (
    {
      firstName,
      lastName,
      email,
      password,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }>,
  ) => void;
}

const SignUpForm = ({ handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().required('Email is required').email('Email is not valid'),
        password: Yup.string()
          .required('Password is required')
          .max(100, 'Password is too long')
          .min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting, setFieldValue }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Typography className={classes.label}>First Name</Typography>
          <TextField
            id="firstName"
            color="secondary"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="firstName"
            autoComplete="firstName"
            autoFocus
            helperText={touched.firstName ? errors.firstName : ''}
            error={touched.firstName && Boolean(errors.firstName)}
            value={values.firstName}
            onChange={handleChange}
            variant="outlined"
            placeholder="Your first name"
          />
          <Typography className={classes.label}>Last Name</Typography>
          <TextField
            id="lastName"
            color="secondary"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="lastName"
            autoComplete="lastName"
            autoFocus
            helperText={touched.lastName ? errors.lastName : ''}
            error={touched.lastName && Boolean(errors.lastName)}
            value={values.lastName}
            onChange={handleChange}
            variant="outlined"
            placeholder="Your last name"
          />
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
            }}
            type="password"
            autoComplete="current-password"
            helperText={touched.password ? errors.password : ''}
            error={touched.password && Boolean(errors.password)}
            value={values.password}
            onChange={handleChange}
            variant="outlined"
            placeholder="Choose password"
          />

          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Create'}
            </Button>

            <DemoButton classes={classes} />
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
