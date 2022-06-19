import React from 'react';
import styled from 'styled-components/native';
import { colours } from '../ColourPalette';
import RegularText from '../Texts/RegularText';
import { Feather } from '@expo/vector-icons'

const {action, white, tertiary} = colours;

const ButtonView = styled.TouchableOpacity`
    background-color: ${action};
    width: 60;
    height: 60;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`
const SearchButton = (props) => {
    return (
        <ButtonView onPress={props.onPress} {...props}>
            <Feather name={'search'} size={24} color = {white} />
        </ButtonView>
    );
};

export default SearchButton;
