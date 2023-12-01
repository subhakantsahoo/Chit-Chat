import {
  // Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ChatScreen({ navigation, route }) {
  const scrollViewRef = useRef();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [textMsg, setTextMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [getMsg, setGetMsg] = useState([]);
  const [sendText, setSendText] = useState(null);
  const [recieveMsg, setRecieveMsg] = useState([]);
  // console.log("route.prams", route.params.name);
  const MoveBack = () => {
    navigation.navigate("Friendscreen");
  };
  useEffect(() => {
    console.log("Friend recieve(1): ", route.params.user);
  }, []);
  const handelSendButton = () => {
    const user = JSON.parse(localStorage.getItem("User Name"));
    console.log("Login user who sending(z): ", user.userId);
    axios
      .post(
        `http://localhost:3000/api/msg/create`,
        {
          text: textMsg,
          user: route.params.user,
        },
        {
          headers: {
            Authorization: `Bearer ${user.Token}`,
          },
        }
      )
      .then((x) => {
        setSendText(textMsg);
        setTextMsg("");
      });

    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    if (sendText !== null) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [sendText]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/msg/one/${route.params.user}`)
      .then((res) => {
        const TextData = res.data;
        // console.log("resposne: ", TextData);
        setGetMsg(TextData);
      });
  }, [route, getMsg]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User Name"));
    axios
      .get(`http://localhost:3000/api/msg/one/${user.userId}`)
      .then((res) => {
        console.log("res: ", res.data);
        setRecieveMsg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#649C95",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#fff",
          flexDirection: "row",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          // flex: 1,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={MoveBack}
            style={{
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{
                uri: require("../assets/b.png"),
              }}
              style={{ width: 25, height: 25, marginLeft: 10, margin: 10 }}
            ></Image>
          </TouchableOpacity>
          {/* </View> */}
          <View
            style={{
              width: 35,
              height: 35,
              borderRadius: 50,
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: "white",
                textAlign: "center",
              }}
            >
              {route.params.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              marginLeft: 2,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {route.params.name.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          // backgroundColor: "red",
          height: "100%",
          width: windowWidth,
          // flexDirection: "row",
          // justifyContent: "space-between",
        }}
      >
        <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                // backgroundColor: "#649C95",
                backgroundColor: "pink",
                paddingLeft: 5,
              }}
            >
              {recieveMsg.map((x, i) => {
                // console.log("x: ", x);
                return (
                  <View
                    key={i}
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "#e5e5e5",
                      borderRadius: 8,
                      padding: 5,
                      maxWidth: "80%",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      marginTop: 5,
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "#000" }}>
                      {x.text}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                // backgroundColor: "#649C95",
                backgroundColor: "yellow",
                paddingRight: 5,
                // marginTop: "8%",
              }}
            >
              {getMsg.map((x, i) => {
                return (
                  <View
                    style={{
                      alignSelf: "flex-end",
                      backgroundColor: "#e5e5e5",
                      borderRadius: 8,
                      padding: 8,
                      maxWidth: "80%",
                      margin: 5,
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "#000" }}>
                      {x.text}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          flex: 1 / 10,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "#A8B5B8",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingLeft: 15,
          // bottom: 5,
        }}
      >
        <TextInput
          style={{
            height: 40,
            width: "80%",
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            color: "#333",
            fontSize: 20,
            fontFamily: "Arial",
            fontWeight: "normal",
          }}
          onChangeText={(msg) => setTextMsg(msg)}
          placeholder="Message.."
          value={textMsg}
        ></TextInput>

        <TouchableOpacity
          onPress={handelSendButton}
          style={{
            alignContent: "center",
            justifyContent: "center",
            marginRight: 30,
          }}
        >
          <Image
            source={{
              uri: require("../assets/telegram-icon.png"),
            }}
            style={{ width: 40, height: 40, marginLeft: 10 }}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}
