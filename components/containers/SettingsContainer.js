import React from 'react';
import styled from 'styled-components/native';
import { Text, StyleSheet } from 'react-native';
import { colours } from '../ColourPalette';
import { Feather } from '@expo/vector-icons'
import RegularText from '../Texts/RegularText';

const {tertiary, action, white} = colours;

const StyledView = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    marginHorizontal: 15;
    marginTop: 30;

`;

const LeftIcon = styled.View`
    padding-right: 15px;
`;

const RightIcon = styled.View`
    position: absolute;
    right: 0px;
`;

const SettingsContainer = ({icon, ...props}) => {
    return <StyledView {...props}>
                <LeftIcon>
                <Feather name={icon} size={20} color = {action} />
                </LeftIcon>
                <Text style={styles.text}>{props.children}</Text>
                <RightIcon>
                <Feather name="chevron-right" size={20} color = {action} />
                </RightIcon>
            </StyledView>;
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: white,
    },
})

export default SettingsContainer;