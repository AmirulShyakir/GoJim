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

    const { facilityType } = route.params;

    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {
        const list = [];
        const discussionRooms = query(collection(db, "facilities"), where("type", "==", facilityType));
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
            onPress={() => console.log("selected " + item.name)}
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