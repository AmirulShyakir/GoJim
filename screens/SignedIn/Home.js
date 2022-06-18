import React, { useEffect, useState } from 'react';
import { Text, FlatList, View, StyleSheet } from 'react-native';

//firebase stuff
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';

import MainContainer from '../../components/containers/MainContainer'; 
//texts
import LargeText from '../../components/Texts/LargeText';
import RegularButton from '../../components/Buttons/RegularButton';
import { colours } from '../../components/ColourPalette';


const {white} = colours;
const styles = StyleSheet.create({
    item: {
      color: white,
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });


const Home = ({navigation, route}) => {
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {
        const list = [];
        const conferenceRooms = query(collection(db, "facilities"), where("type", "==", "discussionRoom"));
        const cRoomsSnapshot = await getDocs(conferenceRooms);
        cRoomsSnapshot.forEach(facility => {
                list.push(facility);
            });
            setFacilities([...list])
    };
    
    useEffect(() => {
        auth.onAuthStateChanged( (user) => {
            if(user){
          
            } else {
                route.params.authenticate(false);
            }   
        })
      },[])
 
    
    //to print out facilities on terminal
    const printRooms = async () => {
        console.log("Facilities here:");
        const conferenceRooms = query(collection(db, "facilities"), where("type", "==", "discussionRoom"));
        const cRoomsSnapshot = await getDocs(conferenceRooms);
        cRoomsSnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    }

    return <MainContainer>
        <LargeText>Homescreen Stub</LargeText>
        <FlatList
            data={facilities}
            renderItem={({item}) => <Text style={styles.item}>{item.id}</Text>}
        />
    </MainContainer>
}

export default Home;