import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: 'flex-end',
    marginTop: 15,
    width: '100%',
    position: 'relative',
  },
  input: {
    width: '100%',
    backgroundColor: '#F4F6FA',
    borderRadius: '8px 8px 0 0',
  },
  emojiPicker: {
    position: 'absolute',
    bottom: '120%',
    right: '0',
  },
  hideEmoji: {
    display: 'none',
  },
}));

export default useStyles;
