import { useEffect, useRef, useState } from 'react';
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
  let lastDate = new Date();
  useEffect(() => {
    if (messageRef.current) messageRef.current.scrollTop = messageRef.current.scrollHeight;
  }, [messages]);

  const DisplayDate = ({ date }: { date: Date }) => {
    if (!moment(date).isSame(lastDate, 'day')) {
      lastDate = date;
      if (moment(date).isSame(new Date(), 'day')) return <Grid className={classes.displayDate}>today</Grid>;
      return <Grid className={classes.displayDate}>{moment(date).format('Do MMM YYYY')}</Grid>;
    }
    return <></>;
  };

  return (
    <Grid className={classes.root} ref={messageRef}>
      {messages.length > 0 &&
        messages.map((message) => {
          const time = moment(message.createdAt).format('h:mm');
          return (
            <>
              <DisplayDate date={message.createdAt} />
              {message.sender === userId ? (
                <SenderBubble key={message._id} text={message.content} time={time} />
              ) : (
                <OtherUserBubble key={message._id} text={message.content} time={time} otherUser={otherUser} />
              )}
            </>
          );
        })}
    </Grid>
  );
};

export default Messages;
