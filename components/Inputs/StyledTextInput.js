import React, {useState} from 'react';
import { View } from 'react-native';

import { Feather } from '@expo/vector-icons'

import styled from 'styled-components/native';
import { colours } from '../ColourPalette';
const { primary, secondary, tertiary, white, action} = colours;
import SmallText from '../Texts/SmallText';

const InputField = styled.TextInput`
    background-color: ${primary};
    padding: 15px;
    padding-left: 65px;
    padding-right: 60px;
    border-radius: 10px;
    font-size: 16px;
    height: 60px;
    margin-top: 3px;
    color: ${white};
    border-color: ${secondary};
    border-width: 2px;
`;

const LeftIcon = styled.View`
    position: absolute;
    top: 36px;
    left: 15px;
    z-index: 1;
    border-right-width: 2px;
    border-color: ${tertiary};
    padding-right: 10px;
`;

const RightIcon = styled.TouchableOpacity`
    position: absolute;
    top: 40px;
    right: 15px;
    z-index: 1;
`;

const StyledTextInput = ({icon, label, isPassword, ...props}) => {
    const [inputBackgroundColor, setInputBackgroundColor] = useState(primary);
    const [hidePassword, setHidePassword] = useState(true);

    const customOnBlur = () => {
        props?.onBlur;
        setInputBackgroundColor(primary);
    }

    const customOnFocus = () => {
        props?.onFocus;
        setInputBackgroundColor(secondary);
    }

    return (<View>
        <LeftIcon>
            <Feather name={icon} size={25} color = {action} />
        </LeftIcon>
        <SmallText>{label}</SmallText>
        <InputField 
            {...props}
            placeholderTextColor= {tertiary}
            style={{ backgroundColor: inputBackgroundColor, ...props?.style}}
            onBlur={customOnBlur}
            onFocus={customOnFocus}
            secureTextEntry={isPassword && hidePassword} //isPassword? hidePassword : !hidePassword
        />
        {isPassword && <RightIcon onPress={() => {
            setHidePassword(!hidePassword); 
        }}>
            <Feather name={hidePassword ? 'eye-off' : 'eye'} size={20} color = {tertiary} />
        </RightIcon>}

    </View>)
};

export default StyledTextInput;