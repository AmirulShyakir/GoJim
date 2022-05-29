import React from 'react';
import styled from 'styled-components/native';
import { StatusBarHeight } from '../Shared';
import { colours } from '../ColourPalette';

const {primary} = colours;

const StyledView = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight}px;
    background-color: ${primary};
`

const MainContainer = (props) => {
    return <StyledView {...props}>{props.children}</StyledView>;
};

export default MainContainer;