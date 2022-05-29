import React, {useState} from 'react';
import { Formik } from 'formik';
import { ActivityIndicator, Image} from 'react-native';
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
const {primary, white} = colours;

function Signup({navigation}) {
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState('false');

    const handleSignup = async (credentials, setSubmitting) => {
        try {
            setMessage(null);
            //call backend
            //move to next page
            setSubmitting(false);
        } catch(error) {
            setMessage("Signup failed: " + error.message);
            setSubmitting(false);
        }
    }

    const pressLogin = () => {
        navigation.navigate('Login');
    }

    return <MainContainer>
        <Image 
        source={require('../assets/GOJIM.png')}
        style={{width:150, height:50, resizeMode: 'contain', marginBottom: 50}}
        />
         
        <KeyboardAvoidingContainer>
         
           
            <Formik 
                initialValues={{email: '', password: ''}}
                onSubmit={(values, {setSubmitting}) => {
                    if (values.email == '' || values.password == '' || values.confirmPassword == '') {
                        setMessage("Please fill in all fields");
                        setSubmitting(false);
                        setIsSuccessMessage(false); //the tut didnt have this tho
                    } else if (values.password !== values.confirmPassword) {
                        setMessage("Passwords do not match");
                        setSubmitting(false);
                        setIsSuccessMessage(false);
                    } else {
                        handleSignup(values, setSubmitting);
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

                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            values={values.password}
                        isPassword={true}
                            style={{ marginBottom:25}}
                        />

                        <StyledTextInput 
                            label={"Confirm Password"} 
                            icon="lock" 
                            placeholder="********"
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            values={values.confirmPassword}
                        isPassword={true}
                            style={{ marginBottom:25}}
                        />


                        <MessageBox style={{ marginBottom:20  }} success={isSuccessMessage}>
                            {message || " "}
                        </MessageBox>

                        {!isSubmitting && 
                            <RegularButton onPress={handleSubmit}>Signup</RegularButton>}
                        {isSubmitting && (
                            <RegularButton disabled={true}> 
                                <ActivityIndicator size='small' color={white} /> 
                            </RegularButton>
                        )}
                   
                        <PressableText style={{paddingTop: 10}} onPress={pressLogin}>Have and account? Login here</PressableText> 
                    </>
                )}
            </Formik>
        </KeyboardAvoidingContainer>
    </MainContainer>
};

export default Signup;