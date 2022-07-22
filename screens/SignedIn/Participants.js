import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList
} from "react-native";
import MainContainer from "../../components/containers/MainContainer";
import ParticipantsCard from "../../components/containers/ParticipantsCard";
//Firestore
import { auth, db } from "../../firebase";
import {
  doc,
  getDoc,
} from "firebase/firestore";
//Others
import { colours } from "../../components/ColourPalette";

const { primary, white, secondary } = colours;

const Participants = ({ route }) => {
  const organiserUID = route.params.organiserUID;
  const [organiserUsername, setOrganiserUsername] = useState("");
  const [organiserProfilePic, setOrganiserProfilePic] = useState("");

  const participantsArray = route.params.participantsArray;
  const [usernames, setUsernames] = useState([]);
  const [profilePics, setProfilePics] = useState([]);

  useEffect(() => {
    getOrganiserDetails();
    getParticipants();
    console.log("this is the organiser: \n" + organiserUID) ;
    console.log("this is the organiser profilePic: \n" + organiserProfilePic);
    console.log("these are the usernames: \n" + usernames)
    console.log("these are the profilePics: \n" + profilePics)
  }, []);

  const getOrganiserDetails = async () => {
    const organiserRef = doc(db, "users", organiserUID);
    const organiserSnap = await getDoc(organiserRef);
    if (organiserSnap.exists()) {
    setOrganiserUsername(organiserSnap.data().username)
    organiserSnap.data().photoURL 
    ? setOrganiserProfilePic(organiserSnap.data().photoURL) 
    : setOrganiserProfilePic("https://www.ukm.my/fper/wp-content/uploads/2021/04/blank-profile-picture-973460_1280-768x768.jpg")
    } else {
      setOrganiserUsername(organiserUID);
      setOrganiserProfilePic("https://www.ukm.my/fper/wp-content/uploads/2021/04/blank-profile-picture-973460_1280-768x768.jpg")
    }
  }

  const getParticipants = async () => {
    const usernameList = [];
    const profilePicList = [];
    for (const uid of participantsArray) {
        const personRef = doc(db, "users", uid);
        const personSnap = await getDoc(personRef);
        //if he has a username, add it to the list, else add his uid to the list
        if (personSnap.exists()) {
          usernameList.push(personSnap.data().username)
          //if he has a profile pic, add it to list, else add this default
          personSnap.data().photoURL 
          ? profilePicList.push(personSnap.data().photoURL) 
          : profilePicList.push("https://www.ukm.my/fper/wp-content/uploads/2021/04/blank-profile-picture-973460_1280-768x768.jpg")
        } else {
          usernameList.push(uid);
          profilePicList.push("https://www.ukm.my/fper/wp-content/uploads/2021/04/blank-profile-picture-973460_1280-768x768.jpg");
        }
    }
    setUsernames([...usernameList]);
    setProfilePics([...profilePicList])
    //console.log(usernameList);
    //console.log(profilePicList);
  };
 
  
  const usernameStub = ["stub1", "stub2", "stub3"];
  const profilePicStub = ["https://xsgames.co/randomusers/avatar.php?g=male", "https://xsgames.co/randomusers/avatar.php?g=male", "https://xsgames.co/randomusers/avatar.php?g=male"]

  const renderItem = ({ usernames, profilePics }) => {
    return (
      <ParticipantsCard
        username={usernames}
        profilePic={profilePics}
      />
    );
  };
  

  return (
    <MainContainer>
      <View style={[styles.view]}>
          <Image source={{uri: organiserProfilePic}}  style={[styles.image]} />
          <Text style={styles.text}>{organiserUsername}</Text>
      </View>
      <FlatList data={{usernames, profilePics}} renderItem={renderItem} />
      <FlatList data={{usernameStub, profilePicStub}} renderItem={renderItem} />
      <ParticipantsCard username={"stub1"} profilePic={"https://xsgames.co/randomusers/avatar.php?g=male"} />
      <ParticipantsCard username={"stub2"} profilePic={"https://xsgames.co/randomusers/avatar.php?g=female"} />
      <ParticipantsCard username={"stub3"} profilePic={"https://xsgames.co/randomusers/avatar.php?g=male"} />
      <ParticipantsCard username={"stub4"} profilePic={"https://xsgames.co/randomusers/avatar.php?g=female"} />
    </MainContainer>
  );
};

export default Participants;

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
    width:40, 
    height:40,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 40,
    color: white,
  }
});