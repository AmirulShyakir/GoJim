import React from 'react';
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
        <StyledPressable onPress={props.onPress} {...props}>
            <SmallText style={{ color: action }}>{props.children}</SmallText>
        </StyledPressable>
    );
};

export default PressableText;