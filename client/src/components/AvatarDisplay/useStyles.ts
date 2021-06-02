import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  badge: {
    height: 13,
    width: 13,
    borderRadius: '50%',
    border: '2px solid white',
    backgroundColor: '#D0DAE9',
  },
  online: {
    backgroundColor: '#1CED84',
  },
}));

export default useStyles;
