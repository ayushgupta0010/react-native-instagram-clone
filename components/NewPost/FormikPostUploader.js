import React, { useState, useEffect } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";
import {
  limit,
  query,
  where,
  addDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import validUrl from "valid-url";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import { db } from "../../utils/firebase";

const PLACEHOLDER_IMG =
  "https://img.icons8.com/ios/48/000000/user-male-circle.png";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption has reached its limit"),
});

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [currentUser, setCurrentUser] = useState(null);

  const uploadPost = (imageUrl, caption) => {
    addDoc(collection(db, "users", currentUser.email, "posts"), {
      caption,
      imageUrl,
      profilePic: currentUser.profilePic,
      uid: currentUser.id,
      username: currentUser.username,
      email: currentUser.email,
      createdAt: serverTimestamp(),
      likesByUsers: [],
      comments: [],
    }).then(() => navigation.goBack());
  };

  useEffect(() => {
    const currentUser = getAuth().currentUser;
    getDocs(
      query(
        collection(db, "users"),
        where("id", "==", currentUser.uid),
        limit(1)
      )
    ).then((snapshot) => setCurrentUser(snapshot.docs[0].data()));
  }, []);

  console.log(currentUser);

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        uploadPost(values.imageUrl, values.caption);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}>
      {({
        values,
        errors,
        isValid,
        handleBlur,
        handleSubmit,
        handleChange,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : PLACEHOLDER_IMG,
              }}
              style={{ width: 100, height: 100, backgroundColor: "white" }}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                style={{ color: "white", fontSize: 20 }}
                placeholder='Write a caption...'
                placeholderTextColor='gray'
                multiline={true}
                onChange={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation='vertical' />
          <TextInput
            style={{ color: "white", fontSize: 18 }}
            placeholder='Enter image url'
            placeholderTextColor='gray'
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: "red" }}>
              {errors.imageUrl}
            </Text>
          )}

          <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
