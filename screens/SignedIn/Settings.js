import { auth, db } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Formik } from "formik";
import { updateProfile } from "firebase/auth/react-native";
import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,
  Modal,
  ActivityIndicator,
  TextInput,
} from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import MainContainer from "../../components/containers/MainContainer";
import RowContainer from "../../components/containers/RowContainer";
import { colours } from "../../components/ColourPalette";
//texts
import LargeText from "../../components/Texts/LargeText";
import RegularButton from "../../components/Buttons/RegularButton";
import SmallText from "../../components/Texts/SmallText";
import MessageBox from "../../components/Texts/MessageBox";
import SettingsContainer from "../../components/containers/SettingsContainer";

const { primary, secondary, tertiary, white, black, action } = colours;

const Settings = ({navigation}) => {
  const [profilePicURL, setProfilePicURL] = useState(
    "https://www.ukm.my/fper/wp-content/uploads/2021/04/blank-profile-picture-973460_1280-768x768.jpg"
  );
  const [username, setUsername] = useState("No Username");
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState("false");

  const pressHowItWorks = () => {
    navigation.navigate('OnboardingScreen');
}

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

  const handleChangeUsername = (username, setSubmitting) => {
    setUsername(username);
    updateProfile(auth.currentUser, { displayName: username });
    setSubmitting(false);
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
      getDownloadURL(profilePicRef).then((url) => {
        console.log(url);
        updateProfile(auth.currentUser, { photoURL: url });
      });
    }
  };

  return (
    <MainContainer>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        backdropOpacity={0.5}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.changeUsernameText}>Change Username</Text>
            <Formik
              initialValues={{ username: "" }}
              onSubmit={(values, { setSubmitting }) => {
                if (values.username == "") {
                  setMessage("Please enter username");
                  setSubmitting(false);
                  setIsSuccessMessage(false);
                } else if (values.username.length > 20) {
                  setMessage("Username cannot be more than 20 characters");
                  setSubmitting(false);
                  setIsSuccessMessage(false);
                } else {
                  handleChangeUsername(values.username, setSubmitting);
                  setModalVisible(!modalVisible);
                  setMessage("");
                }
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                isSubmitting,
              }) => (
                <>
                  <TextInput
                    label={"Username"}
                    icon="user"
                    placeholder="Example User"
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    values={values.username}
                    style={styles.textInput}
                  />
                  <MessageBox
                    style={{ marginBottom: 15 }}
                    success={isSuccessMessage}
                  >
                    {message || " "}
                  </MessageBox>

                  <View style={styles.buttonContainer}>
                    {!isSubmitting && (
                      <RegularButton
                        onPress={handleSubmit}
                        style={{ marginHorizontal: 5 }}
                      >
                        Confirm
                      </RegularButton>
                    )}
                    {isSubmitting && (
                      <RegularButton disabled={true} style={{ marginHorizontal: 5 }}>
                        <ActivityIndicator size="small" color={white} />
                      </RegularButton>
                    )}
                    <RegularButton
                      onPress={() => setModalVisible(!modalVisible)}
                      style={{ marginHorizontal: 5 }}
                    >
                      Cancel
                    </RegularButton>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
      <Image style={styles.profilePic} source={{ uri: profilePicURL }} />
      <TouchableOpacity onPress={pickImage}>
          <View style={styles.cameraIconView}> 
            <CameraIcon>
              <Feather name={"camera"} size={15} color={white} />
            </CameraIcon>
          </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.editImage}>
          <Text style={styles.username}>{username}</Text>
          <Icon>
            <Feather name={"edit-2"} size={20} color={white} />
          </Icon>
        </View>
      </TouchableOpacity>
      <Text style={styles.email}>{auth.currentUser.email}</Text>
      <View style={{marginTop: 20}}>
        <SettingsContainer icon = {"bell"}>Notification control</SettingsContainer>
        <SettingsContainer icon = {"help-circle"} onPress={pressHowItWorks}>How it works</SettingsContainer>
        <SettingsContainer icon = {"message-square"}>Contact us</SettingsContainer>
        <SettingsContainer icon = {"log-out"} onPress= {Logout}>Log out</SettingsContainer>
      </View>

      <View style={styles.extraInfoView}>
        <SmallText style={{ alignSelf: "center", marginTop: 15, color: tertiary }}>
         current userID: {auth.currentUser.uid}
        </SmallText>
        <SmallText style={{ alignSelf: "center", color: tertiary }}>GoJim Version 1.0.0</SmallText>
      </View>
    </MainContainer>
  );
};

const CameraIcon = styled.View`
  position: relative;
`;

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
  textInput: {
    height: 50,
    width: "100%",
    marginTop: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  username: {
    fontSize: 20,
    alignSelf: "center",
    color: white,
  },
  changeUsernameText: {
    fontSize: 20,
    color: black,
    fontWeight: "bold",
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
    color: action,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    width: 300,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  cameraIconView:{
    backgroundColor: action,
    borderRadius: 27,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    alignSelf: "center",
    bottom: 45,
    left: 60,
    marginBottom: -30, //im quite sure theres a better way to do this
  },
  extraInfoView: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: 112,
    justifyContent: "space-between"
  },
});

export default Settings;
