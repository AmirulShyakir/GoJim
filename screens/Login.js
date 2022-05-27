import React, {useState} from 'react';
import { Formik } from 'formik';
import { ActivityIndicator, Image} from 'react-native';
//containers
import MainContainer from '../components/containers/MainContainer'; 
import KeyboardAvoidingContainer from '../components/containers/KeyboardAvoidingContainer';
import RowContainer from '../components/containers/RowContainer';
//texts
import LargeText from '../components/Texts/LargeText';
import PressableText from '../components/Texts/PressableText';
import MessageBox from '../components/Texts/MessageBox';
import StyledTextInput from '../components/Inputs/StyledTextInput';
//buttons
import RegularButton from '../components/Buttons/RegularButton';
//colours
import { colours } from '../components/ColourPalette';
const {primary, white} = colours;

const Login = () => {
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState('false');

    const handleLogin = async (credentials, setSubmitting) => {
        try {
            setMessage(null);
            //call backend
            //move to next page
            setSubmitting(false);
        } catch(error) {
            setMessage("Login failed: " + error.message);
            setSubmitting(false);
        }
    }

    return <MainContainer>
        <Image 
        source={require('../assets/GOJIM.png')}
        style={{width:150, height:50, resizeMode: 'contain'}}
        />
         
        <KeyboardAvoidingContainer>
            <LargeText style={{marginBottom: 35, marginTop: 20}}>Sign In </LargeText>
           
            <Formik 
                initialValues={{email: '', password: ''}}
                onSubmit={(values, {setSubmitting}) => {
                    if (values.email == "" || values.password == "") {
                        setMessage('Please fill in all fields');
                        setSubmitting(false);
                        setIsSuccessMessage(false); //the tut didnt have this tho
                    } else {
                        handleLogin(values, setSubmitting);
                    }
                }}
            >
                {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                    <>
                        <StyledTextInput 
                            label={"Email Address"} 
                            icon="user" 
                            placeholder="example@u.nus.edu"
                            keyboardType="email-address"  
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            values={values.email}
                            style={{ marginBottom:25}}
                        />

                        <StyledTextInput 
                            label={"Password"} 
                            icon="lock" 
                            placeholder="********"
                            keyboardType="email-address"  
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            values={values.password}
                        isPassword={true}
                            style={{ marginBottom:25}}
                        />

                        <MessageBox style={{ marginBottom:20  }} success={isSuccessMessage}>
                            {message || " "}
                        </MessageBox>

                        {!isSubmitting && 
                            <RegularButton onPress={handleSubmit}>Login</RegularButton>}
                        {isSubmitting && (
                            <RegularButton disabled={true}> 
                                <ActivityIndicator size='small' color={white} /> 
                            </RegularButton>
                        )}
                        <RowContainer>
                            <PressableText onPress={() => {}}>New account signup</PressableText>
                            <PressableText onPress={() => {}}>Forgot Password</PressableText>
                        </RowContainer>
                        
                    </>
                )}
            </Formik>
        </KeyboardAvoidingContainer>
    </MainContainer>
};

export default Login;