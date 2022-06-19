import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { colours } from "../ColourPalette";
//Texts
import RegularText from "../Texts/RegularText";
import LargeText from "../Texts/LargeText";

//Containers
import RowContainer from "./RowContainer";
import MaxCapacityContainer from "./MaxCapacityContainer";

//Styles
const {white, primary} = colours;
const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 20,
    paddingBottom: 10,
    backgroundColor: primary,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 25,
    color: white,
  },
  image: {
    width:'100%', 
    height:183,
    paddingBottom:50,
    borderRadius: 10
  }
});


const FacilityCard = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <Image source={{uri:item.imageURL}}  style={[styles.image]} />
      <LargeText>{item.name}</LargeText>
      <RowContainer>
        <RegularText>{item.venue}</RegularText>
        <MaxCapacityContainer>
        <RegularText>{item.capacity}</RegularText>
        </MaxCapacityContainer>
      </RowContainer>
      <RegularButton>Book</RegularButton>
    </TouchableOpacity>
  );

export default FacilityCard;