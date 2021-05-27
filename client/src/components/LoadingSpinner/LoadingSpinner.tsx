import { Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  spinnerContainer: {
    minHeight: '90vh',
  },
}));

export default function LoadingSpinner(): JSX.Element {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center" alignItems="center" className={classes.spinnerContainer}>
      <CircularProgress />
    </Box>
  );
}
