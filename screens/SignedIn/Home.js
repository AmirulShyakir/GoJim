import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, Text, FlatList, View, StyleSheet } from 'react-native';

//firebase stuff
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';

import SignedInContainer from '../../components/containers/SignedInContainer';
import FacilityCard from '../../components/containers/FacilityCard';

const Home = ({navigation, route}) => {
    const [facilities, setFacilities] = useState([]);

    const { venue, type } = route.params;


    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {
        const list = [];
        const discussionRooms = query(
          collection(db, "facilities"),
          where("venue", "==", venue),
          where("type", "==", type)
        );
        const dRoomsSnapshot = await getDocs(discussionRooms);
        dRoomsSnapshot.forEach(facility => {
                list.push(facility.data());
            });
            setFacilities([...list])
    };
    
    const renderItem = ({ item }) => {
        return (
          <FacilityCard
            item={item}
            onPress={() => {
              console.log("Navigating to " + item.name);
              navigation.navigate("Facility", {facilityName: item.name} );
            }}
          />
        );
      };
    
    return <SignedInContainer>
        <FlatList
            data={facilities}
            renderItem={renderItem}
        />
    </SignedInContainer>
}

export default Home;