import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Text, FlatList} from "react-native";
import MainContainer from "../../components/containers/MainContainer";
import ParticipantsCard from "../../components/containers/ParticipantsCard";
import ParticipantsCard2 from "../../components/containers/ParticipantsCard2";
//Firestore
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
//Others
import { colours } from "../../components/ColourPalette";
import RegularText from "../../components/Texts/RegularText";
import LargeText from "../../components/Texts/LargeText";
const { primary, white, secondary } = colours;

const Participants = ({ route }) => {
  //organiser details
  const organiserUID = route.params.organiserUID;
  const [organiserUsername, setOrganiserUsername] = useState("hello");
  const [organiserProfilePic, setOrganiserProfilePic] = useState(
    "https://www.ukm.my/fper/wp-content/uploads/2021/04/blank-profile-picture-973460_1280-768x768.jpg"
  );

  //participants details
  const participantsArray = route.params.participantsArray;

  useEffect(() => {
    getOrganiserDetails();
    //getParticipants();
    console.log(participantsArray);
    console.log(Array.isArray(participantsArray));
  }, []);
  
  const getOrganiserDetails = async () => {
    const organiserRef = doc(db, "users", organiserUID);
    const organiserSnap = await getDoc(organiserRef);
    if (organiserSnap.exists()) {
      setOrganiserUsername(organiserSnap.data().username);
      organiserSnap.data().photoURL
        ? setOrganiserProfilePic(organiserSnap.data().photoURL)
        : setOrganiserProfilePic(
            "https://www.ukm.my/fper/wp-content/uploads/2021/04/blank-profile-picture-973460_1280-768x768.jpg"
          );
    } else {
      setOrganiserUsername(organiserUID);
      setOrganiserProfilePic(
        "https://www.ukm.my/fper/wp-content/uploads/2021/04/blank-profile-picture-973460_1280-768x768.jpg"
      );
    }
  };

  const renderItem2 = ( {item} ) => {
    console.log("im passing the following uid to card: " + item)
    return <ParticipantsCard2 uid={item}/>;
  };

  return (
    <MainContainer>
      <View style={[styles.view]}>
        <Image source={{ uri: organiserProfilePic }} style={[styles.image]} />
        <Text style={styles.text}>{organiserUsername}</Text>
      </View>
      <FlatList data={participantsArray} renderItem={renderItem2} />
    </MainContainer>
  );
};

export default Participants;

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: primary,
    paddingVertical: 15,
    borderColor: secondary,
    borderTopWidth: 1,
    flexWrap: "wrap",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    color: white,
  }
});
