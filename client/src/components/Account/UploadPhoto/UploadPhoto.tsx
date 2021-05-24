import { Box, Typography, Avatar, Grid, Button, FormControl } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import React, { useRef, useState } from 'react';
import { uploadPhoto } from '../../../helpers/APICalls/uploadPhoto';

import useStyles from './useStyles';
import profile_url from '../../../Images/b1f0e680702e811aa8ba333cb19c0e0ea95e8e31.png';

//this image here is just for mockup, will be updated in
//the future when amazon s3 links are avialible

interface Image {
  preview: string;
  raw: File;
}

export default function UploadPhoto(): JSX.Element {
  const classes = useStyles();
  const inputFile = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    if (inputFile.current !== null) {
      inputFile.current.click();
    }
  };
  const [image, setImage] = useState<Image>({ preview: profile_url, raw: '' as unknown as File });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const reader = new FileReader();
    e.target.files instanceof FileList ? reader.readAsDataURL(e.target.files[0]) : 'no files found';

    reader.onloadend = () => {
      if (reader.result) {
        e.target.files instanceof FileList
          ? setImage({ preview: reader.result as string, raw: e.target.files[0] })
          : 'no files found';
      }
    };
  };

  const handleImageSave = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photos', image.raw);
    const result = await uploadPhoto(formData);
    console.log(result.success?.urlArray[0]);
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
            <Grid container direction="column" spacing={3}>
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
                <Grid container direction="row" justify="space-around">
                  <Grid>
                    <Button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>): Promise<void> => handleImageSave(e)}
                      color="secondary"
                      startIcon={<SaveIcon style={{ color: 'black' }} />}
                    >
                      Save Photo
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button color="secondary" startIcon={<DeleteIcon style={{ color: 'black' }} />}>
                      Delete Photo
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
