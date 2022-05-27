import React from 'react';
import styled from 'styled-components/native';
import { colours } from '../ColourPalette';
import RegularText from '../Texts/RegularText';

const {action, white} = colours;

const ButtonView = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${action};
    width: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    height: 60px
`

const RegularButton = (props) => {
    return (
        <ButtonView onPress={props.onPress} {...props}>
            <RegularText style={[{color: white}, {...props?.textStyle}]}>{props.children}</RegularText>
        </ButtonView>
    );
};

export default RegularButton;