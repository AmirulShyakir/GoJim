import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, View, Text } from "react-native";

//Firestore
import { db } from "../../firebase";
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";
//texts
import LargeText from "../../components/Texts/LargeText";
import RegularText from "../../components/Texts/RegularText";
//Containers
import MaxCapacityContainer from "../../components/containers/MaxCapacityContainer";
import RowContainer from "../../components/containers/RowContainer";
//Others
import RegularButton from "../../components/Buttons/RegularButton";
import { colours } from "../../components/ColourPalette";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { async } from "@firebase/util";

const { primary } = colours;

const Facility = ({ route }) => {
  const facilityName = route.params.facilityName;

  const [facility, setFacility] = useState({});

  useEffect(() => {
    getFacility();
  }, []);

  const getFacility = async () => {
    const docRef = doc(db, "facilities", facilityName);
    const docSnap = await getDoc(docRef);
    const facility = docSnap.data();
    setFacility(facility);
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (date) => {
    console.log("A date has been picked: ", date.toDateString());
    console.log("A date has been picked: ", date);
    const docRef = await addDoc(collection(db, "bookings"), {
        startTime: date
      });
      console.log("Document written with ID: ", docRef.id);
    
    await setDoc(doc(db, "bookings", docRef.id), { name: 'JOE MAMA'}, {merge: true});
    hideDatePicker();
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Image
        style={{ width: "100%", height: 200, borderRadius: 10 }}
        source={{ uri: facility.imageURL }}
      />
      <LargeText>{facilityName}</LargeText>
      <RowContainer>
        <RegularText>{facility.venue}</RegularText>
        <MaxCapacityContainer>
          <RegularText>{facility.capacity}</RegularText>
        </MaxCapacityContainer>
      </RowContainer>
      <RegularText>{facility.description}</RegularText>
      <View>
        <RegularButton onPress={showDatePicker}>Make Booking</RegularButton>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: primary,
    padding: 25,
  },
});

export default Facility;
