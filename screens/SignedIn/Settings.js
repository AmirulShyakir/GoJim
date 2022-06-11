import { auth } from '../../firebase';
import React, {useState} from 'react';

import MainContainer from '../../components/containers/MainContainer'; 
//texts
import LargeText from '../../components/Texts/LargeText';
import PressableText from '../../components/Texts/PressableText';



const Settings = () => {
    const Logout = () => {
        auth.signOut()
        }

    return <MainContainer>
        <LargeText>Settings Stub</LargeText>
        <PressableText onPress={ Logout } > Log out </PressableText>
    </MainContainer>
}

export default Settings;