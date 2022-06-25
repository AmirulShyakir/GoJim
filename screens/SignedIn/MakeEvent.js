import MainContainer from "../../components/containers/MainContainer";
import KeyboardAvoidingContainer from "../../components/containers/KeyboardAvoidingContainer";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import StyledEventInput from "../../components/Inputs/StyledTextInput";
import RegularButton from "../../components/Buttons/RegularButton";
import { ActivityIndicator, TextInput, StyleSheet } from "react-native";

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
const { primary, white, secondary, tertiary } = colours;

const MakeEvent = ({ route }) => {
  const { bookingID } = route.params;
  const [message, setMessage] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [facilityName, setFacilityName] = useState("");
  const [facilityType, setFacilityType] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState("false");

  useEffect(() => {
    getFacilityName();
    getFacilityDetails();
  }, []);

  // Get facility details
  const getFacilityName = async () => {
    //get facil name
    const bookingRef = doc(db, "bookings", bookingID);
    const bookingSnap = await getDoc(bookingRef);
    const booking = bookingSnap.data();
    setFacilityName(booking.venue);
    console.log(facilityName);
  };

  const getFacilityDetails = async () => {
    //get facil capacity and type
    const facilityRef = doc(db, "facilities", facilityName);
    const facilitySnap = await getDoc(facilityRef);
    if (facilitySnap.exists()) {
      console.log("Document data:", facilitySnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    const facility = facilitySnap.data();
    setCapacity(facility.capacity);
    setFacilityType(facility.type);
    console.log(capacity + facilityType);
  }


  //get maxCapacity
  //get facility type => determine eventType

  const handleEvent = (values, setSubmitting) => {
    console.log("Event Name:" + values.eventName);
    console.log("Event Description:" + values.eventDescription);
    setMessage("");
    setSubmitting(false);
  };

  return (
    <MainContainer>
      <LargeText> EVENT </LargeText>
      <KeyboardAvoidingContainer>
        <Formik
          initialValues={{ eventName: "", eventDescription: "" }}
          onSubmit={(values, { setSubmitting }) => {
            if (
              values.eventName == "" ||
              values.eventDescription == "" ||
              values.maxParticipants == ""
            ) {
              setMessage("Please fill in all fields");
              setSubmitting(false);
              setIsSuccessMessage(false);
            } else if (values.maxParticipants >= capacity) {
              setTimeout(() => setMessage(
                "Please enter a number less than or equal to " + capacity
              ), 500);
              setSubmitting(false);
              setIsSuccessMessage(false);
            } else if ((values.maxParticipants == 0)) {
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

              <MessageBox
                style={{ marginBottom: 20 }}
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
      <RegularButton onPress = {() => console.log("Capacity: " + capacity + " Name: " + facilityName + " Type: " + facilityType)}>press me</RegularButton>
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
