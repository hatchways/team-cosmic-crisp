import { Box, Typography, Avatar, Grid, Button, FormControl } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import React, { useRef, useState } from 'react';

import useStyles from './useStyles';
import profile_url from '../../../Images/b1f0e680702e811aa8ba333cb19c0e0ea95e8e31.png';

//this image here is just for mockup, will be updated in
//the future when amazon s3 links are avialible

export default function UploadPhoto(): JSX.Element {
  const classes = useStyles();
  const inputFile = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    if (inputFile.current !== null) {
      inputFile.current.click();
    }
  };
  const [imageUrl, setImageUrl] = useState<string>(profile_url);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const reader = new FileReader();
    e.target.files instanceof FileList ? reader.readAsDataURL(e.target.files[0]) : 'handle exception';

    reader.onloadend = () => {
      if (reader.result) {
        setImageUrl(reader.result as string);
      }
    };
  };

  return (
    <Box>
      <Typography variant="h4" align="center" className={classes.formTitle}>
        Profile Photo
      </Typography>
      <Grid container direction="column" alignItems="center" spacing={4}>
        <Grid item>
          <Avatar alt="Profile picture" src={imageUrl} className={classes.large} />
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
                <Button color="secondary" startIcon={<DeleteIcon style={{ color: 'black' }} />}>
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
