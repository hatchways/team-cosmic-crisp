import { Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  formLabel: {
    fontWeight: 700,
  },
}));

interface Props {
  label: string;
  placeholder: string;
}

export default function CustomTextField({ label, placeholder }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} sm={3}>
          <Typography variant="body1" align="right" className={classes.formLabel}>
            {label}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField label={placeholder} color="secondary" variant="outlined" fullWidth />
        </Grid>
      </Grid>
    </Grid>
  );
}
