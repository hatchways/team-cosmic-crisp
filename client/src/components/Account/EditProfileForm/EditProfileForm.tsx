import { Box, Button, Grid, Typography, TextField } from '@material-ui/core';

import useStyles from './useStyles';
import CustomTextField from './CustomTextField';

import React, { useState } from 'react';

export default function EditProfileForm(): JSX.Element {
  const classes = useStyles();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    description: '',
  });
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    property: string,
  ): void => {
    setProfile({ ...profile, [property]: e.target.value });
  };

  const toggleInput = () => setShowPhoneInput(!showPhoneInput);

  return (
    <Box>
      <Typography variant="h4" align="center" className={classes.formTitle}>
        Edit Profile
      </Typography>
      <form>
        <Grid container spacing={3}>
          <CustomTextField
            onChange={(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e, 'firstName')
            }
            value={profile.firstName}
            label="FIRST NAME"
            placeholder="First Name"
          />
          <CustomTextField
            onChange={(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e, 'lastName')
            }
            value={profile.lastName}
            label="LAST NAME"
            placeholder="Last Name"
          />
          <CustomTextField
            onChange={(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e, 'email')
            }
            value={profile.email}
            label="EMAIL ADDRESS"
            placeholder="user@gmail.com"
          />
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" align="right" className={classes.formLabel}>
                  PHONE NUMBER
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} className={`${showPhoneInput && classes.shouldNotDisplay}`}>
                <Typography align="left" variant="body1" className={classes.phoneNumber}>
                  No Phone number entered
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} className={`${showPhoneInput && classes.shouldNotDisplay}`}>
                <Button color="primary" variant="outlined" size="large" onClick={toggleInput}>
                  Add a phone number
                </Button>
              </Grid>
              <Grid item xs={12} sm={8} className={`${!showPhoneInput && classes.shouldNotDisplay}`}>
                <TextField label="Phone Number" value="" color="secondary" variant="outlined" fullWidth />
              </Grid>
            </Grid>
          </Grid>
          <CustomTextField
            onChange={(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e, 'address')
            }
            value={profile.address}
            label="WHERE YOU LIVE"
            placeholder="Joe"
          />
          <CustomTextField
            onChange={(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e, 'description')
            }
            value={profile.description}
            multiline={true}
            rows={5}
            label="DESCRIBE YOURSELF"
            placeholder="About you"
          />
        </Grid>
        <Box textAlign="center">
          <Button color="primary" variant="contained" size="large" className={classes.button}>
            SAVE
          </Button>
        </Box>
      </form>
    </Box>
  );
}
