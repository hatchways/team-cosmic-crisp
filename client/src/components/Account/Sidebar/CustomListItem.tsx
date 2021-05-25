import { ListItem, ListItemText, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useStyles } from './useStyles';

interface Props {
  targetPath: string;
  actualPath: string;
  label: string;
}

export default function CustomListItem({ targetPath, actualPath, label }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <ListItem>
      <Link to={targetPath} className={`${classes.links} ${actualPath === targetPath ? classes.active : ''}`}>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body1" className={classes.linkText}>
              {label}
            </Typography>
          }
        />
      </Link>
    </ListItem>
  );
}
