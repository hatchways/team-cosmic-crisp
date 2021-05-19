import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';

export default function LandingPage(): JSX.Element {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Grid container component="main" className={`${classes.root}`}>
        <h1>Landing page</h1>
      </Grid>
    </>
  );
}
