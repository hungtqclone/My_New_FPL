import { SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native'
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { io } from "socket.io-client";
import AppHeader from '../components/AppHeader'
import { View, Text } from 'react-native';
import { AppStyle } from '../constants/AppStyle';
import { COLOR } from '../constants/Theme';
const socket = io("http://10.0.2.2:3001", { transports: ['websocket'] });
import { AppContext } from "../utils/AppContext";
import AxiosInstance from '../constants/AxiosInstance';

export default function App() {
  const navigation = useNavigation();
  const { infoUser, idUser } = useContext(AppContext);
  const idReceiver = "64ca4af6b3d0f6fef524cdfa"
  const [messages, setMessages] = useState([]);

  const findUserChats = async () => {
    try {
      const response = await AxiosInstance().get("chat/api/find-user-chats/" + idUser);

      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    findUserChats()
    socket.on("connect", () => {
      socket.emit("join-room", "room1")
      console.log("socket.id", socket.id);
    });

    socket.on("onMessage", (newMessages) => {
      console.log("newMessages")
      setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    });

    socket.on("disconnect", () => {
      console.log("disconnect"); // undefined
    });

    return () => {

    }
  }, [])


  const onSend = React.useCallback((newMessages = []) => {
    console.log("messages", messages);

    console.log("onSend")
    socket.emit("sendMessage", newMessages);
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages))
  });
  const renderBubble = (props) => {
    const {
      currentMessage: { text: currText },
    } = props;
    if (currText.indexOf('[x]') === -1) {
      return <Bubble {...props} />
    }

    return <Bubble {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#fef0dd',
        },
        right: {
          backgroundColor: '#fef0dd'
        }
      }}

      timeTextStyle={{
        left: {
          color: '#000',
        },
        right: {
          color: '#000',
        },
      }}
    />
  }
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: COLOR.background,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: COLOR.border,
          marginHorizontal: 16,
          marginBottom: 16
        }}
      />
    );
  };
  return (
    <SafeAreaView style={[AppStyle.container, {}]}>
      <AppHeader />
      <TouchableOpacity style={[AppStyle.row, { marginLeft: 16, marginBottom: 16 }]} onPress={() => { navigation.navigate("Profile") }}>
        <Image style={[AppStyle.iconSmall, { height: 20, tintColor: COLOR.primary }]} source={require('../assets/icons/ic_back.png')} />
        <Text style={[AppStyle.titleMedium, { marginLeft: 10 }]}>Quay lại</Text>
      </TouchableOpacity>
      <View style={{
        width: '100%', height: 530, backgroundColor: COLOR.background2, borderRadius: 16,borderWidth:0.5, shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4.59,
        elevation: 5
      }}>
        <GiftedChat
          placeholder="Hãy hỏi gì đó"
          messages={messages}
          onSend={onSend}
          renderInputToolbar={renderInputToolbar}
          user={{
            _id: idUser,
            name: infoUser.name,
            avatar: infoUser.avatar,
            idReceiver: idReceiver,

          }}
        />
      </View>
    </SafeAreaView>
  );
}
