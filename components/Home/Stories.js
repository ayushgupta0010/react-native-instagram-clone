import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const users = [
  {
    user: "ayush",
    image:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
  },
  {
    user: "gupta",
    image:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
  },
  {
    user: "hikjakjajaksjasaxsj",
    image:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
  },
  {
    user: "hello",
    image:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
  },
  {
    user: "yep",
    image:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
  },
];

const getName = (name) => {
  if (name.length <= 6) return name.toLowerCase();
  return name.slice(0, 6).toLowerCase() + "...";
};

const Stories = () => {
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {users.map((story, i) => (
          <View key={i} style={{ alignItems: "center" }}>
            <Image style={styles.story} source={{ uri: story.image }} />
            <Text style={{ color: "white" }}>{getName(story.user)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 18,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
});

export default Stories;
