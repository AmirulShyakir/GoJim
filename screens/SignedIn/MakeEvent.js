import MainContainer from "../../components/containers/MainContainer";
import KeyboardAvoidingContainer from "../../components/containers/KeyboardAvoidingContainer";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import RegularButton from "../../components/Buttons/RegularButton";
import { ActivityIndicator, TextInput, StyleSheet } from "react-native";
import { CheckBox } from "@rneui/themed";

import { auth, db } from "../../firebase";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  arrayUnion,
} from "firebase/firestore";
//texts
import LargeText from "../../components/Texts/LargeText";
import MessageBox from "../../components/Texts/MessageBox";
import { colours } from "../../components/ColourPalette";
import RegularText from "../../components/Texts/RegularText";
const { primary, white, secondary, tertiary } = colours;

const MakeEvent = ({ route, navigation }) => {
  const { bookingID } = route.params;
  const [message, setMessage] = useState("");
  /*const [capacity, setCapacity] = useState(0);
  const [facilityName, setFacilityName] = useState("");
  const [facilityType, setFacilityType] = useState("");*/
  const [facility, setFacility] = useState({});
  const [isSuccessMessage, setIsSuccessMessage] = useState("false");
  const [checkEventType1, setCheckEventType1] = useState(false);
  const [checkEventType2, setCheckEventType2] = useState(false);
  const [checkEventType3, setCheckEventType3] = useState(false);
  const [checkEventType4, setCheckEventType4] = useState(false);

  useEffect(() => {
    getFacility();
  }, []);

  // Get facility details
  const getFacility = async () => {
    const bookingRef = doc(db, "bookings", bookingID);
    const bookingSnap = await getDoc(bookingRef);
    const booking = bookingSnap.data();
    const facilityRef = doc(db, "facilities", booking.venue);
    const facilitySnap = await getDoc(facilityRef);
    const facility = facilitySnap.data();
    setFacility(facility);
  };

  //On Submitting the event
  const handleEvent = (values, setSubmitting) => {
    console.log("Event Name: " + values.eventName);
    console.log("Event Description: " + values.eventDescription);
    console.log("Event Capacity: " + values.maxParticipants)
    console.log("Event Type: " + eventTypeChosen());
    setMessage("");
    setSubmitting(true);

    //Firestore commands here
    const bookingRef = doc(db, 'bookings', bookingID);
    setDoc(
      bookingRef,
      {
        event: true,
        eventName: values.eventName,
        eventDescription: values.eventDescription,
        maxParticipants: parseInt(values.maxParticipants),
        eventType: eventTypeChosen(),
        participants: [],
      },
      { merge: true }
    );
    setSubmitting(false);
    navigation.navigate("HomeScreen1");
  };

  const toggleCheckbox = (checkboxNumber) => {
    var toggle = {
      1: setCheckEventType1,
      2: setCheckEventType2,
      3: setCheckEventType3,
      4: setCheckEventType4,
    };
    toggle[checkboxNumber](false);
  };

  const toggleOtherCheckboxes = (thisCheckbox) => {
    for (var i = 1; i <= 4; i++) {
      if (thisCheckbox != i) {
        toggleCheckbox(i);
      }
    }
  };

  const eventTypeChosen = () => {
    if (checkEventType1 == true) {
      return "Friendly Sports";
    } else if (checkEventType2 == true) {
      return "Recreational Training";
    } else if (checkEventType3 == true) {
      return "Networking Sessions";
    } else if (checkEventType4 == true) {
      return "Study Sessions";
    }
  }

  return (
    <MainContainer>
      <LargeText> Enter Details: </LargeText>
      <KeyboardAvoidingContainer>
        <Formik
          initialValues={{ eventName: "", eventDescription: "" }}
          onSubmit={(values, { setSubmitting }) => {
            if ( // CHECK IF ALL FIELDS ARE FILLED
              values.eventName == "" ||
              values.eventDescription == "" ||
              values.maxParticipants == "" ||
              (checkEventType1 == false  &&
              checkEventType2 == false &&
              checkEventType3 == false &&
              checkEventType4 == false)
            ) {
              setMessage("Please fill in all fields");
              setSubmitting(false);
              setIsSuccessMessage(false);
            //Check if Participants is less than capacity of facil
            } else if (values.maxParticipants > facility.capacity) {
              setTimeout(
                () =>
                  setMessage(
                    "Please enter a number less than or equal to " +
                      facility.capacity
                  ),
                500
              );
              setSubmitting(false);
              setIsSuccessMessage(false);
            //Check if Participants is not zero
            } else if (values.maxParticipants == 0) {
              setMessage("Number of participants cannot be zero");
              setSubmitting(false);
              setIsSuccessMessage(false);
            } else {
              setSubmitting(true);
              handleEvent(values, setSubmitting);
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
          }) => (
            <>
              <TextInput
                placeholder="Enter Event Name"
                onChangeText={handleChange("eventName")}
                onBlur={handleBlur("eventName")}
                values={values.eventName}
                style={styles.event}
                maxLength={40}
                placeholderTextColor={tertiary}
              />

              <TextInput
                placeholder="Enter Event Description"
                onChangeText={handleChange("eventDescription")}
                onBlur={handleBlur("eventDescription")}
                values={values.eventDescription}
                style={styles.eventDescription}
                maxLength={200}
                multiline={true}
                placeholderTextColor={tertiary}
              />

              <TextInput
                placeholder="Enter Max Participations"
                onChangeText={handleChange("maxParticipants")}
                onBlur={handleBlur("maxParticipants")}
                values={values.maxParticipants}
                style={styles.maxParticipants}
                keyboardType={"number-pad"}
                maxLength={20}
                placeholderTextColor={tertiary}
              />
              <RegularText>Select Event Type:</RegularText>
              {facility.type == "Sports Courts" &&
                <CheckBox
                title="Friendly Sports"
                checked={checkEventType1}
                onPress={() => {
                  setCheckEventType1(!checkEventType1);
                  toggleOtherCheckboxes(1);
                }}
                values={values.selectedType}
                containerStyle={{ backgroundColor: primary, paddingBottom: 0}}
                textStyle={{color: white}}
              />}
              {(facility.type == "Sports Courts" ||
              facility.type == "Studios" ||
              facility.type == "Event Spaces")
              &&
                <CheckBox
                title="Recreational Training"
                checked={checkEventType2}
                onPress={() => {
                  setCheckEventType2(!checkEventType2);
                  toggleOtherCheckboxes(2);
                }}
                values={values.selectedType}
                containerStyle={{ backgroundColor: primary, paddingBottom: 0}}
                textStyle={{color: white}}
              />}
              {(facility.type == "Discussion Rooms" || 
              facility.type == "Studios" || facility.type == "Event Spaces")
              &&
                <CheckBox
                title="Networking Sessions"
                checked={checkEventType3}
                onPress={() => {
                  setCheckEventType3(!checkEventType3);
                  toggleOtherCheckboxes(3);
                }}
                values={values.selectedType}
                containerStyle={{ backgroundColor: primary, paddingBottom: 0}}
                textStyle={{color: white}}
              />}
              {facility.type == "Discussion Rooms"
              &&
                <CheckBox
                title="Study Sessions"
                checked={checkEventType4}
                onPress={() => {
                  setCheckEventType4(!checkEventType4);
                  toggleOtherCheckboxes(4);
                }}
                values={values.selectedType}
                containerStyle={{ backgroundColor: primary, paddingBottom: 0}}
                textStyle={{color: white}}
              />}
              <MessageBox
                style={{ marginBottom: 0, marginTop: 20 }}
                success={isSuccessMessage}
              >
                {message || " "}
              </MessageBox>

              {!isSubmitting && (
                <RegularButton onPress={handleSubmit}>
                  Confirm Event
                </RegularButton>
              )}
              {isSubmitting && (
                <RegularButton disabled={true}>
                  <ActivityIndicator size="small" color={white} />
                </RegularButton>
              )}
            </>
          )}
        </Formik>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  event: {
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: primary,
    color: white,
    borderColor: secondary,
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 25,
  },
  eventDescription: {
    height: 150,
    padding: 20,
    paddingTop: 15,
    backgroundColor: primary,
    color: white,
    borderColor: secondary,
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 25,
    textAlignVertical: 'top'
  },
  maxParticipants: {
    height: 50,
    padding: 20,
    paddingTop: 15,
    backgroundColor: primary,
    color: white,
    borderColor: secondary,
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 25,
  },
});

export default MakeEvent;
