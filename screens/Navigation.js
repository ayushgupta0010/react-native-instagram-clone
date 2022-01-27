import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import NewPostScreen from "./NewPostScreen";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";

const Stack = createStackNavigator();

export const SignedInStack = ({ currentUser }) => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='NewPost' component={NewPostScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
