import { Box, Grid, Typography, useTheme, Button } from '@material-ui/core';
import useStyles from './useStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useMessages } from '../../../../context/useMessageContext';

interface Props {
  userName: string;
  online?: boolean;
}

const Header = ({ userName, online }: Props): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const { setActiveConversation } = useMessages();
  return (
    <Grid container alignItems="center" className={classes.root}>
      {useMediaQuery(theme.breakpoints.down('sm')) && (
        <Button variant="text" onClick={() => setActiveConversation('')}>
          <ArrowBackIcon />
          go back
        </Button>
      )}
      <Typography className={classes.username} component="div" variant="h5">
        {userName}
      </Typography>
      <Box className={`${classes.statusDot} ${online ? classes.online : ''}`}></Box>
      <Typography className={classes.statusText}>{online ? 'Online' : 'Offline'}</Typography>
    </Grid>
  );
};

export default Header;
