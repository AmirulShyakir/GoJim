import React, {useState} from 'react';
import { Formik } from 'formik';
import { ActivityIndicator, Image} from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
//containers
import MainContainer from '../components/containers/MainContainer'; 
import KeyboardAvoidingContainer from '../components/containers/KeyboardAvoidingContainer';
import RowContainer from '../components/containers/RowContainer';
//texts
import PressableText from '../components/Texts/PressableText';
import MessageBox from '../components/Texts/MessageBox';
import StyledTextInput from '../components/Inputs/StyledTextInput';
//buttons
import RegularButton from '../components/Buttons/RegularButton';
//colours
import { colours } from '../components/ColourPalette';
const {primary, white} = colours;

function Login({navigation, route}) {
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState('false');

    const handleLogin = (credentials, setSubmitting) => {
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("logged in with " + user.email);
            setSubmitting(false);
            route.params.authenticate(true);
        })
        .catch(error => {
            setMessage("Login failed: " + error.message);
            setIsSuccessMessage(false);
            setSubmitting(false);
        })
    }

    const pressSignup = () => {
        navigation.navigate('OnboardingLoggedOut');
    }

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
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == "" || values.password == "") {
                setMessage("Please fill in all fields");
                setSubmitting(false);
                setIsSuccessMessage(false);
              } else {
                handleLogin(values, setSubmitting);
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
                  icon="user"
                  placeholder="example@u.nus.edu"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  values={values.email}
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

                <MessageBox
                  style={{ marginBottom: 20 }}
                  success={isSuccessMessage}
                >
                  {message || " "}
                </MessageBox>

                {!isSubmitting && (
                  <RegularButton onPress={handleSubmit}>Login</RegularButton>
                )}
                {isSubmitting && (
                  <RegularButton disabled={true}>
                    <ActivityIndicator size="small" color={white} />
                  </RegularButton>
                )}
                <RowContainer>
                  <PressableText onPress={pressSignup}>
                    New Account Signup
                  </PressableText>
                  <PressableText onPress={() => {navigation.navigate("ForgotPassword")}}>
                    Forgot Password
                  </PressableText>
                </RowContainer>
              </>
            )}
          </Formik>
        </KeyboardAvoidingContainer>
      </MainContainer>
    );
};

export default Login;