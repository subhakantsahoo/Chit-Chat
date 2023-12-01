import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  LogBox,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "./chat-screen";

export default function FriendScreen({ navigation }) {
  const Stack = createNativeStackNavigator();

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [name, setName] = useState([]);

  const MoveBack = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User Name"));
    axios
      .get(`http://localhost:3000/api/user/get`)
      .then((res) => {
        const username = res.data;
        const userObject = username.filter((x) => x._id !== user.userId);
        setName(userObject);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#E6E9EA",
        height: windowHeight,
        width: windowWidth,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          height: 60,
          backgroundColor: "#fff",
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
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
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
          >
            All FriendList
          </Text>
        </View>
      </View>

      <View
        style={{
          alignSelf: "center",
          margin: 20,
          maxHeight: "90%",
          maxWidth: "60%",
          minWidth: "60%",
        }}
      >
        {name.map((y, i) => {
          // console.log("y data: ", y);
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Chatscreen", { user: y._id, name: y.user })
              }
              key={i}
              style={{
                justifyContent: "flex-start",
                backgroundColor: "#95DBF7",
                margin: 10,
                width: (windowWidth / 3) * 1,
                height: "9%",
                borderWidth: 2,
                borderColor: "#ccc",
                borderRadius: 5,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image
                source={{
                  uri: require("../assets/avtar.png"),
                }}
                style={{ width: 40, height: 40 }}
              ></Image>
              <Text
                style={{
                  fontSize: 16,
                  color: "#333",
                  textAlign: "center",
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                {y.user.charAt(0).toUpperCase() + y.user.slice(1).toLowerCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
