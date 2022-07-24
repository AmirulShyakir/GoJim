import { auth, db } from "../../firebase";
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth/react-native";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
  TextInput,
} from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import MainContainer from "../../components/containers/MainContainer";
import { colours } from "../../components/ColourPalette";
//texts
import RegularButton from "../../components/Buttons/RegularButton";
import SmallText from "../../components/Texts/SmallText";
import RegularText from "../../components/Texts/RegularText";
import MessageBox from "../../components/Texts/MessageBox";
import SettingsContainer from "../../components/containers/SettingsContainer";

const { primary, secondary, tertiary, white, black, action } = colours;

const ContactUs = ({navigation}) => {
  return (
    <MainContainer>
      <Text style={styles.text}>Hello there</Text>
      <Text style={styles.text2}>We are Team Sikkunt. We have developed GoJim as an integrated 
      booking app for all NUS facilities for our Orbital project. {"\n\n"}Thanks for downloading 
      GoJim. We appreciate any feedback and you may send them over at our emails. {"\n\n"}-Team Sikkunt
      {"\n\n"}Amirul Shyakir  E0725279@u.nus.edu{"\n"}Muhammad Mursyid  E0725270@u.nus.edu
      {"\n\n"}
      </Text>
      <Image
          source={require("../../assets/GOJIM.png")}
          style={{
            width: 80,
            height: 50,
            resizeMode: "contain",
            alignSelf: "center",
            position: "absolute",
            bottom: 20,
          }}
        />
    </MainContainer>
  );
};


export default ContactUs;

const styles = StyleSheet.create({
  text: {
    color: white,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    
  },
  text2: {
    color: white,
    fontSize: 15,
  },
});