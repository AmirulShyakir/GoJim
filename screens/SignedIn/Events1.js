import { db } from '../../firebase';
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import MainContainer from '../../components/containers/MainContainer'; 
import SignedInContainer from '../../components/containers/SignedInContainer';
//texts
import LargeText from '../../components/Texts/LargeText';
import RegularButton from '../../components/Buttons/RegularButton';
import { FlatList } from 'react-native';
import EventCard from '../../components/containers/EventCard';
import EventTypeCard from '../../components/containers/EventTypeCard';
import EventContainer from '../../components/containers/EventContainer';
import { useState, useEffect } from 'react';



const Events1 = ({navigation}) => {
    
    const eventTypes = {type1:"Friendly Sports", 
                        type2:"Recreational Training", 
                        type3:"Networking Sessions",
                        type4:"Study Sessions"
                        };
    const pressEvent = () => {
        navigation.navigate('EventsScreen');
      }
    
    return <EventContainer>
        <RegularButton onPress={pressEvent}>go to FlatList</RegularButton>
        <RegularButton></RegularButton>
        <LargeText>HELL</LargeText>
        <EventTypeCard>test</EventTypeCard>
        <EventTypeCard>test</EventTypeCard>
    </EventContainer>
}

export default Events1;