import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import Layout from '../../components/Layout/Layout';

export default function Search(): JSX.Element {
  const classes = useStyles();
  return (
    <Layout>
      <CssBaseline />
      <Grid container component="main" className={`${classes.root}`}>
        <h1>Search page</h1>
      </Grid>
    </Layout>
  );
}
