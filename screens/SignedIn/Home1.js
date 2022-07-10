import { db, auth } from "../../firebase";
import React, { useEffect, useState } from "react";
import { View, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import SignedInContainer from "../../components/containers/SignedInContainer";
import SelectList from "react-native-dropdown-select-list";
import MapView, { Marker } from "react-native-maps";

//texts
import LargeText from "../../components/Texts/LargeText";
import RegularButton from "../../components/Buttons/RegularButton";
import { colours } from "../../components/ColourPalette";
import RowContainer from "../../components/containers/RowContainer";
import SearchButton from "../../components/Buttons/SearchButton";

const { white, secondary, primary } = colours;

const Home1 = ({ navigation, route }) => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
      } else {
        route.params.authenticate(false);
      }
    });
  }, []);

  const pressFacil = () => {
    console.log(selected);
    navigation.navigate("HomeScreen", { facilityType: selected });
  };
  const [selected, setSelected] = useState("");
  const data = [
    { key: "Discussion Rooms", value: "Discussion Rooms" },
    { key: "Event Spaces", value: "Event Spaces" },
    { key: "Sports Courts", value: "Sports Courts" },
    { key: "Studios", value: "Studios" },
  ];

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 1.2975006718982152,
          longitude: 103.7766084407046,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          coordinate={{
            latitude: 1.2975006718982152,
            longitude: 103.7766084407046,
          }}
          title="NUS"
        />
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
        <RegularButton onPress={pressFacil}>Search</RegularButton>
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
});

export default Home1;
