import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  View,
  StyleSheet,
} from "react-native";

//firebase stuff
import { auth, db } from "../../firebase";
import { doc, collection, getDoc, getDocs, query, where } from "firebase/firestore";

import SignedInContainer from "../../components/containers/SignedInContainer";
import FacilityCard from "../../components/containers/FacilityCard";
import { async } from "@firebase/util";

const Favourites = ({ navigation, route }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    getFavs();
  }, []);

  /*const getFacil = async (facility) => {
    const facilRef = doc(db, "facilities", facility);
    const facilSnap = await getDoc(facilRef);
    return facilSnap.data();
  }*/
  
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

  return (
    <SignedInContainer>
      <FlatList data={favourites} renderItem={renderItem} />
    </SignedInContainer>
  );
};

export default Favourites;
