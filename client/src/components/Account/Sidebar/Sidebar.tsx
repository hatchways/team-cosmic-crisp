import { Box, List } from '@material-ui/core';
import { useLocation } from 'react-router';

import { useStyles } from './useStyles';
import CustomListItem from './CustomListItem';

export default function SideBar(): JSX.Element {
  const classes = useStyles();
  const { pathname } = useLocation();
  return (
    <Box maxWidth={250} className={classes.sideBarContainer}>
      <List className={classes.sideBar}>
        <CustomListItem label="Edit Profile" actualPath={pathname} targetPath="/user/edit-profile" />
        <CustomListItem label="Profile Photo" actualPath={pathname} targetPath="/user/profile-photo" />
        <CustomListItem label="Image Gallery" actualPath={pathname} targetPath="/user/gallery" />
      </List>
    </Box>
  );
}
