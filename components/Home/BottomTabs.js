import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-elements";

export const bottomTabsIcons = [
  {
    name: "Home",
    active: "https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png",
  },
  {
    name: "Search",
    active: "https://img.icons8.com/ios-filled/500/ffffff/search--v1.png",
    inactive: "https://img.icons8.com/ios/500/ffffff/search--v1.png",
  },
  {
    name: "Reels",
    active: "https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png",
    inactive: "https://img.icons8.com/ios/500/ffffff/instagram-reel.png",
  },
  {
    name: "Shop",
    active:
      "https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full.png",
  },
  {
    name: "Profile",
    active:
      "https://yt3.ggpht.com/ytc/AKedOLRbdv3Di8paQyrgMF_VwFXPkhwVzcW59Vgo8dTsyw=s88-c-k-c0x00ffffff-no-rj",
    inactive:
      "https://yt3.ggpht.com/ytc/AKedOLRbdv3Di8paQyrgMF_VwFXPkhwVzcW59Vgo8dTsyw=s88-c-k-c0x00ffffff-no-rj",
  },
];

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState("Home");

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
        style={[
          styles.icon,
          icon.name === "Profile" ? styles.inactiveProfilePic : null,
          activeTab === "Profile" && icon.name === activeTab
            ? styles.activeProfilePic
            : null,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      {/* <Divider width={1} orientation='vertical' />
      <View style={styles.container}>
        {icons.map((icon, i) => (
          <Icon key={i} icon={icon} />
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  activeProfilePic: {
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 2,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    paddingTop: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
  inactiveProfilePic: {
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 0,
  },
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: "3%",
    zIndex: 999,
    backgroundColor: "#000",
  },
});

export default BottomTabs;
