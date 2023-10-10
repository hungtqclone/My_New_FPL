import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');
const ChatScreen = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      socket.on('message', (message) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, message));
      });

      return () => {
        socket.off('message');
      };
    }, []);

    const onSend = (newMessages = []) => {
      socket.emit('message', newMessages[0]);
    };

    return (
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
        }}
      />
    );
  };

  export default ChatScreen;
