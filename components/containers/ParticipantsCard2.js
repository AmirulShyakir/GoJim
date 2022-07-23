import { Image, StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { colours } from "../ColourPalette";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

//Styles
const {white, primary, secondary} = colours;
const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignContent: 'center',
    alignItems: "center",
    backgroundColor: primary,
    paddingVertical: 15,
    borderColor: secondary,
    borderTopWidth: 1,
  },
  image: {
    width:20, 
    height:20,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    color: white,
  }
});


const ParticipantsCard2 = (uid) => {  
  const [username, setUsername] = useState("hello");
  const [profilePic, setProfilePic] = useState(
    "https://www.ukm.my/fper/wp-content/uploads/2021/04/blank-profile-picture-973460_1280-768x768.jpg"
  );

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      setUsername(userSnap.data().username);
      userSnap.data().photoURL
        ? setProfilePic(userSnap.data().photoURL)
        : setProfilePic(
            "https://www.ukm.my/fper/wp-content/uploads/2021/04/blank-profile-picture-973460_1280-768x768.jpg"
          );
    } else {
      setUsername(uid);
      setProfilePic(
        "https://www.ukm.my/fper/wp-content/uploads/2021/04/blank-profile-picture-973460_1280-768x768.jpg"
      );
    }
  };
  
  return (
  <View style={[styles.view]}>
      <Image source={{uri: profilePic}}  style={[styles.image]} />
      <Text style={styles.text}>{username}</Text>
  </View>
  )
}

export default ParticipantsCard2;