import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  sideBarContainer: {
    width: '100%',
  },
  sideBar: {
    width: '100%',
  },
  linkText: {
    fontWeight: 600,
    fontSize: '1rem',
  },
  links: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    '&:hover': {
      color: '#000',
    },
  },
  active: {
    color: '#000',
  },
}));
