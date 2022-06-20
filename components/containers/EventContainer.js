import React from 'react';
import styled from 'styled-components/native';
import { colours } from '../ColourPalette';
import { StyleSheet, View } from 'react-native';

const {primary, tertiary} = colours;

const style = StyleSheet.create({
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: tertiary,
    padding: 5,
})

const EventContainer = (props) => {
    return <View style = {style}>
        {props.children}
    </View>
    
};

export default EventContainer;