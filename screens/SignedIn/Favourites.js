import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  StyleSheet,
  View,
} from "react-native";

//firebase stuff
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

import SignedInContainer from "../../components/containers/SignedInContainer";
import FacilityCard from "../../components/containers/FacilityCard";
import RegularText from "../../components/Texts/RegularText";
import { colours } from "../../components/ColourPalette";
const {white, primary, secondary} = colours;

const Favourites = ({ navigation, route }) => {
  const [favourites, setFavourites] = useState([]);
  const [emptyText, setEmptyText] = useState("");

  useEffect(() => {
    getFavs();
    setTimeout(() => {renderEmptyText()}, 300);
  }, []);
  
  const getFavs = async () => {
    const list = [];
    const favArrRef = doc(db, "users", auth.currentUser.uid);
    const favArrSnap = await getDoc(favArrRef);
    const favouritesArr = favArrSnap.data().favourites;
    for (const facility of favouritesArr) {
        const facilRef = doc(db, "facilities", facility);
        const facilSnap = await getDoc(facilRef);
        list.push(facilSnap.data());
    }
    setFavourites([...list]);
  };

  const renderItem = ({ item }) => {
    return (
      <FacilityCard
        item={item}
        onPress={() => {
          console.log("Navigating to " + item.name);
          navigation.navigate("Facility", { facilityName: item.name });
        }}
      />
    );
  };

  const renderEmptyText = () => {
    setEmptyText("You do not have any favourite facilities");
  }

  return (
    <SignedInContainer>
      {favourites.length >= 1 && (
        <FlatList data={favourites} renderItem={renderItem} />
      )}
      {favourites == "" && (
        <View style = {styles.view}>
          <Text style={styles.text}>{emptyText}</Text>
        </View>
      )}
    </SignedInContainer>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: white,
    textAlign: "center"
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});