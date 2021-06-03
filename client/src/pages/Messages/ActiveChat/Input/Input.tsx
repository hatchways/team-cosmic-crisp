import { FormControl, FilledInput } from '@material-ui/core';
import useStyles from './useStyles';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  handleSendMessage: (text: string) => void;
}

const Input = ({ handleSendMessage }: Props): JSX.Element => {
  const classes = useStyles();
  const [text, setText] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage(text);
    setText('');
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
      </FormControl>
    </form>
  );
};

export default Input;
