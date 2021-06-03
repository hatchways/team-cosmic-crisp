import Rating from '@material-ui/lab/Rating';
import moment from 'moment';

import { Avatar, Box, Divider, Fade, Typography } from '@material-ui/core';
import { Review } from '../../../interface/Review';

import useStyles from './useStyles';

export interface Props {
  review: Review;
}

export default function SitterReview({ review }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Fade in={true}>
      <Box className={classes.reviewContainer}>
        <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.reviewHeader}>
          <Box display="flex" alignItems="center">
            <Avatar src={review.creator?.profilePhoto} alt="Profile Image" className={classes.avatar} />
            <Typography variant="body1" className={classes.name}>
              {`${review.creator.firstName} ${review.creator.lastName}`}
            </Typography>
          </Box>
          <Rating value={review.rating} name="Sitter Rating" readOnly />
        </Box>
        <Box>
          <Typography variant="body1">{review?.message}</Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Typography variant="body1" color="textSecondary">
            {moment(review.createdAt).fromNow()}
          </Typography>
        </Box>
        <Divider />
      </Box>
    </Fade>
  );
}
