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
import { signInWithEmailAndPassword } from "@firebase/auth";
import * as Yup from "yup";
import { Formik } from "formik";
import Validator from "email-validator";
import { auth } from "../../utils/firebase";

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("An email is required"),
  password: Yup.string()
    .required()
    .min(6, "Password must be at least 6 characters"),
});

const onLogin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => Alert.alert(err.message));
};

const LoginForm = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={loginSchema}
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
                placeholder='Phone number, username or email'
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

            <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
              <Text style={{ color: "#6BB0F5" }}>Forgot password?</Text>
            </View>

            <Pressable
              titleSize={20}
              style={[
                styles.button,
                { backgroundColor: isValid ? "#0096f6" : "#9acaf7" },
              ]}
              onPress={handleSubmit}>
              <Text style={{ color: "white" }}>Login</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push("Signup")}>
                <Text style={{ color: "#6BB0F5", marginLeft: 5 }}>Sign Up</Text>
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

export default LoginForm;
