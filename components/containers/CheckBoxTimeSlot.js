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
  Timestamp
} from "firebase/firestore";


import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { CheckBox } from "@rneui/themed";
import RegularButton from "../Buttons/RegularButton";

const CheckBoxTimeSlot = ({ date, facilityName }) => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);
  const [check7, setCheck7] = useState(false);

  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [disabled3, setDisabled3] = useState(false);
  const [disabled4, setDisabled4] = useState(false);
  const [disabled5, setDisabled5] = useState(false);
  const [disabled6, setDisabled6] = useState(false);
  const [disabled7, setDisabled7] = useState(false);
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
      docSnap.data().timeSlots.forEach(slot => {
        switch(slot) {
          case 8:
            setDisabled1(true);
            break;
          case 10:
            setDisabled2(true);
            break;
          case 12:
            setDisabled3(true);
            break;
          case 14:
            setDisabled4(true);
            break;
          case 16:
              setDisabled5(true);
              break;
          case 18:
              setDisabled6(true);
              break;
          case 20:
              setDisabled7(true);
              break;
        }
      });
    } else {
      // doc.data() will be undefined in this case
      // all time slots will be available
    }
  };
  checkAvail();
  
  return (
    <View style={styles.checkboxView}>
      <CheckBox
        center
        title="8am - 10am"
        checked={check1}
        onPress={() => setCheck1(!check1)}
        containerStyle={{ backgroundColor: "white" }}
        disabled={disabled1}
      />

      <CheckBox
        center
        title="10am-12pm"
        checked={check2}
        onPress={() => setCheck2(!check2)}
        containerStyle={{ backgroundColor: "white" }}
        disabled={disabled2}
      />
      <CheckBox
        center
        title="12pm-2pm"
        checked={check3}
        onPress={() => setCheck3(!check3)}
        containerStyle={{ backgroundColor: "white" }}
        disabled={disabled3}
      />
      <CheckBox
        center
        title="2pm-4pm"
        checked={check4}
        onPress={() => setCheck4(!check4)}
        containerStyle={{ backgroundColor: "white" }}
        disabled={disabled4}
      />

      <CheckBox
        center
        title="4pm-6pm"
        checked={check5}
        onPress={() => setCheck5(!check5)}
        containerStyle={{ backgroundColor: "white" }}
        disabled={disabled5}
      />

      <CheckBox
        center
        title="6pm-8pm"
        checked={check6}
        onPress={() => setCheck6(!check6)}
        containerStyle={{ backgroundColor: "white" }}
        disabled={disabled6}
      />

      <CheckBox
        center
        title="8pm-10pm"
        checked={check7}
        onPress={() => setCheck7(!check7)}
        containerStyle={{ backgroundColor: "white" }}
        disabled={disabled7}
      />
      <RegularButton style={{ alignSelf: "center" }}>Confirm Time</RegularButton>
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
