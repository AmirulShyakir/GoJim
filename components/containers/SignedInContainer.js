import React from 'react';
import styled from 'styled-components/native';
import { StatusBarHeight } from '../Shared';
import { colours } from '../ColourPalette';

const {primary, tertiary} = colours;

const StyledView = styled.View`
    flex: 1;
    background-color: ${tertiary};
`

const SignedInContainer = (props) => {
    return <StyledView {...props}>{props.children}</StyledView>;
};

export default SignedInContainer;