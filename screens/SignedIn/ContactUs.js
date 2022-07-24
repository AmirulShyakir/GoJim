import React from "react";
import {
  Image,
  StyleSheet,
  Text
} from "react-native";

import MainContainer from "../../components/containers/MainContainer";
import { colours } from "../../components/ColourPalette";
const { primary, secondary, tertiary, white, black, action } = colours;

const ContactUs = ({navigation}) => {
  return (
    <MainContainer>
      <Text style={styles.text}>Hello there</Text>
      <Text style={styles.text2} testID={"text"}>We are Team Sikkunt. We have developed GoJim as an integrated 
      booking app for all NUS facilities for our Orbital project. {"\n\n"}Thanks for downloading 
      GoJim. We appreciate any feedback and you may send them over at our emails. {"\n\n"}-Team Sikkunt
      {"\n\n"}Amirul Shyakir  E0725279@u.nus.edu{"\n"}Muhammad Mursyid  E0725270@u.nus.edu
      {"\n\n"}
      </Text>
      <Image
          testID="image"
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