import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList
} from "react-native";
import SignedInContainer from "../../components/containers/SignedInContainer";
//Firestore
import { auth, db } from "../../firebase";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  arrayUnion,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
//texts
import LargeText from "../../components/Texts/LargeText";
import RegularText from "../../components/Texts/RegularText";
//Containers
import MaxCapacityContainer from "../../components/containers/MaxCapacityContainer";
import RowContainer from "../../components/containers/RowContainer";
//Others
import { colours } from "../../components/ColourPalette";

const { primary, white, action, tertiary } = colours;

const Participants = ({ navigation, route }) => {
  const organiserUID = route.params.organiserUID;
  const participantsArray = route.params.participantsArray;
  const booking = route.params.booking;
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    getParticipants();
    console.log("organiser UID: " + organiserUID);
    console.log("participants array: " + participantsArray);
  }, []);
  
  /*
  const getParticipants = async () => {
    const list = [];
    const participantsArrRef = doc(db, "bookings", booking);
    const participantsArrSnap = await getDoc(participantsArrRef);
    const participantsArr = participantsArrSnap.data().participants;
    for (const uid of participantsArr) {
        const personRef = doc(db, "users", uid);
        const personSnap = await getDoc(personRef);
        list.push(personSnap.data());
    }
    setFavourites([...list]);
    console.log(organiserUID);
    console.log(list);
  };
  */

  const getParticipants = async () => {
    const list = [];
    for (const uid of participantsArray) {
        const personRef = doc(db, "users", uid);
        const personSnap = await getDoc(personRef);
        //if he has a username, add it to the list, else add his uid to the list
        if (personSnap.exists()) {
          list.push(personSnap.data().username)
        } else {
          list.push(uid);
        }
    }
    setParticipants([...list]);
    console.log(organiserUID);
    console.log(list);
  };

  /*
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
  */

  return (
    <SignedInContainer>
      <LargeText>joe</LargeText>
    </SignedInContainer>
  );
};

export default Participants;
