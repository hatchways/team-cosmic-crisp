import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Avatar } from '@material-ui/core';
import useStyles from './useStyles';

interface Props {
  time: string;
  text: string;
  otherUser: {
    firstName: string;
    profilePhoto: string;
  };
}

const OtherUserBubble = ({ time, text, otherUser }: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Avatar alt={otherUser.firstName} src={otherUser.profilePhoto} className={classes.avatar}></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.firstName} {time}
        </Typography>

        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
