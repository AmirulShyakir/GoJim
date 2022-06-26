import { db, auth } from '../../firebase';
import React, { useEffect, useState } from 'react';
import {View, ImageBackground} from 'react-native'
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import SignedInContainer from '../../components/containers/SignedInContainer';
import SelectList from 'react-native-dropdown-select-list';
//texts
import LargeText from '../../components/Texts/LargeText';
import RegularButton from '../../components/Buttons/RegularButton';
import { colours} from '../../components/ColourPalette';
import RowContainer from '../../components/containers/RowContainer';
import SearchButton from '../../components/Buttons/SearchButton';

const {white, secondary, primary} = colours;

const Home1 = ({navigation, route}) => {
  useEffect(() => {
    auth.onAuthStateChanged( (user) => {
        if(user){
      
        } else {
            route.params.authenticate(false);
        }   
    })
  },[])

  const pressFacil = () => {
    console.log(selected);
    navigation.navigate('HomeScreen', {facilityType: selected});
  }
  const [selected, setSelected] = useState("");
  const data = [
    {key:'Discussion Rooms',value:'Discussion Rooms'},
    {key:'Event Spaces',value:'Event Spaces'},
    {key:'Sports Courts',value:'Sports Courts'},
    {key:'Studios',value:'Studios'},
  ];
  
  return (
    <ImageBackground 
      source={{uri: 'https://firebasestorage.googleapis.com/v0/b/gojim-1d589.appspot.com/o/dark_mode_map.jpg?alt=media&token=af87d869-f225-413e-9b9b-7c9b02155255'}}
      style={{height: '100%'}}
    >
      <SelectList
        placeholder='Facility Types'
        setSelected={setSelected} data={data} 
        boxStyles={{
          backgroundColor: white,
          marginRight: 150,
        }}
        dropdownStyles={{
          backgroundColor: white,
          marginRight: 150,
        }}
      />
      <RegularButton onPress={pressFacil}>Search</RegularButton>
      <LargeText>This map is a stub</LargeText>
    </ImageBackground>
  )
}

export default Home1;