import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Divider } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";
//Firestore
import { auth, db } from "../../firebase";
import {
  doc,
  getDoc,
  arrayRemove,
  updateDoc,
  deleteDoc,
  Timestamp,
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

const { primary, tertiary, white } = colours;

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
    return booking.userUID == auth.currentUser.uid
      ? "Organiser"
      : "Participant";
  };

  // Either deletes booking or withdraws participant from event
  const deleteWitdraw = async () => {
    const bookingRef = doc(db, "bookings", booking.bookingID);

    if (buttonText == "Delete Booking") {
      //DELETE BOOKING from bookings collection as well as facilities booking doc
      const facilDateRef = doc(
        db,
        "facilities",
        booking.venue,
        "bookings",
        booking.date.toDate().toDateString()
      );
      await updateDoc(facilDateRef, {
        timeSlots: arrayRemove(booking.timeSlot),
      });
      await deleteDoc(bookingRef);
      Alert.alert("Deleted Booking", `You have just deleted this booking`, [
        { text: "OK", onPress: () => navigation.navigate("Account1") },
      ]);
    } else {
      //WITHDRAW FROM EVENT use arrayRemove
      await updateDoc(bookingRef, {
        participants: arrayRemove(auth.currentUser.uid),
      });
      Alert.alert(
        "Withdrawn from event",
        `You have just withdrawn ${booking.eventName}`,
        [{ text: "OK", onPress: () => navigation.navigate("Account1") }]
      );
    }
  };

  const seeParticipantsPage = () => {
    navigation.navigate("Participants", {
      booking: booking,
      organiserUID: booking.userUID,
      participantsArray: booking.participants,
    });
  };

  const warnDelete = () => {
    var text = "";
    var text2 = "";
    if (buttonText == "Withdraw from event") {
      text = "Confirm withdraw?";
      text2 = "You are about to withdraw from this event";
    } else {
      text = "Confirm Delete?";
      text2 = "You are about to delete this booking";
    }
    Alert.alert(text, text2, [
      { text: "OK", onPress: deleteWitdraw },
      {
        text: "Cancel",
        onPress: () => console.log("cancel pressed"),
        style: "cancel",
      },
    ]);
  };

  return (
    <MainContainer>
      <ScrollView>
        {booking.event && (
          <View style={{ marginBottom: 20 }}>
            <LargeText>{booking.eventName}</LargeText>
            {booking.date > Timestamp.fromMillis(Date.now()) && (
              <TouchableOpacity onPress={warnDelete} style={styles.delete}>
                <Feather name="trash-2" size={25} color={white} />
              </TouchableOpacity>
            )}
            <RegularText>
              {booking.date.toDate().toDateString()}{" "}
              {showTimeSlot(booking.timeSlot)}
            </RegularText>
            <TouchableOpacity
              onPress={seeParticipantsPage}
              style={styles.participantsContainer}
            >
              <MaxCapacityContainer>
                <RegularText>
                  {booking.participants.length} / {booking.maxParticipants}
                </RegularText>
              </MaxCapacityContainer>
              <RegularText> Participants</RegularText>
            </TouchableOpacity>
            <LargeText>Description</LargeText>
            <RegularText>{booking.eventDescription}</RegularText>
          </View>
        )}
		<LargeText>Venue</LargeText>
		{!booking.event && (
            <TouchableOpacity onPress={warnDelete} style={styles.delete}>
              <Feather name="trash-2" size={25} color={white} />
            </TouchableOpacity>
          )}
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
          <RegularText>
            {facility.venue} {facility.unit}{" "}
          </RegularText>
        </View>
		{!booking.event && 
			<RegularText>
			{booking.date.toDate().toDateString()}{" "}
			{showTimeSlot(booking.timeSlot)}
		  </RegularText>
		}
      </ScrollView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  venueView: {
    marginBottom: 15,
  },
  organisedView: {
    marginBottom: 15,
  },
  container: {
    position: "relative",
  },
  participantsContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
    width: "50%",
  },
  delete: {
    position: "absolute",
    top: 10,
    right: 5,
  },
});

export default BookingDetails;
