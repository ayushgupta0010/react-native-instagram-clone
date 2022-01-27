import React, { useEffect, useState } from "react";
import { collectionGroup, onSnapshot } from "firebase/firestore";
import { ScrollView, StyleSheet, View } from "react-native";
import BottomTabs, { bottomTabsIcons } from "../components/Home/BottomTabs";
import Header from "../components/Home/Header";
import Post from "../components/Home/Post";
import Stories from "../components/Home/Stories";
import { db } from "../utils/firebase";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onSnapshot(collectionGroup(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, i) => (
          <Post key={i} post={post} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabsIcons} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});

export default HomeScreen;
