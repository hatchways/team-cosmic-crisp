import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 30,
    right: -20,
    userSelect: 'none',
    border: '1px solid #c7d8e2',
    backgroundColor: '#fff',
    width: 400,
    height: 'auto',
    borderRadius: 8,
    boxShadow: '5px 5px 15px rgba(0,0,0,0.125), -5px -5px 15px rgba(0,0,0,0.125)',
    margin: 0,
    padding: 0,
    maxHeight: 500,
    minHeight: 150,
    overflowY: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: '0 !important',
      display: 'none',
    },
  },
  notificationTitle: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1.2),
    fontWeight: 650,
  },
  listItemContainer: {
    margin: 0,
    padding: theme.spacing(0.5),
    listStyle: 'none',
  },

  listItem: {
    borderBottom: '1px solid #f1f2f4',
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
  listContainer: {
    minHeight: 80,
  },
  notiAvatar: {
    margin: theme.spacing(1),
  },
  notificationText: {
    fontWeight: 600,
  },
  unReadNotification: {
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'green',
    position: 'relative',
    margin: 10,
  },
  notificationTime: {
    fontSize: '0.8rem',
    fontWeight: 600,
  },
  emptyNotificationMessage: {
    fontSize: '1.2rem',
    fontWeight: 500,
    paddingTop: theme.spacing(3),
  },
  viewAllBtn: {
    color: '#2196f3',
    marginRight: '0.6rem',
    marginTop: '0.3rem',
  },
}));

export default useStyles;
