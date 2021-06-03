import { Grid } from '@material-ui/core';
import moment from 'moment';
import { Message } from '../../../../interface/Messages';
import SenderBubble from '../Bubbles/SenderBubble';
import OtherUserBubble from '../Bubbles/OtherUserBubble';
import useStyles from './useStyles';

interface Props {
  messages: Message[];
  userId?: string;
  otherUser: {
    firstName: string;
    profilePhoto: string;
  };
}

const Messages = ({ messages, userId, otherUser }: Props) => {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');
        return message.sender === userId ? (
          <SenderBubble key={message._id} text={message.content} time={time} />
        ) : (
          <OtherUserBubble key={message._id} text={message.content} time={time} otherUser={otherUser} />
        );
      })}
    </Grid>
  );
};

export default Messages;
