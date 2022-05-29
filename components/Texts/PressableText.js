import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { colours } from '../ColourPalette';
import SmallText from '../Texts/SmallText';

const {action, white} = colours;

const StyledPressable = styled.Pressable`
   padding-vertical: 5px;
   align-self: center;
`

const PressableText = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} {...props}>
            <StyledPressable >
                <SmallText style={{ color: action }}>{props.children}</SmallText>
            </StyledPressable>
        </TouchableOpacity>
    );
};

export default PressableText;