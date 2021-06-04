import { useState } from 'react';
import { Avatar, Box, Button, TextField, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './useStyles';
import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { ReviewsApiData } from '../../../interface/ReviewApiData';
import { ReviewForm } from '../../../interface/Review';
import { createReview } from '../../../helpers/APICalls/reviews';

interface Props {
  sitterId: string;
}

export default function CreateReview({ sitterId }: Props): JSX.Element {
  const { loggedInUserDetails, updateReviewsContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [toggle, setToggle] = useState<boolean>(false);
  const [review, setReview] = useState<ReviewForm>({
    rating: 0,
    message: '',
  });
  const classes = useStyles();

  const handleSubmit = () => {
    createReview(sitterId, review).then((data: ReviewsApiData) => {
      if (data.success) {
        updateReviewsContext(data.success);
        updateSnackBarMessage('Successfully Created Review!');
      } else if (data.error) {
        updateSnackBarMessage(`Error creating a review: ${data.error}`);
      }
    });
    setToggle(false);
    setReview({ rating: 0, message: '' });
  };

  return (
    <Box className={classes.mainContainer}>
      <Box textAlign="right">
        <Button
          variant="contained"
          size="large"
          color="primary"
          startIcon={toggle ? <CloseIcon /> : <CreateIcon />}
          onClick={() => setToggle((prevToggle) => !prevToggle)}
        >
          {toggle ? 'Close' : 'Write a Review'}
        </Button>
      </Box>
      <Box>
        {toggle && (
          <Box>
            <Box display="flex" alignItems="center">
              <Avatar src={loggedInUserDetails?.profilePhoto} alt="Profile Image" className={classes.avatar} />
              <Typography variant="body1" className={classes.name}>
                {`${loggedInUserDetails?.firstName} ${loggedInUserDetails?.lastName}`}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" className={classes.ratingContainer}>
              <Typography variant="body1" className={classes.rating}>
                Rating:
              </Typography>
              <Rating
                value={review.rating}
                name="set-sitters-rating"
                onChange={(event, newValue) => {
                  setReview({ ...review, rating: newValue });
                }}
                size="large"
              />
            </Box>
            <Box>
              <TextField
                variant="outlined"
                color="secondary"
                label="Write a review"
                rows={6}
                multiline
                value={review.message}
                placeholder="Write a review"
                onChange={(e) => setReview({ ...review, message: e.target.value })}
                fullWidth
              />
            </Box>
            <Box textAlign="center" className={classes.btnContainer}>
              <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
