import React from 'react';
import styled from 'styled-components/native';
import { colours } from '../ColourPalette';

const { white } = colours;

const StyledText = styled.Text`
    font-size: 25px;
    color: ${white};
    text-align: left;
    padding-top: 10px;
`

const LargeText = (props) => {
    return <StyledText {...props}>{props.children}</StyledText>;
};

export default LargeText;