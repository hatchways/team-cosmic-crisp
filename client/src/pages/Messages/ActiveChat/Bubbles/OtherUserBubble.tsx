import { Box, Typography, Avatar } from '@material-ui/core';
import useStyles from './useStyles';

interface Props {
  time: string;
  text: string;
  otherUser: {
    firstName: string;
    profilePhoto: string;
  };
  typing?: boolean;
}

const OtherUserBubble = ({ time, text, otherUser, typing }: Props): JSX.Element => {
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
          {typing && (
            <div className={classes.typingLoader}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
