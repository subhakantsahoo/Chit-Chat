import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [error, setError] = useState("");
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const MoveBack = () => {
    navigation.navigate("Login");
  };

  const userSubmit = () => {
    if (name.trim() === "" || password.trim() === "") {
      setError("Please fillup all input fields.");
      return;
    } else if (phoneNo.length !== 10) {
      setError("Please enter a valid Number");
    } else {
      axios
        .post(`http://localhost:3000/api/user/create`, {
          user: name,
          password: password,
          phno: phoneNo,
        })
        .then((res) => {
          if (res.data) {
            navigation.navigate("Login");
          }
        })
        .catch((err) => {
          console.log(err);
          setError("Facing some network issue");
        });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flex: 1,
          margin: 40,
          marginBottom: 40,
          backgroundColor: "#14AAC5",
          height: windowHeight / 5,
          width: windowWidth / 1.1,
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 15,
        }}
      >
        <TouchableOpacity onPress={MoveBack}>
          <Image
            source={{
              uri: require("../assets/black-back.png"),
            }}
            style={{ width: 20, height: 20, marginLeft: 10, margin: 10 }}
          ></Image>
        </TouchableOpacity>
        <View style={{ alignSelf: "center", margin: 30 }}>
          <TextInput
            style={{
              color: "blue",
              borderColor: "#fff",
              backgroundColor: "#fff",
              margin: 10,
              padding: 5,
              borderWidth: 2,
              //   width: "90%",
              // height: 5
            }}
            placeholder="Enter Name"
            onChangeText={(userName) => {
              setName(userName);
              setError("");
            }}
          />
          <TextInput
            placeholder="Enter Password"
            onChangeText={(userPassword) => {
              setPassword(userPassword);
              setError("");
            }}
            style={{
              margin: 10,
              padding: 5,
              color: "blue",
              borderWidth: 2,
              borderColor: "#fff",
              backgroundColor: "#fff",
            }}
          />
          <TextInput
            placeholder="Enter Phoneno"
            keyboardType="numeric"
            onChangeText={(userPhno) => {
              const cleanedPhno = userPhno.replace(/[^0-9]/g, "");

              if (/^\d+$/.test(cleanedPhno)) {
                if (cleanedPhno.length === 10) {
                  setPhoneNo(cleanedPhno);
                  setError("");
                } else if (cleanedPhno.length > 10) {
                  setError("Please enter a valid Number");
                }
              } else {
                setError("Please enter a valid Phone Number");
              }
              //   setError("");
            }}
            style={{
              margin: 10,
              padding: 5,
              color: "blue",
              borderWidth: 2,
              borderColor: "#fff",
              backgroundColor: "#fff",
            }}
          />
          {error ? (
            <Text style={{ color: "red", marginTop: 10, padding: 10 }}>
              {error}
            </Text>
          ) : null}
          <View style={{ alignItems: "center", margin: 10 }}>
            <Button
              onPress={userSubmit}
              title="Submit"
              color={"#85929e"}
            ></Button>
          </View>
        </View>
      </View>
    </View>
  );
}
