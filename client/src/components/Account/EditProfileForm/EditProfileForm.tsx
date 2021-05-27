import { Box, Button, Grid, Typography, TextField } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';

import useStyles from './useStyles';
import CustomTextField from './CustomTextField';

import React, { useState } from 'react';
import { useAuth } from '../../../context/useAuthContext';

export default function EditProfileForm(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const [profile, setProfile] = useState({
    firstName: loggedInUser?.profile.firstName,
    lastName: loggedInUser?.profile.lastName,
    email: loggedInUser?.email,
    phoneNumber: loggedInUser?.profile.phoneNumber,
    address: loggedInUser?.profile.address,
    description: loggedInUser?.profile.description,
  });
  console.log(profile?.phoneNumber ? 'is true' : 'is false');
  const [showPhoneInput, setShowPhoneInput] = useState(profile?.phoneNumber ? true : false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    property: string,
  ): void => {
    setProfile({ ...profile, [property]: e.target.value });
  };

  const toggleInput = () => setShowPhoneInput(!showPhoneInput);

  const handleSaveProfile = () => {
    console.log('user is ', loggedInUser);
  };

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
            value={profile.firstName ? profile.firstName : ''}
            label="FIRST NAME"
            placeholder="First Name"
          />
          <CustomTextField
            onChange={(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e, 'lastName')
            }
            value={profile.lastName ? profile.lastName : ''}
            label="LAST NAME"
            placeholder="Last Name"
          />
          <CustomTextField
            onChange={(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e, 'email')
            }
            value={profile.email ? profile.email : ''}
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
                <Grow in={showPhoneInput}>
                  <TextField
                    label="Phone Number"
                    value={profile.phoneNumber ? profile.phoneNumber : ''}
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    onChange={(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange(e, 'phoneNumber')
                    }
                  />
                </Grow>
              </Grid>
            </Grid>
          </Grid>
          <CustomTextField
            onChange={(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e, 'address')
            }
            value={profile.address ? profile.address : ''}
            label="WHERE YOU LIVE"
            placeholder="Address"
          />
          <CustomTextField
            onChange={(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e, 'description')
            }
            value={profile.description ? profile.description : ''}
            multiline={true}
            rows={5}
            label="DESCRIBE YOURSELF"
            placeholder="About you"
          />
        </Grid>
        <Box textAlign="center">
          <Button
            color="primary"
            variant="contained"
            size="large"
            className={classes.button}
            onClick={handleSaveProfile}
          >
            SAVE
          </Button>
        </Box>
      </form>
    </Box>
  );
}
