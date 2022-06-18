import { auth } from '../../firebase';
import React, {useState} from 'react';

import MainContainer from '../../components/containers/MainContainer'; 
//texts
import LargeText from '../../components/Texts/LargeText';
import PressableText from '../../components/Texts/PressableText';
import RegularButton from '../../components/Buttons/RegularButton';
import SmallText from '../../components/Texts/SmallText';



const Settings = () => {
    const Logout = () => {
        auth.signOut()
        }

    return <MainContainer>
        <LargeText>Settings Stub</LargeText>
        <RegularButton onPress={ Logout } > Log out </RegularButton>
        <SmallText>GoJim Version 1.0.0</SmallText>
    </MainContainer>
}

export default Settings;