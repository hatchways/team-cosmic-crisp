import { Button, Grid, GridList, GridListTile, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { deletePhotos, uploadPhoto } from '../../helpers/APICalls/updatePhotos';
import updateProfile from '../../helpers/APICalls/updateProfile';
import { OwnerFormProfile } from '../../interface/Profile';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const useStyles = makeStyles((theme) => ({
  formLabel: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },

  lastTile: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    position: 'absolute',
    left: '0',
    top: '0',
    zIndex: 3,
    width: '2rem',
    height: '2rem',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  image: {
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(80%)',
    },
  },
}));

interface Props {
  gallery: string[];
  user?: boolean;
  profile?: OwnerFormProfile;
}

export default function Gallery({ gallery, user = false, profile }: Props): JSX.Element {
  const classes = useStyles();
  const [raw, setRaw] = useState<File[]>([]);
  const [urls, setURLs] = useState<string[]>([]);
  const inputFile = useRef<HTMLInputElement>(null);
  const { updateSnackBarMessage } = useSnackBar();
  const { updateLoggedInUserDetails } = useAuth();

  const [lightBoxOpen, setLightBoxOpen] = useState<boolean>(false);
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  const clickInput = () => {
    if (inputFile.current) inputFile.current.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (!(e.target.files instanceof FileList)) return;

    //saving only first 5 images selected
    const temp: File[] = [];
    for (let i = 0; i < 5; i++) {
      if (e.target.files[i]) temp.push(e.target.files[i]);
    }
    setRaw(temp);
  };

  //handleUpdateImage function will only re-run if image changes
  useEffect(() => {
    async function handleUpdateImage() {
      const formData = new FormData();
      raw.map((rawImg) => formData.append(`photos`, rawImg));

      try {
        const result = await uploadPhoto(formData);
        const photoURLs = result?.success?.urlArray;
        if (photoURLs) setURLs(photoURLs);
      } catch (error) {
        updateSnackBarMessage(`Error uploading images, ${error}`);
      }
    }
    if (raw.length > 0) {
      handleUpdateImage();
    }
  }, [raw]);

  //handleUpdateUserProfile function will only re-run if s3Url changes
  useEffect(() => {
    async function handleUpdateUserprofile() {
      const id = profile ? profile._id : '';

      try {
        if (id) {
          if (profile?.gallery) {
            const res = await updateProfile(id, { gallery: [...profile?.gallery, ...urls] });
            updateLoggedInUserDetails(res);
            updateSnackBarMessage('Image added');
          } else {
            const res = await updateProfile(id, { gallery: [...urls] });
            updateLoggedInUserDetails(res);
            updateSnackBarMessage('Image added');
          }
        }
        setURLs([]);
        setRaw([]);
        if (inputFile?.current) inputFile.current.value = '';
      } catch (error) {
        updateSnackBarMessage(`Error updating user profile ${error}`);
      }
    }
    if (urls.length > 0) {
      handleUpdateUserprofile();
    }
  }, [urls]);

  const handleDeletePhoto = async (imageUrl: string): Promise<void> => {
    const confirmDelete = confirm(`Are you sure you want to delete photo?`);
    if (!confirmDelete) return;
    try {
      const id = profile ? profile._id : '';
      if (id) {
        await deletePhotos([imageUrl]);
        if (profile?.gallery) {
          const res = await updateProfile(id, { gallery: profile?.gallery.filter((image) => image !== imageUrl) });
          updateLoggedInUserDetails(res);
        } else {
          const res = await updateProfile(id, { gallery: [] });
          updateLoggedInUserDetails(res);
        }
        updateSnackBarMessage('Image deleted');
      }
    } catch (error) {
      updateSnackBarMessage(`Error deleting profile photo ${error}`);
    }
  };

  return (
    <Grid>
      {user && (
        <Typography variant="body2" component="div" style={{ margin: '1rem 0' }}>
          *you can only add 5 images at one time
        </Typography>
      )}
      {user && (
        <input
          type="file"
          id="file"
          multiple={true}
          ref={inputFile}
          style={{ display: 'none' }}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleImageChange(e)}
        />
      )}
      <GridList cellHeight={160} cols={3} spacing={10}>
        {gallery.map((image, i) => (
          <GridListTile cols={1} key={image}>
            {user && (
              <DeleteForeverIcon
                className={`${classes.deleteIcon} deleteIcon`}
                onClick={() => handleDeletePhoto(image)}
              />
            )}

            <img
              src={image}
              alt="gallery"
              className={classes.image}
              onClick={() => {
                setPhotoIndex(i);
                setLightBoxOpen(true);
              }}
            />
          </GridListTile>
        ))}
        {user && (
          <GridListTile cols={1}>
            <Grid className={classes.lastTile}>
              <Button onClick={clickInput}>
                <AddIcon /> new images
              </Button>
            </Grid>
          </GridListTile>
        )}
      </GridList>

      {lightBoxOpen && (
        <Lightbox
          mainSrc={gallery[photoIndex]}
          nextSrc={gallery[(photoIndex + 1) % gallery.length]}
          prevSrc={gallery[(photoIndex + gallery.length - 1) % gallery.length]}
          onCloseRequest={() => setLightBoxOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + gallery.length - 1) % gallery.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % gallery.length)}
        />
      )}
    </Grid>
  );
}
