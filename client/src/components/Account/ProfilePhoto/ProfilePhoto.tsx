import { Box, Typography, Avatar, Grid, Button, FormControl } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import React, { useRef, useState, useEffect } from 'react';
import { uploadPhoto, deletePhotos } from '../../../helpers/APICalls/updatePhotos';

import { useAuth } from '../../../context/useAuthContext';
import updateProfile from '../../../helpers/APICalls/updateProfile';
import { useSnackBar } from '../../../context/useSnackbarContext';

import useStyles from './useStyles';
import temp_photo from '../../../Images/temporary-profile-placeholder.jpeg';

interface Image {
  preview: string;
  raw: File;
}

export default function UploadPhoto(): JSX.Element {
  const classes = useStyles();
  const inputFile = useRef<HTMLInputElement>(null);
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const onButtonClick = () => {
    if (inputFile.current !== null) {
      inputFile.current.click();
    }
  };
  const profile_url =
    loggedInUser && loggedInUser.profile.profilePhoto ? loggedInUser.profile.profilePhoto : temp_photo;
  const [image, setImage] = useState<Image>({ preview: profile_url, raw: '' as unknown as File });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const reader = new FileReader();
    if (!(e.target.files instanceof FileList)) return;

    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = () => {
      if (reader.result) {
        if (!(e.target.files instanceof FileList)) return;
        setImage({ preview: reader.result as string, raw: e.target.files[0] });
      }
    };
  };
  useEffect(() => {
    async function uploadImage() {
      const formData = new FormData();
      formData.append('photos', image.raw);
      let profileUrl: string | undefined = '';
      try {
        const result = await uploadPhoto(formData);
        profileUrl = result?.success?.urlArray[0];
      } catch (error) {
        updateSnackBarMessage(`Error uploading images, ${error}`);
      }
      const id = loggedInUser ? loggedInUser?.profile._id : '';
      try {
        await updateProfile(id, { profilePhoto: profileUrl });
        updateSnackBarMessage('Image updated');
      } catch (error) {
        updateSnackBarMessage(`Error updating user profile ${error}`);
      }
    }
    uploadImage();
  }, [image]);

  const handleDeletePhoto = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    try {
      const imageUrl: string =
        loggedInUser && loggedInUser.profile.profilePhoto ? loggedInUser.profile.profilePhoto : '';
      const id = loggedInUser ? loggedInUser.profile._id : '';
      await deletePhotos([imageUrl]);
      await updateProfile(id, { profilePhoto: undefined });
      updateSnackBarMessage('Profile photo deleted');
    } catch (error) {
      updateSnackBarMessage(`Error deleting profile photo ${error}`);
    }
  };

  return (
    <Box>
      <Typography variant="h4" align="center" className={classes.formTitle}>
        Profile Photo
      </Typography>
      <Grid container direction="column" alignItems="center" spacing={4}>
        <Grid item>
          <Avatar alt="Profile picture" src={image.preview} className={classes.large} />
        </Grid>
        <Grid item>
          <Typography align="center" color="secondary" className={classes.uploadMessage}>
            Be sure to use a photo that clearly shows your face
          </Typography>
        </Grid>
        <Grid item>
          <FormControl>
            <Grid container direction="column" spacing={3} alignItems="center">
              <Grid item>
                <Button color="primary" variant="outlined" size="large" onClick={onButtonClick}>
                  <Box px={2} py={1}>
                    <input
                      type="file"
                      id="file"
                      ref={inputFile}
                      style={{ display: 'none' }}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleImageChange(e)}
                    />
                    Upload a file from your device
                  </Box>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  onClick={handleDeletePhoto}
                  startIcon={<DeleteIcon style={{ color: 'black' }} />}
                >
                  Delete Photo
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
