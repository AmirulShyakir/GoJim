import React from 'react';
import styled from 'styled-components/native';
import { colours } from '../ColourPalette';
import { StatusBar } from 'react-native';

const {primary, tertiary} = colours;

const StyledView = styled.View`
    flex-wrap: wrap;
    background-color: ${tertiary};
`

const EventContainer = (props) => {
    return <StyledView {...props}>
    <StatusBar
        animated={true}
        barStyle= 'light-content'
    />
    {props.children}</StyledView>;
};

export default EventContainer;