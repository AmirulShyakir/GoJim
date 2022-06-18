import React, { useEffect, useState } from 'react';
import { Image, Text, FlatList, View, StyleSheet } from 'react-native';

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
        const discussionRooms = query(collection(db, "facilities"), where("type", "==", "discussionRoom"));
        const dRoomsSnapshot = await getDocs(discussionRooms);
        dRoomsSnapshot.forEach(facility => {
                list.push(facility.data());
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
        <LargeText>Facilities</LargeText>
        <FlatList
            data={facilities}
            renderItem={({item}) => 
            <Image source={{uri:item.imageURL}}  style={{width:306, height:183}} />}
        />
    </MainContainer>
}

export default Home;