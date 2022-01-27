import React from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import Validator from "email-validator";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";

const signupSchema = Yup.object().shape({
  email: Yup.string().email().required("An email is required"),
  username: Yup.string().required().min(2, "A username is required"),
  password: Yup.string()
    .required()
    .min(6, "Password must be at least 6 characters"),
});

const getRandomPic = async () => {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  return data.results[0].picture.large;
};

const onSignup = (email, password, username) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (authUser) => {
      let profilePic = await getRandomPic();
      setDoc(doc(db, "users", authUser.user.email), {
        id: authUser.user.uid,
        username,
        email,
        profilePic,
      });
    })
    .catch((err) => Alert.alert(err.message));
};

const SignupForm = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => {
          onSignup(values.email, values.password, values.username);
        }}
        validationSchema={signupSchema}
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
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}>
              <TextInput
                placeholder='Email'
                placeholderTextColor='#444'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.username.length || values.username.length > 2
                      ? "#ccc"
                      : "red",
                },
              ]}>
              <TextInput
                placeholder='Username'
                placeholderTextColor='#444'
                autoCapitalize='none'
                textContentType='username'
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
            </View>

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 6
                      ? "#ccc"
                      : "red",
                },
              ]}>
              <TextInput
                placeholder='Password'
                placeholderTextColor='#444'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                textContentType='password'
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>

            <Pressable
              titleSize={20}
              style={[
                styles.button,
                { backgroundColor: isValid ? "#0096f6" : "#9acaf7" },
              ]}
              onPress={handleSubmit}>
              <Text style={{ color: "white" }}>Sign Up</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>ALready have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push("Login")}>
                <Text style={{ color: "#6BB0F5", marginLeft: 5 }}>Login</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#fafafa",
    marginBottom: 10,
    borderWidth: 1,
  },
  signupContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
  wrapper: {
    marginTop: 80,
  },
});

export default SignupForm;
