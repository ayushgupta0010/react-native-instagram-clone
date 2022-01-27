import React from "react";
import { View } from "react-native";
import AddNewPost from "../components/NewPost/AddNewPost";

const NewPostScreen = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <AddNewPost navigation={navigation} />
    </View>
  );
};

export default NewPostScreen;
