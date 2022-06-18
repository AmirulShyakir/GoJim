import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, Text, FlatList, View, StyleSheet } from 'react-native';

//firebase stuff
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';

import MainContainer from '../../components/containers/MainContainer'; 
import SignedInContainer from '../../components/containers/SignedInContainer';
//texts
import LargeText from '../../components/Texts/LargeText';
import RegularButton from '../../components/Buttons/RegularButton';
import { colours } from '../../components/ColourPalette';
import RegularText from '../../components/Texts/RegularText';
import RowContainer from '../../components/containers/RowContainer';
import MaxCapacityContainer from '../../components/containers/MaxCapacityContainer';


const {white, secondary, primary} = colours;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 20,
    paddingBottom: 10,
    backgroundColor: primary,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 25,
    color: white,
  },
  image: {
    width:332.5, 
    height:183,
    paddingBottom:50,
    borderRadius: 10
  }
});

  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <Image source={{uri:item.imageURL}}  style={[styles.image]} />
      <LargeText>{item.name}</LargeText>
      <RowContainer>
        <RegularText>{item.venue}</RegularText>
        <MaxCapacityContainer>
        <RegularText>{item.capacity}</RegularText>
        </MaxCapacityContainer>
      </RowContainer>
      <RegularButton>Book</RegularButton>
    </TouchableOpacity>
  );
  

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

    const renderItem = ({ item }) => {
        return (
          <Item
            item={item}
            onPress={() => console.log("selected " + item.name)}
          />
        );
      };
    
    return <SignedInContainer>
        <FlatList
            data={facilities}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
        />
    </SignedInContainer>
}

export default Home;