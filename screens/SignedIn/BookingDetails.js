import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
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
  arrayRemove,
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

const BookingDetails = ({ navigation, route }) => {
  const { booking } = route.params;
  const [facility, setFacility] = useState({});
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    getFacility();
    changeButtonText();
  }, []);

  /* 
  Retrieve the facility where the event will be held. 
  The facilitiy object will be used for the venue pic
  and the venue details (AKA the building name)
  */
  const getFacility = async () => {
    console.log(booking.venue);
    const docRef = doc(db, "facilities", booking.venue);
    const docSnap = await getDoc(docRef);
    const facility = docSnap.data();
    setFacility(facility);
  };

  /*
  Set button text to be relevant (either witdraw from event or delete booking)
  */
 const changeButtonText = () => {
   if (booking.event && booking.userUID != auth.currentUser.uid) {
     setButtonText("Withdraw from event");
   } else {
     setButtonText("Delete Booking");
   }
 };

  /* 
  Convert the timeSlot number field in a 
  booking document to a string that can be displayed
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

  //Check if current user is a participant or organiser so that it can display the suitable text
  const checkParticipantOrganiser = () => {
    return (booking.userUID == auth.currentUser.uid) ? "Organiser" : "Participant";
  };

  const deleteWitdraw = async () => {
    const bookingRef = doc(db, "bookings", booking.bookingID);

    if (buttonText == "Delete Booking") {
        //DELETE BOOKING from bookings collection as well as facilities booking doc
        console.log("You have deleted this booking!");
    } else {
        //WITHDRAW FROM EVENT use arrayRemove
        await updateDoc(bookingRef, {participants: arrayRemove(auth.currentUser.uid)});
        Alert.alert(
          "Withdrawn from event",
          `You have just withdrawn ${booking.eventName}`,
          [{ text: "OK", onPress: () => navigation.navigate("Account1") }]
        );
    }
  }

  return (
    <MainContainer>
      {booking.event && 
      <View style={{marginBottom: 5}}>
      <LargeText>{booking.eventName}</LargeText>
      <RegularText>{checkParticipantOrganiser()}</RegularText> 
      </View>
    }
      <Image
        style={{
          width: "100%",
          height: 200,
          borderRadius: 10,
        }}
        source={{ uri: facility.imageURL }}
      />
      <View style={styles.venueView}>
        <LargeText>{booking.venue}</LargeText>
        <RegularText>{facility.venue}</RegularText>
      </View>
      <RowContainer>
        <RegularText>{booking.date.toDate().toDateString()}</RegularText>
        <RegularText>{showTimeSlot(booking.timeSlot)}</RegularText>
        {booking.event &&
            <MaxCapacityContainer>
          <RegularText>
            {booking.participants.length} / {booking.maxParticipants}
          </RegularText>
        </MaxCapacityContainer>
        }
      </RowContainer>
      <RegularText>{booking.eventDescription}</RegularText>
      {booking.event && (booking.userUID != auth.currentUser.uid) &&
        <View style={styles.organisedView}>
        <RegularText>Organised by: {booking.userUID}</RegularText>
      </View>
      }
      <View style={styles.container}>
        <RegularButton onPress={deleteWitdraw}>{buttonText}</RegularButton>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  venueView: {
    marginBottom: 15,
  },
  organisedView: {
    marginVertical: 15,
  },
  container: {
    right: 10,
    left: 10,
    position: "absolute",
    bottom: 10,
  },
});

export default BookingDetails;
