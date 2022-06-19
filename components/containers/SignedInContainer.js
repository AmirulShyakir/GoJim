import React from 'react';
import styled from 'styled-components/native';
import { colours } from '../ColourPalette';
import { StatusBar } from 'react-native';

const {primary, tertiary} = colours;

const StyledView = styled.View`
    flex: 1;
    background-color: ${tertiary};
    paddingHorizontal: 10px;
    paddingTop: 15px;
    
`

const SignedInContainer = (props) => {
    return <StyledView {...props}>
    <StatusBar
        animated={true}
        barStyle= 'light-content'
    />
    {props.children}</StyledView>;
};

export default SignedInContainer;