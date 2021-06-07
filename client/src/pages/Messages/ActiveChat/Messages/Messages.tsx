import { useEffect, useRef } from 'react';
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

const Messages = ({ messages, userId, otherUser }: Props): JSX.Element => {
  const classes = useStyles();
  const messageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (messageRef.current) messageRef.current.scrollTop = messageRef.current.scrollHeight;
  }, [messages]);
  return (
    <Grid className={classes.root} ref={messageRef}>
      {messages.length > 0 &&
        messages.map((message) => {
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
