import useStyles from './useStyles';
import Switch from '@material-ui/core/Switch';
import { Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core';
import { User } from '../../../interface/User';

interface Props {
  loggedInUser: User;
  handleChange: () => void;
}

export default function Availability({ loggedInUser, handleChange }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Grid container alignItems="center" justify="center" spacing={2}>
        <Typography variant="body1" align="right" className={classes.formLabel}>
          {`I'M ${loggedInUser?.profile.isAvailable ? '' : 'NOT'} AVAILABLE`}
        </Typography>
        <Switch
          checked={loggedInUser?.profile.isAvailable}
          onChange={handleChange}
          name="isAvailable"
          color="primary"
        />
      </Grid>
      <Grid item hidden={loggedInUser?.profile.isAvailable} className={classes.availability}>
        <Typography variant="body1" align="right" className={classes.formLabel}>
          AVAILABILITY:{' '}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={loggedInUser?.profile.isAvailable}
              onChange={handleChange}
              name="checkedA"
              color="primary"
            />
          }
          label="Mon"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={loggedInUser?.profile.isAvailable}
              onChange={handleChange}
              name="checkedA"
              color="primary"
            />
          }
          label="Tues"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={loggedInUser?.profile.isAvailable}
              onChange={handleChange}
              name="checkedA"
              color="primary"
            />
          }
          label="Wed"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={loggedInUser?.profile.isAvailable}
              onChange={handleChange}
              name="checkedA"
              color="primary"
            />
          }
          label="Thrus"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={loggedInUser?.profile.isAvailable}
              onChange={handleChange}
              name="checkedA"
              color="primary"
            />
          }
          label="Fri"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={loggedInUser?.profile.isAvailable}
              onChange={handleChange}
              name="checkedA"
              color="primary"
            />
          }
          label="Sat"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={loggedInUser?.profile.isAvailable}
              onChange={handleChange}
              name="checkedA"
              color="primary"
            />
          }
          label="Sun"
        />
      </Grid>
    </Grid>
  );
}
