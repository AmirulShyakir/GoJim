import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, View, Text, Modal } from "react-native";

//Firestore
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc, addDoc, collection, arrayUnion} from "firebase/firestore";
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
import CheckBoxTimeSlot from "../../components/containers/CheckBoxTimeSlot";

const { primary } = colours;

const Facility = ({ route }) => {
  const facilityName = route.params.facilityName;

  const [facility, setFacility] = useState({});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateString, setSelectedDateString] = useState("Select Date");
  const [selectedDateObject, setSelectedDateObject] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [timeSlotChosen, setTimeSlotChosen] = useState(0);

  useEffect(() => {
    getFacility();
  }, []);

  const getFacility = async () => {
    const docRef = doc(db, "facilities", facilityName);
    const docSnap = await getDoc(docRef);
    const facility = docSnap.data();
    setFacility(facility);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const selectDate = async (date) => {
    date.setHours(0, 0, 0);

    //backend shit
    /*const docRef = await addDoc(collection(db, "bookings"), {
        startTime: date
      });
      console.log("Document written with ID: ", docRef.id);
    
    await setDoc(doc(db, "bookings", docRef.id), { name: 'JOE MAMA'}, {merge: true});*/

    setSelectedDateString(date.toDateString());
    setSelectedDateObject(date);
    hideDatePicker();
    setTimeout(() => setModalVisible(true), Platform.OS === "ios" ? 500 : 0);
  };

  const callbackFunction = (childData) => {
    setTimeSlotChosen(childData)
    console.log(childData);
  };

  const updateFiretore = async () => {
    //Update Facil array
    if (timeSlotChosen != 0 && selectedDateString !== "Select Date") {
      await setDoc(
        doc(
          db,
          "facilities",
          facilityName,
          "bookings",
          selectedDateString
        ),
        {
          timeSlots: arrayUnion(timeSlotChosen),
        },
        {merge: true}
      );
      //Update Bookings
      await addDoc(
        collection(
          db,
          "bookings"
          ),      
          {
            venue: facilityName,
            date: selectedDateString,
            timeSlot: timeSlotChosen,
            userUID: auth.currentUser.uid
        }
      );
    }
  }

  const showTimeSlotChosen = () => {
    if(timeSlotChosen == 0) {
      return "";
    } else {
      var timeDisplayed = {
        8: ",  8am - 10am",
        10: ",  10am-12pm",
        12: ",  12pm-2pm",
        14: ",  2pm-4pm",
        16: ",  4pm-6pm",
        18: ",  6pm-8pm",
        20: ",  8pm-10pm",
      }
      return timeDisplayed[timeSlotChosen];
    }
  }

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
        <RegularButton onPress={showDatePicker}>
          {selectedDateString} {showTimeSlotChosen()}
        </RegularButton>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={selectDate}
          onCancel={hideDatePicker}
          textColor="black"
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CheckBoxTimeSlot
                date={selectedDateObject}
                facilityName={{ facilityName }}
                timeSlotChosen={callbackFunction}
              />
              <RegularButton
                onPress={() => setModalVisible(!modalVisible)}
                style={{ alignSelf: "center" }}
              >
                Close Modal
              </RegularButton>
            </View>
          </View>
        </Modal>
        <RegularButton onPress={updateFiretore}>Confirm Booking</RegularButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: primary,
    padding: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 50,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Facility;
