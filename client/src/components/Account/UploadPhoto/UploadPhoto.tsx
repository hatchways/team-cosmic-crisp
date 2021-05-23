import { Box, Typography } from '@material-ui/core';

import useStyles from './useStyles';

export default function UploadPhoto(): JSX.Element {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Typography variant="h3">Upload Photo</Typography>
    </Box>
  );
}
