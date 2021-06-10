import { Box, Typography, Avatar, Grid, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';

import React, { useRef, useState, useEffect } from 'react';
import { uploadPhoto, deletePhotos } from '../../../helpers/APICalls/updatePhotos';

import { useAuth } from '../../../context/useAuthContext';
import updateProfile from '../../../helpers/APICalls/updateProfile';
import { useSnackBar } from '../../../context/useSnackbarContext';

import useStyles from './useStyles';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function UploadPhoto(): JSX.Element {
  const classes = useStyles();
  const inputFile = useRef<HTMLInputElement>(null);
  const { loggedInUserDetails, updateLoggedInUserDetails } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const [raw, setRaw] = useState<File | undefined>(undefined);
  const [url, setURL] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const reader = new FileReader();
    if (!(e.target.files instanceof FileList)) return;

    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = () => {
      if (reader.result) {
        if (!(e.target.files instanceof FileList)) return;
        setRaw(e.target.files[0]);
      }
    };
  };

  //handleUpdateImage function will only re-run if image changes
  useEffect(() => {
    async function handleUpdateImage() {
      const formData = new FormData();
      if (raw) formData.append('photos', raw);

      try {
        const result = await uploadPhoto(formData);
        const photoURL = result?.success?.urlArray[0];
        if (photoURL) {
          setURL(photoURL);
        }
      } catch (error) {
        updateSnackBarMessage(`Error uploading images, ${error}`);
      }
    }
    if (raw) {
      handleUpdateImage();
    }
  }, [raw]);

  //handleUpdateUserProfile function will only re-run if s3Url changes
  useEffect(() => {
    async function handleUpdateUserprofile() {
      const id = loggedInUserDetails ? loggedInUserDetails._id : '';
      try {
        if (type === 'profile') {
          const res = await updateProfile(id, { profilePhoto: url });
          updateLoggedInUserDetails(res);
          updateSnackBarMessage('Profile Image updated');
        } else if (type === 'cover') {
          const res = await updateProfile(id, { coverPhoto: url });
          updateLoggedInUserDetails(res);
          updateSnackBarMessage('Cover Image updated');
        }
        setType('');
        setURL(undefined);
        if (inputFile?.current) inputFile.current.value = '';
      } catch (error) {
        updateSnackBarMessage(`Error updating user profile ${error}`);
      }
    }
    if (type) {
      handleUpdateUserprofile();
    }
  }, [url]);

  const handleDeletePhoto = async (type: string): Promise<void> => {
    const confirmDelete = confirm(`Are you sure you want to delete ${type} photo?`);
    if (!confirmDelete) return;
    try {
      if (type === 'profile') {
        const imageUrl: string =
          loggedInUserDetails && loggedInUserDetails.profilePhoto ? loggedInUserDetails.profilePhoto : '';
        await deletePhotos([imageUrl]);
        const id = loggedInUserDetails ? loggedInUserDetails._id : '';
        const res = await updateProfile(id, { profilePhoto: '' });
        updateLoggedInUserDetails(res);
        updateSnackBarMessage('Profile Image deleted');
      } else if (type === 'cover') {
        const imageUrl: string =
          loggedInUserDetails && loggedInUserDetails.coverPhoto ? loggedInUserDetails.coverPhoto : '';
        await deletePhotos([imageUrl]);
        const id = loggedInUserDetails ? loggedInUserDetails._id : '';
        const res = await updateProfile(id, { coverPhoto: '' });
        updateLoggedInUserDetails(res);
        updateSnackBarMessage('Cover Image deleted');
      }
    } catch (error) {
      updateSnackBarMessage(`Error deleting profile photo ${error}`);
    }
  };

  const handleNewImageButtonClick = (type: string) => {
    if (inputFile.current !== null) {
      setType(type);
      inputFile.current.click();
    }
    setCoverPhotoMenu(null);
    setProfilePhotoMenu(null);
  };

  // menu functions
  const [coverPhotoMenu, setCoverPhotoMenu] = useState<null | HTMLElement>(null);
  const [profilePhotoMenu, setProfilePhotoMenu] = useState<null | HTMLElement>(null);
  const handleCloseCoverMenu = () => {
    setCoverPhotoMenu(null);
  };
  const handleCloseProfileMenu = () => {
    setProfilePhotoMenu(null);
  };

  const handleClickCoverMenu = (event: React.MouseEvent<HTMLElement>) => {
    setCoverPhotoMenu(event.currentTarget);
  };
  const handleClickProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setProfilePhotoMenu(event.currentTarget);
  };

  return (
    <Box>
      <Typography variant="h4" align="center" className={classes.formTitle}>
        Profile Photo
      </Typography>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: 'none' }}
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleImageChange(e)}
      />
      <Grid container direction="column" alignItems="center" spacing={4}>
        <Grid item className={classes.imagesContainer}>
          <Grid item className={classes.imageContainer}>
            <Grid onClick={handleClickCoverMenu}>
              <AddAPhotoIcon className={`${classes.addPhotoIcon} addPhotoIcon`} />
            </Grid>
            {loggedInUserDetails?.coverPhoto && (
              <img
                src={loggedInUserDetails?.coverPhoto}
                alt="cover pic"
                className={classes.coverPhoto}
                onClick={handleClickCoverMenu}
              />
            )}

            <Menu
              id="user-menu"
              anchorEl={coverPhotoMenu}
              keepMounted
              open={Boolean(coverPhotoMenu)}
              onClose={handleCloseCoverMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <MenuItem className={classes.menuItem} onClick={() => handleNewImageButtonClick('cover')}>
                <ListItemIcon>
                  <AddAPhotoIcon />
                </ListItemIcon>
                <ListItemText primary="New Cover Image" />
              </MenuItem>
              {loggedInUserDetails?.coverPhoto && (
                <MenuItem className={classes.menuItem} onClick={() => handleDeletePhoto('cover')}>
                  <ListItemIcon>
                    <DeleteForeverIcon />
                  </ListItemIcon>
                  <ListItemText primary="Delete Cover Image" />
                </MenuItem>
              )}
            </Menu>
          </Grid>
          <Grid className={classes.avatarContainer}>
            <Grid onClick={handleClickProfileMenu}>
              <AddAPhotoIcon className={`${classes.addPhotoIcon} addPhotoIcon`} />
            </Grid>
            <Avatar
              alt="Profile picture"
              src={loggedInUserDetails?.profilePhoto}
              className={classes.avatar}
              onClick={handleClickProfileMenu}
            />

            <Menu
              id="user-menu"
              anchorEl={profilePhotoMenu}
              keepMounted
              open={Boolean(profilePhotoMenu)}
              onClose={handleCloseProfileMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <MenuItem className={classes.menuItem} onClick={() => handleNewImageButtonClick('profile')}>
                <ListItemIcon>
                  <AddAPhotoIcon />
                </ListItemIcon>
                <ListItemText primary="New Profile Photo" />
              </MenuItem>
              {loggedInUserDetails?.profilePhoto && (
                <MenuItem className={classes.menuItem} onClick={() => handleDeletePhoto('profile')}>
                  <ListItemIcon>
                    <DeleteForeverIcon />
                  </ListItemIcon>
                  <ListItemText primary=" Delete Profile Photo" />
                </MenuItem>
              )}
            </Menu>
          </Grid>
        </Grid>
        <Grid item>
          <Typography align="center" color="secondary" className={classes.uploadMessage}>
            Be sure to use a photo that clearly shows your face
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
