import { Box, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './useStyles';

interface Props {
  userName: string;
  online?: boolean;
}

const Header = ({ userName, online }: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Typography className={classes.username}>{userName}</Typography>
        <Box className={`${classes.statusDot} ${online ? classes.online : ''}`}></Box>
        <Typography className={classes.statusText}>{online ? 'Online' : 'Offline'}</Typography>
      </Box>
      <MoreHorizIcon classes={{ root: classes.ellipsis }} />
    </Box>
  );
};

export default Header;
