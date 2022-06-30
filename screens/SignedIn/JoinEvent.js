import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Modal,
  Alert,
} from "react-native";

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
} from "firebase/firestore";
//texts
import LargeText from "../../components/Texts/LargeText";
import RegularText from "../../components/Texts/RegularText";
//Containers
import MainContainer from "../../components/containers/MainContainer";
import MaxCapacityContainer from "../../components/containers/MaxCapacityContainer";
import RowContainer from "../../components/containers/RowContainer";
//Others
import RegularButton from "../../components/Buttons/RegularButton";
import { colours } from "../../components/ColourPalette";

const { primary } = colours;

const JoinEvent = ({ navigation, route }) => {
  const { eventDetails } = route.params;
  const [facility, setFacility] = useState({});

  useEffect(() => {
    getFacility();
  }, []);

  /* 
  Retrieve the facility where the event will be held. 
  The facilitiy object will be used for the venue pic
  and the venue details (AKA the building name)
  */
  const getFacility = async () => {
    console.log(eventDetails.venue);
    const docRef = doc(db, "facilities", eventDetails.venue);
    const docSnap = await getDoc(docRef);
    const facility = docSnap.data();
    setFacility(facility);
  };

  /* 
  Convert the timeSlot number field in a 
  booking document to a string that can be displayed.
  */
  const showTimeSlot = (timeSlot) => {
    var timeDisplayed = {
      8: "8am - 10am",
      10: "10am-12pm",
      12: "12pm-2pm",
      14: "2pm-4pm",
      16: "4pm-6pm",
      18: "6pm-8pm",
      20: "8pm-10pm",
    };
    return timeDisplayed[timeSlot];
  };

  /*
  Update firestore of the new participant. Currently does not 
  work as we dont have access to the event document ID
  */
  const joinEvent = async () => {
    console.log("You just joined: " + eventDetails.eventName);
    const docRef = doc(db, "bookings", eventDetails.bookingID);
    await updateDoc(docRef, {
        participants: arrayUnion(auth.currentUser.uid)
    });
  };

  return (
    <MainContainer>
      <LargeText>{eventDetails.eventName}</LargeText>
      <Image
        style={{
          width: "100%",
          height: 200,
          borderRadius: 10,
        }}
        source={{ uri: facility.imageURL }}
      />
      <LargeText>{eventDetails.venue}</LargeText>
      <RegularText>{facility.venue}</RegularText>
      <RowContainer>
        <RegularText>{eventDetails.date.toDate().toDateString()}</RegularText>
        <RegularText>{showTimeSlot(eventDetails.timeSlot)}</RegularText>
        <MaxCapacityContainer>
          <RegularText>
            {eventDetails.participants.length} / {eventDetails.maxParticipants}
          </RegularText>
        </MaxCapacityContainer>
      </RowContainer>
      <RegularText>{eventDetails.eventDescription}</RegularText>
      <View style={styles.container}>
        <RegularButton onPress={joinEvent}>
          Join Event
        </RegularButton>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: primary,
    padding: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 22,
  },
  container: {
    right: 10,
    left: 10,
    position: "absolute",
    bottom: 10,
  },
});

export default JoinEvent;
