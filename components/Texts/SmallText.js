import React from 'react';
import styled from 'styled-components/native';
import { colours } from '../ColourPalette';

const { white } = colours;

const StyledText = styled.Text`
    font-size: 13px;
    color: ${white};
    text-align: left;
`

const SmallText = (props) => {
    return <StyledText {...props}>{props.children}</StyledText>;
};

export default SmallText;