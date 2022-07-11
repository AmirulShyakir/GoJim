import { db, auth } from "../../firebase";
import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { collection, doc, getDoc, getDocs, query,where } from "firebase/firestore";
import SignedInContainer from "../../components/containers/SignedInContainer";
import SelectList from "react-native-dropdown-select-list";
import MapView, { Callout, Marker } from "react-native-maps";
import { venueCoordinates } from "../../coordinates";

//texts
import LargeText from "../../components/Texts/LargeText";
import RegularButton from "../../components/Buttons/RegularButton";
import { colours } from "../../components/ColourPalette";
import RowContainer from "../../components/containers/RowContainer";
import SearchButton from "../../components/Buttons/SearchButton";
import SmallText from "../../components/Texts/SmallText";
import RegularText from "../../components/Texts/RegularText";

const { white, secondary, primary } = colours;

const Home1 = ({ navigation, route }) => {
  const [selected, setSelected] = useState("");
  const [showMarkers, setShowMarkers] = useState(false);
  const [arrOfCoordinates, setArrOfCoordinates] = useState([]);
  
  const data = [
    { key: "Discussion Rooms", value: "Discussion Rooms" },
    { key: "Event Spaces", value: "Event Spaces" },
    { key: "Sports Courts", value: "Sports Courts" },
    { key: "Studios", value: "Studios" },
  ];


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
      } else {
        route.params.authenticate(false);
      }
    });
  }, []);

  const pressSearch = async () => {
    const list = [];
    // OG CODE
    console.log(selected);
    //navigation.navigate("HomeScreen", { facilityType: selected });

    // IMPLEMENTING NEW ONE HERE
    // using Set here so that it can avoid duplicates
    const setOfFacilityStrings = new Set(); 
    
    /*
    Read from firestore relevant facilities 
    and collect strings to a set
    */
    const discussionRooms = query(
      collection(db, "facilities"),
      where("type", "==", selected)
    );
    const dRoomsSnapshot = await getDocs(discussionRooms);
    dRoomsSnapshot.forEach((facility) => {
      setOfFacilityStrings.add(facility.data().venue);
    });
    
    //Match the string to coordinate object
    for (const str of setOfFacilityStrings) {
      for (const obj of venueCoordinates) {
        if (str === obj.name) {
          list.push(obj);
        }
      }
    }
    console.log(setOfFacilityStrings);
    setArrOfCoordinates([...list]);
    setShowMarkers(true);
    
  };

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 1.2975006718982152,
          longitude: 103.7766084407046,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {showMarkers && arrOfCoordinates.map((item, index) => (
          <Marker key={index} title={item.name} coordinate={item.coordinates}>
            <Callout tooltip onPress={() => console.log(item.name)}>
              <View style={styles.bubble}>
                <TouchableOpacity>
                  <RegularText>{item.name}</RegularText>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={{ padding: 5, position: "absolute", width: "100%" }}>
        <SelectList
          placeholder="Facility Types"
          setSelected={setSelected}
          data={data}
          boxStyles={{
            backgroundColor: white,
            marginRight: 150,
          }}
          dropdownStyles={{
            backgroundColor: white,
            marginRight: 150,
          }}
        />
        <RegularButton onPress={pressSearch}>Search</RegularButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: primary,
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
});

export default Home1;
