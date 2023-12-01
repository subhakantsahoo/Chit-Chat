import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screen/login-screen";
import ChatScreen from "./screen/chat-screen";
import SignUp from "./screen/signUp-screen";
import FriendScreen from "./screen/friend-screen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Chatscreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Signup"
          component={SignUp}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Friendscreen"
          component={FriendScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
