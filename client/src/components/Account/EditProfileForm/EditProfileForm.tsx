import { Box, Button, Grid, Typography, TextField } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';

import useStyles from './useStyles';
import CustomTextField from './CustomTextField';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';

import updateProfile from '../../../helpers/APICalls/updateProfile';
import { OwnerFormProfile } from '../../../interface/Profile';

export default function EditProfileForm(): JSX.Element {
  const classes = useStyles();
  const { loggedInUserDetails, updateLoggedInUserDetails } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const [profile, setProfile] = useState<OwnerFormProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    description: '',
  });
  useEffect(() => {
    if (loggedInUserDetails !== undefined) {
      setProfile({
        ...profile,
        firstName: loggedInUserDetails?.firstName,
        lastName: loggedInUserDetails?.lastName,
        email: loggedInUserDetails?.email,
        phoneNumber: loggedInUserDetails?.phoneNumber,
        address: loggedInUserDetails?.address,
        description: loggedInUserDetails?.description,
      });
    }
  }, [loggedInUserDetails]);

  const [showPhoneInput, setShowPhoneInput] = useState(!profile?.phoneNumber ? true : false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    property: string,
  ): void => {
    setProfile({ ...profile, [property]: e.target.value });
  };

  const toggleInput = () => setShowPhoneInput(!showPhoneInput);

  const handleSaveProfile = async () => {
    const id = loggedInUserDetails ? loggedInUserDetails._id : '';
    try {
      const res = await updateProfile(id, profile);
      updateLoggedInUserDetails(res);
      updateSnackBarMessage('Profie updated');
    } catch (error) {
      updateSnackBarMessage(`Error updating user profile ${error}`);
    }
  };

  return (
    <Box>
      <Typography variant="h4" align="center" className={classes.formTitle}>
        Edit Profile
      </Typography>
      <form>
        <Grid container spacing={3}>
          <CustomTextField
            onChange={(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void =>
              handleChange(e, 'firstName')
            }
            value={profile.firstName ? profile.firstName : ''}
            label="first name"
            placeholder="First Name"
          />
          <CustomTextField
            onChange={(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e, 'lastName')
            }
            value={profile.lastName ? profile.lastName : ''}
            label="last name"
            placeholder="Last Name"
          />
          <CustomTextField
            onChange={(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e, 'email')
            }
            value={profile.email ? profile.email : ''}
            label="email address"
            placeholder="user@gmail.com"
          />
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" align="right" className={classes.formLabel}>
                  phone number
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} className={`${showPhoneInput ? classes.shouldNotDisplay : ''}`}>
                <Typography align="left" variant="body1" className={classes.phoneNumber}>
                  No Phone number entered
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} className={`${showPhoneInput ? classes.shouldNotDisplay : ''}`}>
                <Button color="primary" variant="outlined" size="large" onClick={toggleInput}>
                  Add a phone number
                </Button>
              </Grid>
              <Grid item xs={12} sm={8} className={`${!showPhoneInput ? classes.shouldNotDisplay : ''}`}>
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
            label="where you live"
            placeholder="Address"
          />
          <CustomTextField
            onChange={(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e, 'description')
            }
            value={profile.description ? profile.description : ''}
            multiline={true}
            rows={5}
            label="describe yourself"
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
