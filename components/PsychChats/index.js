import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, SafeAreaView, Image, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StreamChat } from "stream-chat";
import { ChannelList, Chat } from "stream-chat-expo";
import styles from "./styles";
import firebase from "firebase";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const client = StreamChat.getInstance("48v2teztftmy");
const Index = () => {
  const filters = {
    joined: { $eq: true },
  };
  const sort = { last_message_at: -1 };
  const animationRef = useRef();
  const nav = useNavigation();
  const [trigger, setTrigger] = useState(false);
  const options = { limit: 20, messages_limit: 30 };

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  });
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#FCFBFD" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Chat client={client}>
          <ChannelList
            EmptyStateIndicator={() => (
              <View
                style={{
                  backgroundColor: "#FCFBFD",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LottieView
                  ref={(animation) => {
                    setTrigger(!trigger);

                    animationRef.current = animation;
                  }}
                  autoPlay={true}
                  style={{
                    width: 300,
                    height: 300,
                  }}
                  source={require("../../assets/empty")}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  {t("nochatsyet")}
                </Text>
              </View>
            )}
            PreviewAvatar={CustomAvatar}
            PreviewTitle={CustomTitle}
            filters={filters}
            sort={sort}
            options={options}
            onSelect={(channel) => {
              let name = "";
              Object.values(channel.state.members).forEach((z) => {
                if (z.user_id !== firebase.auth().currentUser.uid) {
                  name = z.user.name;
                  nav.navigate("Chat", {
                    channel_id: channel.id,
                    name: name,
                  });
                }
              });
            }}
          />
        </Chat>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const CustomTitle = ({ channel }) => {
  let name = "";
  Object.values(channel.state.members).forEach((z) => {
    if (z.user_id !== firebase.auth().currentUser.uid) {
      name = z.user.name;
    }
  });
  return <Text>{name}</Text>;
};

const CustomAvatar = ({ channel }) => {
  let name = "";
  Object.values(channel.state.members).forEach((z) => {
    if (z.user_id !== firebase.auth().currentUser.uid) {
      name = z.user.name;
    }
  });
  return (
    <Image
      source={{
        uri: "https://avatars.dicebear.com/api/initials/" + name + ".png",
      }}
      style={{
        width: 40,
        height: 40,
        alignSelf: "center",
        borderRadius: 999999999,
      }}
    />
  );
};

export default Index;
