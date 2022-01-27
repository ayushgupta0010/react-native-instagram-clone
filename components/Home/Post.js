import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAuth } from "firebase/auth";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Divider } from "react-native-elements";
import { db } from "../../utils/firebase";

const postFooterIcons = [
  {
    name: "Like",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/like.png",
    likedImageUrl: "https://img.icons8.com/ios-glyphs/90/fa314a/like.png",
  },
  {
    name: "Comment",
    imageUrl: "https://img.icons8.com/material-outlined/60/ffffff/speech.png",
  },
  {
    name: "Share",
    imageUrl:
      "https://img.icons8.com/material-outlined/60/ffffff/email-send.png",
  },
  {
    name: "Save",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/bookmark-ribbon.png",
  },
];

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
      alignItems: "center",
    }}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.profilePic }} style={styles.userImage} />
      <Text
        style={{
          color: "white",
          marginLeft: 5,
          fontWeight: "700",
        }}>
        {post.username}
      </Text>
    </View>
    <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ email, post, handleLike }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={styles.leftFooterIconsContainer}>
      <TouchableOpacity onPress={handleLike}>
        <Image
          style={styles.footerIcon}
          source={{
            uri: post.likesByUsers.includes(email)
              ? postFooterIcons[0].likedImageUrl
              : postFooterIcons[0].imageUrl,
          }}
        />
      </TouchableOpacity>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl} />
    </View>
    <View>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
);

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);

const CommentsSection = ({ post }) => {
  const len = post.comments.length;

  const getCommentsPrefix = () => (len === 1 ? "1 comment" : `${len} comments`);

  return (
    <>
      {!!len && (
        <View style={{ marginTop: 5 }}>
          <Text style={{ color: "gray" }}>
            View{len > 1 && " all"} {getCommentsPrefix()}
          </Text>
        </View>
      )}
    </>
  );
};

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, i) => (
      <View key={i} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "600", marginRight: 3 }}>
            {comment.user}
          </Text>
          <Text>{comment.comment}</Text>
        </Text>
      </View>
    ))}
  </>
);

const Post = ({ post }) => {
  const [email, setEmail] = useState("");

  const handleLike = () => {
    const isLiked = post.likesByUsers.includes(email);
    updateDoc(doc(db, "users", email, "posts", post.id), {
      likesByUsers: isLiked ? arrayRemove(email) : arrayUnion(email),
    });
  };

  useEffect(() => {
    setEmail(getAuth().currentUser.email);
  }, []);

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider color='white' width={1} orientation='vertical' />

      <PostHeader post={post} />

      <PostImage post={post} />

      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter email={email} post={post} handleLike={handleLike} />

        <View style={{ flexDirection: "row", marginTop: 4 }}>
          <Text style={{ color: "white", fontWeight: "600" }}>
            {post.likesByUsers.length.toLocaleString("en")} likes
          </Text>
        </View>

        <View style={{ marginTop: 5 }}>
          <Text style={{ color: "white" }}>
            <Text style={{ fontWeight: "600", marginRight: 3 }}>
              {post.username}
            </Text>
            <Text>{post.caption}</Text>
          </Text>
        </View>

        <CommentsSection post={post} />

        <Comments post={post} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerIcon: {
    width: 33,
    height: 33,
  },
  leftFooterIconsContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
  userImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
});

export default Post;
