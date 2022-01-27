import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { SignedInStack, SignedOutStack } from "./screens/Navigation";
import { auth } from "./utils/firebase";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) =>
        user ? setCurrentUser(user) : setCurrentUser(null)
      ),
    []
  );

  return (
    <>
      {currentUser !== undefined ? (
        currentUser ? (
          <SignedInStack />
        ) : (
          <SignedOutStack />
        )
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default AuthNavigation;
