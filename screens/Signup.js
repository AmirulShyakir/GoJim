import React, {useState} from 'react';
import { Formik } from 'formik';
import { ActivityIndicator, Image} from 'react-native';
import { auth, db } from '../firebase';
import {
  doc,
  setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from "firebase/auth/react-native";

//containers
import MainContainer from '../components/containers/MainContainer'; 
import KeyboardAvoidingContainer from '../components/containers/KeyboardAvoidingContainer';
//texts
import LargeText from '../components/Texts/LargeText';
import PressableText from '../components/Texts/PressableText';
import MessageBox from '../components/Texts/MessageBox';
import StyledTextInput from '../components/Inputs/StyledTextInput';
//buttons
import RegularButton from '../components/Buttons/RegularButton';
//colours
import { colours } from '../components/ColourPalette';
import RowContainer from '../components/containers/RowContainer';
const {primary, white} = colours;

function Signup({navigation}) {
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState('false');

    const handleSignup = (credentials, setSubmitting) => {
        createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then(userCredentials => {
            const user = userCredentials.user;
            updateFiretore(user.uid, user.email, credentials.username)
            console.log("Signed up with " + user.email);
            navigation.navigate('Login');
        })
        .catch(error => {
            setMessage("Signup failed: " + error.message);
            setIsSuccessMessage(false);
            setSubmitting(false);
        })
    }
    
    const pressLogin = () => {
        navigation.navigate('Login');
    }

    const updateFiretore = async (uid, email, username) => {
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, { email: email, username: username, favourites: [] });
      updateProfile(auth.currentUser, { displayName: username });
      console.log("username set to " + username);
    };

    return (
      <MainContainer>
        <Image
          source={require("../assets/GOJIM.png")}
          style={{
            width: 200,
            height: 50,
            resizeMode: "contain",
            marginBottom: 50,
            marginTop: 100,
            alignSelf: "center",
          }}
        />

        <KeyboardAvoidingContainer>
          <Formik
            initialValues={{ email: "", username: "", password: "", confirmPassword: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == "" || values.password == "" 
              || values.username == "" || values.confirmPassword == "") {
                setMessage("Please fill in all fields");
                setSubmitting(false);
                setIsSuccessMessage(false);
              } else if (values.password !== values.confirmPassword) {
                setMessage("Passwords do not match");
                setSubmitting(false);
                setIsSuccessMessage(false);
              } else if (values.password.length < 6) {
                setMessage("Password must be at least 6 characters long");
                setSubmitting(false);
                setIsSuccessMessage(false);
              } else if (values.username.length > 20) {
                setMessage("Username cannot be more than 20 characters");
                setSubmitting(false);
                setIsSuccessMessage(false);
              } else {
                handleSignup(values, setSubmitting);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <>
                <StyledTextInput
                  label={"Email Address"}
                  icon="mail"
                  placeholder="example@u.nus.edu"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  values={values.email}
                  style={{ marginBottom: 25 }}
                />

                <StyledTextInput
                  label={"Username"}
                  icon="user"
                  placeholder="example name"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  values={values.username}
                  style={{ marginBottom: 25 }}
                />

                <StyledTextInput
                  label={"Password"}
                  icon="lock"
                  placeholder="********"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  values={values.password}
                  isPassword={true}
                  style={{ marginBottom: 25 }}
                />

                <StyledTextInput
                  label={"Confirm Password"}
                  icon="lock"
                  placeholder="********"
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  values={values.confirmPassword}
                  isPassword={true}
                  style={{ marginBottom: 25 }}
                />

                <MessageBox
                  style={{ marginBottom: 20 }}
                  success={isSuccessMessage}
                >
                  {message || " "}
                </MessageBox>

                {!isSubmitting && (
                  <RegularButton onPress={handleSubmit}>Signup</RegularButton>
                )}
                {isSubmitting && (
                  <RegularButton disabled={true}>
                    <ActivityIndicator size="small" color={white} />
                  </RegularButton>
                )}
                <PressableText onPress={pressLogin}>
                  Have An Account? Login Here
                </PressableText>
              </>
            )}
          </Formik>
        </KeyboardAvoidingContainer>
      </MainContainer>
    );
};

export default Signup;