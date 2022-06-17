import React from 'react';
import { TouchableOpacity } from 'react-native';

import { colours } from "../ColourPalette";
import SmallText from "../Texts/SmallText";

const {action} = colours;

const PressableText = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} {...props} style={{paddingTop: 15, alignSelf: 'center'}}>
                <SmallText style={{ color: action, }}>{props.children}</SmallText>
        </TouchableOpacity>
    );
};

export default PressableText;
