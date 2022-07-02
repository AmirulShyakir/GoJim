import { auth, db } from "../../firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage" 
import { updateProfile } from "firebase/auth/react-native";
import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import MainContainer from "../../components/containers/MainContainer";
import { colours } from "../../components/ColourPalette";
//texts
import LargeText from "../../components/Texts/LargeText";
import PressableText from "../../components/Texts/PressableText";
import RegularButton from "../../components/Buttons/RegularButton";
import SmallText from "../../components/Texts/SmallText";

const { primary, secondary, tertiary, white } = colours;

const Settings = () => {
  const [profilePicURL, setProfilePicURL] = useState(
    "https://www.ukm.my/fper/wp-content/uploads/2021/04/blank-profile-picture-973460_1280-768x768.jpg"
  );
  const [username, setUsername] = useState("No Username");

  useEffect(() => {
    console.log("profilePicURL: " + auth.currentUser.photoURL);
    if (auth.currentUser.photoURL) {
      setProfilePicURL(auth.currentUser.photoURL);
    }
  }, [auth.currentUser]);

  useEffect(() => {
    console.log("username: " + auth.currentUser.displayName);
    if (auth.currentUser.displayName) {
      setUsername(auth.currentUser.displayName);
    }
  }, [auth.currentUser]);

  const Logout = () => {
    auth.signOut();
  };

  const editImage = () => {
    Alert.alert("choose image");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
        setProfilePicURL(result.uri);
        //gets firestore and image reference
        const storage = getStorage();
        const profilePicRef = ref(storage, "profilePic/" + auth.currentUser.uid);
        //converts image to array of bytes
        const image = await fetch(result.uri);
        const bytes = await image.blob();
        //uploads image
        await uploadBytes(profilePicRef, bytes);
    }
  };

  return (
    <MainContainer>
      <LargeText>Profile Settings</LargeText>
      <Image style={styles.profilePic} source={{ uri: profilePicURL }} />
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.editImage}>
          <Text style={styles.editImageText}>edit image</Text>
          <Icon>
            <Feather name={"edit-2"} size={15} color={white} />
          </Icon>
        </View>
      </TouchableOpacity>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.email}>{auth.currentUser.email}</Text>
      <RegularButton onPress={Logout}> Log out </RegularButton>
      <SmallText style={{ alignSelf: "center" }}>
        current userID: {auth.currentUser.uid}
      </SmallText>
      <SmallText style={{ alignSelf: "center" }}>GoJim Version 1.0.0</SmallText>
    </MainContainer>
  );
};

const Icon = styled.View`
  position: relative;
  padding-left: 10px;
  z-index: 1;
`;

const styles = StyleSheet.create({
  profilePic: {
    width: 150,
    height: 150,
    marginVertical: 10,
    borderRadius: 75,
    alignSelf: "center",
  },
  username: {
    fontSize: 20,
    alignSelf: "center",
    color: white,
  },
  email: {
    fontSize: 20,
    alignSelf: "center",
    color: tertiary,
  },
  editImage: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  editImageText: {
    fontSize: 13,
    alignSelf: "center",
    color: white,
  },
});

export default Settings;
