import { Box, Grid, Typography } from '@material-ui/core';
import useStyles from './useStyles';

interface Props {
  userName: string;
  online?: boolean;
}

const Header = ({ userName, online }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" className={classes.root}>
      <Typography className={classes.username} component="div" variant="h5">
        {userName}
      </Typography>
      <Box className={`${classes.statusDot} ${online ? classes.online : ''}`}></Box>
      <Typography className={classes.statusText}>{online ? 'Online' : 'Offline'}</Typography>
    </Grid>
  );
};

export default Header;
