import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import { useState } from 'react';

interface Props {
  time: string;
  text: string;
}

const SenderBubble = ({ time, text }: Props): JSX.Element => {
  const classes = useStyles();
  const [showTime, setShowTime] = useState<boolean>(false);
  return (
    <Box className={`${classes.root} ${classes.user}`} onClick={() => setShowTime(!showTime)}>
      {showTime && <Typography className={classes.date}>{time}</Typography>}
      <Box className={classes.userBubble}>
        <Typography className={classes.userText}>{text}</Typography>
      </Box>
    </Box>
  );
};

export default SenderBubble;
