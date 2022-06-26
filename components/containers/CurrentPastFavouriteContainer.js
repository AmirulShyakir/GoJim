import React from 'react';
import styled from 'styled-components/native';
import { colours } from '../ColourPalette';
import { StyleSheet, View } from 'react-native';

const {primary, tertiary} = colours;

const style = StyleSheet.create({
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: tertiary,
    padding: 10,
    paddingHorizontal: 15,
    alignContent: 'center',
    justifyContent: 'center'
})

const CurrentPastFavouriteContainer = (props) => {
    return <View style = {style}>
        {props.children}
    </View>
    
};

export default CurrentPastFavouriteContainer;