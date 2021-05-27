import { Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  formLabel: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  multiline?: boolean;
  rows?: number;
}

export default function CustomTextField({ label, placeholder, value, onChange, multiline, rows }: Props): JSX.Element {
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
          <TextField
            label={placeholder}
            onChange={onChange}
            multiline={multiline}
            rows={rows}
            value={value}
            color="secondary"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
