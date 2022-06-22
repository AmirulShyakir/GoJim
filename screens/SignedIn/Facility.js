import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

import MainContainer from '../../components/containers/MainContainer'; 
//texts
import LargeText from '../../components/Texts/LargeText';

import RowContainer from '../../components/containers/RowContainer';
import RegularText from '../../components/Texts/RegularText';
import MaxCapacityContainer from '../../components/containers/MaxCapacityContainer';
import { colours } from '../../components/ColourPalette';

const {primary} = colours;


const Facility = ({route}) => {
    const facilityName = route.params.facilityName;

    const [facility, setFacility] = useState({});
    
    useEffect(() => {
        getFacility();
    }, []);
    
    const getFacility = async () => {
        console.log(facilityName);
        const docRef = doc(db, 'facilities', facilityName);
        const docSnap = await getDoc(docRef);
        const facility = docSnap.data();
        setFacility(facility);
    }
    
    return <ScrollView style={styles.scrollView}>
        <Image
        style={{width: '100%', height: '35%', borderRadius: 10}}
        source={{uri:facility.imageURL}}
        />
        <LargeText>{facilityName}</LargeText>
        <RowContainer>
            <RegularText>{facility.venue}</RegularText>
            <MaxCapacityContainer>
                <RegularText>{facility.capacity}</RegularText>
            </MaxCapacityContainer>
        </RowContainer>
        <RegularText>{facility.description}</RegularText>
    </ScrollView>
}

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: primary,
      padding:25
    }
});

export default Facility;