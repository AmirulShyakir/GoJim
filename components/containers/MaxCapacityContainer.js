import React from 'react';
import styled from 'styled-components/native';
import { colours } from '../ColourPalette';
import { Feather } from '@expo/vector-icons'

const {tertiary, action, white} = colours;

const StyledView = styled.View`
    flex-direction: row;
    align-items: center;

`;

const LeftIcon = styled.View`
    padding-right: 5px;
`;

const MaxCapacityContainer = (props) => {
    return <StyledView {...props}>
                <LeftIcon>
                <Feather name='user' size={20} color = {white} />
                </LeftIcon>
                {props.children}
            </StyledView>;
};

export default MaxCapacityContainer;