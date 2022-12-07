import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StreamChat } from "stream-chat";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
} from "stream-chat-expo";
import { useEffect } from "react";
const client = StreamChat.getInstance("48v2teztftmy");
const Index = (props) => {
  const [channel, setChannel] = useState();

  useEffect(() => {
    const createAndWatchChannel = async () => {
      const newChannel = client.channel(
        "messaging",
        props.route.params.channel_id
      );
      setChannel(newChannel);
    };

    createAndWatchChannel();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Chat client={client}>
        <Channel channel={channel}>
          <MessageList />
          <MessageInput />
        </Channel>
      </Chat>
    </SafeAreaView>
  );
};

export default Index;
