import { db } from '../../firebase';
import React from 'react';
import View from 'react-native'
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
    const pressFacil = () => {
    navigation.navigate('HomeScreen');
    }
    const [selected, setSelected] = React.useState("");
    const data = [
      {key:'1',value:'Discussion Rooms         '},
      {key:'2',value:'Event Spaces             '},
      {key:'3',value:'Sports Courts            '},
      {key:'4',value:'Studios                  '},
    ];
  
    return (
      <SignedInContainer>
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
        <RegularButton onPress={pressFacil}>See facilities dummy</RegularButton>
      </SignedInContainer>
    )
}

export default Home1;