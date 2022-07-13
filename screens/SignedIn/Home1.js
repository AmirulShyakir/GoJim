import { db, auth } from "../../firebase";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import SignedInContainer from "../../components/containers/SignedInContainer";
import SelectList from "react-native-dropdown-select-list";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { venueCoordinates } from "../../coordinates";

//texts
import LargeText from "../../components/Texts/LargeText";
import RegularButton from "../../components/Buttons/RegularButton";
import { colours } from "../../components/ColourPalette";
import RowContainer from "../../components/containers/RowContainer";
import SearchButton from "../../components/Buttons/SearchButton";
import SmallText from "../../components/Texts/SmallText";
import RegularText from "../../components/Texts/RegularText";

const { white, secondary, primary, black } = colours;

const Home1 = ({ navigation, route }) => {
  const [selected, setSelected] = useState("");
  const [showMarkers, setShowMarkers] = useState(false);
  const [arrOfCoordinates, setArrOfCoordinates] = useState([]);
  const mapRef = useRef();

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

  /*useEffect(() => {
    if (mapRef.current) {
      // list of _id's must same that has been provided to the identifier props of the Marker
      mapRef.current.fitToSuppliedMarkers(
        arrOfCoordinates.map((item, index) => index.toString()),
        { edgePadding: {
          bottom: 10,
          left: 250,
          right: 250,
          top: 800,
      }, animated: true }
      );
    }
  }, [arrOfCoordinates]);*/

  const pressSearch = async () => {
    const list = [];
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
    if (mapRef.current) {
      /*console.log('mapRef is working');
      console.log(arrOfCoordinates);
      console.log(list);*/
      mapRef.current.fitToSuppliedMarkers(
        list.map((item, index) => index.toString()),
        { edgePadding: {
          bottom: 10,
          left: 250,
          right: 250,
          top: 800,
      }, animated: true }
      );
    }
    /*mapRef.current.fitToSuppliedMarkers(
      arrOfCoordinates.map((item, index) => index.toString()),
      {
        edgePadding: {
          bottom: 0,
          left: 250,
          right: 250,
          top: 800,
        },
        animated: true,
      }
    );*/
  };

  return (
    <View>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 1.2975006718982152,
          longitude: 103.7766084407046,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {showMarkers &&
          arrOfCoordinates.map((item, index) => (
            <Marker
              key={index}
              identifier={index.toString()}
              coordinate={item.coordinates}
              onPress={() =>
                navigation.navigate("HomeScreen", {
                  venue: item.name,
                  type: selected,
                })
              }
            >
              <View>
                <View style={styles.bubble}>
                  <TouchableOpacity>
                    <RegularText style={{ color: black }}>
                      {item.name}
                    </RegularText>
                  </TouchableOpacity>
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
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
  // Callout bubble
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
    // marginBottom: -15
  },
});

export default Home1;
