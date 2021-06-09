import { FormControl, FilledInput, TextField, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './useStyles';
import { ChangeEvent, FormEvent, MouseEvent, useState, useRef, useEffect } from 'react';
import Picker, { IEmojiData } from 'emoji-picker-react';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendIcon from '@material-ui/icons/Send';

interface Props {
  handleSendMessage: (text: string) => void;
}

const Input = ({ handleSendMessage }: Props): JSX.Element => {
  const classes = useStyles();
  const [text, setText] = useState<string>('');
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
  const emojiContainerRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement> | MouseEvent) => {
    console.log('submit');
    e.preventDefault();
    handleSendMessage(text);
    setText('');
  };

  const onEmojiClick = (event: MouseEvent<Element, globalThis.MouseEvent>, emojiObject: IEmojiData) => {
    setText(text + emojiObject.emoji);
  };

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        event.target instanceof HTMLElement &&
        emojiContainerRef.current &&
        !emojiContainerRef.current.contains(event.target)
      ) {
        setEmojiPicker(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiContainerRef]);

  // there are issues with recently used emojies in emoji picker
  useEffect(() => {
    const recentlyUsed = document.querySelector("[data-display-name='Recently Used']");
    if (recentlyUsed) recentlyUsed.classList.add(classes.displayNone);
  }, [emojiPicker]);

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Grid className={`${classes.emojiPicker} ${!emojiPicker ? classes.hideEmoji : ''}`} ref={emojiContainerRef}>
        <Picker onEmojiClick={onEmojiClick} />
      </Grid>

      <TextField
        className={classes.input}
        variant="outlined"
        placeholder="Type something..."
        value={text}
        name="text"
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <>
              <Button onClick={() => setEmojiPicker(!emojiPicker)}>
                <EmojiEmotionsIcon />
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                <SendIcon />
              </Button>
            </>
          ),
        }}
      />
    </form>
  );
};

export default Input;
