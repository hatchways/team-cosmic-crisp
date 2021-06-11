import useStyles from './useStyles';
import Switch from '@material-ui/core/Switch';
import { Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core';
import { OwnerFormProfile } from '../../../interface/Profile';

interface Props {
  profile: OwnerFormProfile;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    property: string,
    value?: string,
  ) => void;
}

export default function Availability({ profile, handleChange }: Props): JSX.Element {
  const classes = useStyles();
  const daysOfWeek = ['mon', 'tues', 'wed', 'thrus', 'fri', 'sat', 'sun'];
  return (
    <Grid item xs={12}>
      <Grid item xs={12} sm={4} style={{ marginLeft: '4rem' }}>
        <Grid container alignItems="center">
          <Typography variant="body1" align="right" className={classes.formLabel}>
            {`I'M ${profile.isAvailable ? '' : 'NOT'} AVAILABLE`}
          </Typography>
          <Switch
            checked={profile.isAvailable}
            onChange={(e) => handleChange(e, 'isAvailable')}
            name="isAvailable"
            color="primary"
          />
        </Grid>
      </Grid>
      <Grid item hidden={profile.isAvailable} className={classes.availability}>
        <Grid xs={12} sm={3}>
          <Typography variant="body1" align="right" className={classes.formLabel}>
            AVAILABILITY:{' '}
          </Typography>
        </Grid>
        <Grid xs={12} sm={8}>
          {daysOfWeek.map((day) => (
            <FormControlLabel
              key={day}
              control={
                <Checkbox
                  checked={profile?.availability?.includes(day)}
                  onChange={(e) => handleChange(e, 'availability', day)}
                  name="checkedA"
                  color="primary"
                />
              }
              disabled={!profile.isAvailable}
              label={day}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
