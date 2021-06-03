import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';

interface Props {
  time: string;
  text: string;
}

const SenderBubble = ({ time, text }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Box className={`${classes.root} ${classes.user}`}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.userBubble}>
        <Typography className={classes.userText}>{text}</Typography>
      </Box>
    </Box>
  );
};

export default SenderBubble;
