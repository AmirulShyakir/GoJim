import React, {useState} from 'react';
import { Formik } from 'formik';
import { ActivityIndicator, Image} from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
//containers
import MainContainer from '../components/containers/MainContainer'; 
import KeyboardAvoidingContainer from '../components/containers/KeyboardAvoidingContainer';
import RowContainer from '../components/containers/RowContainer';
//texts
import PressableText from '../components/Texts/PressableText';
import MessageBox from '../components/Texts/MessageBox';
import StyledTextInput from '../components/Inputs/StyledTextInput';
import RegularText from '../components/Texts/RegularText';
//buttons
import RegularButton from '../components/Buttons/RegularButton';
//colours
import { colours } from '../components/ColourPalette';
const {primary, white} = colours;

function ForgotPassword({navigation, route}) {
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState('false');

    const handlePasswordResetEmail = (email, setSubmitting) => {
      sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("sent password reset email to " + email)
        setSubmitting(false);
        setMessage("Password reset email has been sent to " + email);
      })
      .catch(error => {
        setMessage("Failed to send password reset email: " + error.message);
        setIsSuccessMessage(false);
        setSubmitting(false);
      })
    }

    const pressLogin = () => {
        navigation.navigate('Login');
    }

    return (
      <MainContainer style={{paddingTop: 100}}>
        <RegularText style={{marginBottom: 50}}>Enter your email address and you will receive a code to reset your password</RegularText>
        <KeyboardAvoidingContainer>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == "") {
                setMessage("Please enter your email");
                setSubmitting(false);
                setIsSuccessMessage(false);
              } else {
                handlePasswordResetEmail(values.email, setSubmitting);
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
                  style={{ marginBottom: 15 }}
                />

                <MessageBox
                  style={{ marginBottom: 15 }}
                  success={isSuccessMessage}
                >
                  {message || " "}
                </MessageBox>

                {!isSubmitting && (
                  <RegularButton onPress={handleSubmit}>Send</RegularButton>
                )}
                {isSubmitting && (
                  <RegularButton disabled={true}>
                    <ActivityIndicator size="small" color={white} />
                  </RegularButton>
                )}
                  <PressableText onPress={pressLogin}>
                    Back to login
                  </PressableText>
              </>
            )}
          </Formik>
        </KeyboardAvoidingContainer>
      </MainContainer>
    );
};

export default ForgotPassword;