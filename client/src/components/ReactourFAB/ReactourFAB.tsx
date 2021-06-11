import { Fab } from '@material-ui/core';
import { LiveHelp } from '@material-ui/icons';
import useStyles from './useStyles';

import { useReactour } from '../../context/useReactourContext';

export default function ReactourFAB(): JSX.Element {
  const classes = useStyles();
  const { openTour } = useReactour();
  return (
    <Fab color="secondary" className={classes.fab} onClick={openTour}>
      <LiveHelp className={classes.iconBtn} />
    </Fab>
  );
}
