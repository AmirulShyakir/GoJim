import { colours } from "../../components/ColourPalette";
import RegularText from "../../components/Texts/RegularText";
import RowContainer from "../../components/containers/RowContainer";
import MaxCapacityContainer from "../../components/containers/MaxCapacityContainer";
import { TouchableOpacity, StyleSheet, Image, Text, View } from "react-native";
import { auth, db } from "../../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import SmallText from "../Texts/SmallText";

const { white, secondary, primary } = colours;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 20,
    paddingBottom: 10,
    backgroundColor: primary,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 10,
    margin: 10,
  },
  image: {
    width: 109,
    height: 65,
    paddingBottom: 50,
    borderRadius: 10,
  },
});


const BookingCard = ({ item, onPress }) => {
    const [facility, setFacility] = useState({});
    const [showSection, setShowSection] = useState(false);
    
    useEffect(() => {
        getFacility();
    }, []);
    
    const getFacility = async () => {
        const docRef = doc(db, 'facilities', item.venue);
        const docSnap = await getDoc(docRef);
        const facility = docSnap.data();
        setFacility(facility);
    }

    const showTimeSlotChosen = () => {
      var timeDisplayed = {
        8: "8am - 10am",
        10: "10am-12pm",
        12: "12pm-2pm",
        14: "2pm-4pm",
        16: "4pm-6pm",
        18: "6pm-8pm",
        20: "8pm-10pm",
      };
      return timeDisplayed[item.timeSlot];
    };

    const checkParticipantOrganiser = () => {
      const findCurrentUser = (participant) => {
        return participant == auth.currentUser.uid;
      }
      
      if (item.participants.findIndex(findCurrentUser) >= 0) {
        return "Participant";
      } else if (item.userUID == auth.currentUser.uid) {
        return "Organiser";
      }
    };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <RowContainer style={{ justifyContent: "flex-start" }}>
        <Image source={{ uri: facility.imageURL }} style={[styles.image]} />
        <View style={{ marginHorizontal: 15, flex: 1, flexGrow: 1 }}>
          <RegularText>{facility.name}</RegularText>
          <SmallText>{facility.venue}</SmallText>
        </View>
      </RowContainer>
      <RowContainer>
        <SmallText>{item.date.toDate().toDateString()}</SmallText>
        <SmallText>{showTimeSlotChosen()}</SmallText>
      </RowContainer>
      {item.event && (
        <View>
          <RowContainer>
            <RegularText>{item.eventName}</RegularText>
            <MaxCapacityContainer>
              <RegularText>
                {item.participants.length}/{item.maxParticipants}
              </RegularText>
            </MaxCapacityContainer>
          </RowContainer>
          <SmallText>{checkParticipantOrganiser()}</SmallText>
        </View>
      )}
    </TouchableOpacity>
  );
};


/*
<RegularText>{item.eventName} </RegularText>
      <RowContainer>
        <RegularText>{facility.venue}</RegularText>
        <MaxCapacityContainer>

        </MaxCapacityContainer>
      </RowContainer>
 */ 

export default BookingCard;
