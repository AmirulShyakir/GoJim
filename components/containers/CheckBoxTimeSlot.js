import { db } from "../../firebase";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  where,
  getDocs,
  query,
  Timestamp,
  arrayUnion,
} from "firebase/firestore";

import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { CheckBox } from "@rneui/themed";
import RegularButton from "../Buttons/RegularButton";

const CheckBoxTimeSlot = ({ date, facilityName }) => {
  const [check8, setCheck8] = useState(false);
  const [check10, setCheck10] = useState(false);
  const [check12, setCheck12] = useState(false);
  const [check14, setCheck14] = useState(false);
  const [check16, setCheck16] = useState(false);
  const [check18, setCheck18] = useState(false);
  const [check20, setCheck20] = useState(false);

  const [disabled8, setDisabled8] = useState(false);
  const [disabled10, setDisabled10] = useState(false);
  const [disabled12, setDisabled12] = useState(false);
  const [disabled14, setDisabled14] = useState(false);
  const [disabled16, setDisabled16] = useState(false);
  const [disabled18, setDisabled18] = useState(false);
  const [disabled20, setDisabled20] = useState(false);
  const [blocked, setBlocked] = useState(false);
  console.log("A date has been picked: ", date.toDateString());

  const checkAvail = async () => {
    console.log(facilityName.facilityName);
    const list = [];
    const docRef = doc(
      db,
      "facilities",
      facilityName.facilityName,
      "bookings",
      date.toDateString()
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      docSnap.data().timeSlots.forEach((slot) => {
        var disabled = {
          8: setDisabled8,
          10: setDisabled10,
          12: setDisabled12,
          14: setDisabled14,
          16: setDisabled16,
          18: setDisabled18,
          20: setDisabled20,
        }
        disabled[slot](true);
      });
    } 
  };
  
  checkAvail();

  const toggleCheckbox = (checkboxNumber) => {
    var toggle = {
      8: setCheck8,
      10: setCheck10,
      12: setCheck12,
      14: setCheck14,
      16: setCheck16,
      18: setCheck18,
      20: setCheck20,
    }
    toggle[checkboxNumber](false);
  };

  const toggleOtherCheckboxes = (thisCheckbox) => {
    for (var i = 8; i <= 20; i += 2) {
      if (thisCheckbox != i) {
        toggleCheckbox(i);
      }
    }
  };


  const handleSubmit = async () => {
    var checked = {
      8: check8,
      10: check10,
      12: check12,
      14: check14,
      16: check16,
      18: check18,
      20: check20,
    }
    
    for (var i = 8; i <= 20; i += 2) {
      if (checked[i]) {
        // update firestore data - 
        //facilities collection and booking collection

        const docRef = await setDoc(
          doc(
            db,
            "facilities",
            facilityName.facilityName,
            "bookings",
            date.toDateString()
          ),
          {
            timeSlots: arrayUnion(i),
          },
          {merge: true}
        );
        //await setDoc(doc(db, "bookings", docRef.id), { name: 'JOE MAMA'}, {merge: true});*/
      }
  };

  }

  return (
    <View style={styles.checkboxView}>
      <CheckBox
        center
        title="8am - 10am"
        checked={check8}
        onPress={() => {
          setCheck8(!check8);
          toggleOtherCheckboxes(8);
        }}
        containerStyle={{ backgroundColor: "white" }}
        disabled={disabled8}
      />

      <CheckBox
        center
        title="10am-12pm"
        checked={check10}
        onPress={() => {
          setCheck10(!check10);
          toggleOtherCheckboxes(10);
        }}
        containerStyle={{ backgroundColor: "white" }}
        disabled={disabled10}
      />
      <CheckBox
        center
        title="12pm-2pm"
        checked={check12}
        onPress={() => {
          setCheck12(!check12);
          toggleOtherCheckboxes(12);
        }}
        containerStyle={{ backgroundColor: "white" }}
        disabled={disabled12}
      />
      <CheckBox
        center
        title="2pm-4pm"
        checked={check14}
        onPress={() => {
          setCheck14(!check14);
          toggleOtherCheckboxes(14);
        }}
        containerStyle={{ backgroundColor: "white" }}
        disabled={disabled14}
      />

      <CheckBox
        center
        title="4pm-6pm"
        checked={check16}
        onPress={() => {
          setCheck16(!check16);
          toggleOtherCheckboxes(16);
        }}
        containerStyle={{ backgroundColor: "white" }}
        disabled={disabled16}
      />

      <CheckBox
        center
        title="6pm-8pm"
        checked={check18}
        onPress={() => {
          setCheck18(!check18);
          toggleOtherCheckboxes(18);
        }}
        containerStyle={{ backgroundColor: "white" }}
        disabled={disabled18}
      />

      <CheckBox
        center
        title="8pm-10pm"
        checked={check20}
        onPress={() => {
          setCheck20(!check20);
          toggleOtherCheckboxes(20);
        }}
        containerStyle={{ backgroundColor: "white" }}
        disabled={disabled20}
      />
      <RegularButton style={{ alignSelf: "center" }} onPress={handleSubmit}>
        Confirm Time
      </RegularButton>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  checkboxView: {
    alignItems: "flex-start",
  },
});

export default CheckBoxTimeSlot;
