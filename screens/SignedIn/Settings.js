import { auth, db } from '../../firebase';
import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, Text } from 'react-native';

import MainContainer from '../../components/containers/MainContainer'; 
import { colours } from '../../components/ColourPalette';
//texts
import LargeText from '../../components/Texts/LargeText';
import PressableText from '../../components/Texts/PressableText';
import RegularButton from '../../components/Buttons/RegularButton';
import SmallText from '../../components/Texts/SmallText';
const {primary, secondary, tertiary, white} = colours;

const Settings = () => {
    const [profilePicURL, setProfilePicURL] = useState("https://www.ukm.my/fper/wp-content/uploads/2021/04/blank-profile-picture-973460_1280-768x768.jpg");
    const [username, setUsername] = useState("No Username");

    useEffect(() => {
        console.log("profilePicURL: " + auth.currentUser.photoURL);
        if (auth.currentUser.photoURL) {
            setProfilePicURL(auth.currentUser.photoURL);
        }
    },[auth.currentUser])

    useEffect(() => {
        console.log("username: " + auth.currentUser.displayName);
        if (auth.currentUser.displayName) {
            setUsername(auth.currentUser.displayName);
        }
    },[auth.currentUser])

    const Logout = () => {
        auth.signOut()
    }

    return <MainContainer>
        <LargeText>Profile Settings</LargeText>
        <Image 
            style={styles.profilePic}
            source={{uri: profilePicURL}} 
        />
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.email}>{auth.currentUser.email}</Text>
        <RegularButton onPress={ Logout } > Log out </RegularButton>
        <SmallText style={{alignSelf: "center"}}>current userID: {auth.currentUser.uid}</SmallText>
        <SmallText style={{alignSelf: "center"}}>GoJim Version 1.0.0</SmallText>
    </MainContainer>
}

const styles = StyleSheet.create({
    profilePic: {
        width: 150,
        height: 150,
        marginVertical: 10,
        borderRadius: 75,
        alignSelf: "center",
    },
    username: {
        fontSize: 20,
        alignSelf: "center",
        color: white,
    },
    email: {
        fontSize: 20,
        alignSelf: "center",
        color: tertiary,
    }
});

export default Settings;