import { Image, StyleSheet, View, Text } from "react-native";
import { colours } from "../ColourPalette";

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


const ParticipantsCard = ({ username, profilePic }) => (  
  <View style={[styles.view]}>
      <Image source={{uri: profilePic}}  style={[styles.image]} />
      <Text style={styles.text}>{username}</Text>
  </View>
);

export default ParticipantsCard;