import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import authContext from "../component/user-context";

export default function Login({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const usercontext = useContext(authContext);

  useEffect(() => {
    setName(localStorage.getItem("User Name"));
  }, []);

  const userSinup = () => {
    navigation.navigate("Signup");
  };

  const userValidation = () => {
    if (name.trim() === "" || password.trim() === "") {
      setError("Please enter both username and password");
      return;
    } else {
      axios
        .post(`http://localhost:3000/api/auth/login`, {
          user: name,
          password: password,
        })
        .then((res) => {
          // console.log("res", res.data);
          if (res.data) {
            localStorage.setItem("User Name", JSON.stringify(res.data));
            usercontext.setName(name);
            navigation.navigate("Friendscreen", {});
          } else {
            setError("Invalid UserName or Password");
          }
        })
        .catch((error) => {
          console.log(error);
          setError("Invalid UserName or Password");
        });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 1 / 1.1, backgroundColor: "#14AAC5" }}></View>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>User Login.</Text>
        <View style={{ alignSelf: "center", margin: 10 }}>
          <TextInput
            style={{
              color: "blue",
              borderColor: "#14AAC5",
              margin: 10,
              padding: 5,
              borderWidth: 2,
              // height: 5
            }}
            placeholder="Username"
            onChangeText={(userName) => {
              setName(userName);
              setError("");
            }}
          />
          <TextInput
            placeholder="Password"
            onChangeText={(userPassword) => {
              setPassword(userPassword);
              setError("");
            }}
            style={{
              margin: 10,
              padding: 5,
              color: "blue",
              borderWidth: 2,
              borderColor: "#14AAC5",
            }}
          />
          {error ? (
            <Text style={{ color: "red", marginTop: 10, padding: 10 }}>
              {error}
            </Text>
          ) : null}
        </View>
        <View style={{ alignItems: "center", margin: 10 }}>
          <Button
            onPress={userValidation}
            title="Login"
            color={"#85929e"}
          ></Button>
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                paddingRight: 10,
                width: 60,
                height: 1,
                backgroundColor: "#787878",
                opacity: 0.5,
              }}
            ></View>
            <Text>Or</Text>
            <View
              style={{
                paddingLeft: 10,
                height: 1,
                backgroundColor: "#787878",
                opacity: 0.5,
                flex: 1,
                width: 60,
              }}
            ></View>
          </View>
          <View style={{ margin: 10 }}>
            <Button
              onPress={userSinup}
              title="Sign Up"
              color={"#85929e"}
              style={{ margin: 10 }}
            ></Button>
          </View>
        </View>
      </View>
    </View>
  );
}
