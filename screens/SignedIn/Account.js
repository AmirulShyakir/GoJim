import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp
} from "firebase/firestore";
import { Image, FlatList, StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from "react";
import SignedInContainer from "../../components/containers/SignedInContainer";
import BookingCard from "../../components/containers/BookingCard";
//texts
import LargeText from "../../components/Texts/LargeText";
import { colours } from "../../components/ColourPalette";
const {white, primary, secondary} = colours;

const Account = ({navigation, route}) => {
  const [bookings, setBookings] = useState([]);
  const [emptyText, setEmptyText] = useState("");
  //isUpcoming is a string that is either ">" || "<=" that will be
  //used in where() in getData()
  const isUpcoming = route.params;
  console.log("This has reached the next page: " + isUpcoming);

  useEffect(() => {
    getData();
    setTimeout(() => {renderEmptyText(isUpcoming)}, 300);
  }, []);

  const getData = async () => {
    const list = [];
    //update list to fill in participated events (currently does not work)
    const events = query(
      collection(db, "bookings"),
      where("participants", "array-contains", auth.currentUser.uid),
      where("date", isUpcoming, Timestamp.fromMillis(Date.now()))
    );
    const eventsSnapshot = await getDocs(events);
    eventsSnapshot.forEach((event) => {
      list.push(event.data());
    });
    
    //update list to fill in bookings
    const bookings = query(
      collection(db, "bookings"),
      where("userUID", "==", auth.currentUser.uid), 
      where("date", isUpcoming, Timestamp.fromMillis(Date.now()))
    );
    
    const bookingsSnapshot = await getDocs(bookings);
    bookingsSnapshot.forEach((booking) => {
      list.push(booking.data());
    });
    if (isUpcoming == ">") {
      list.sort((a, b) => a.date.toDate() - b.date.toDate());
    } else {
      list.sort((a, b) => b.date.toDate() - a.date.toDate());
    }
    setBookings([...list]);
  };


  const renderItem = ({ item }) => {
    return (
      <BookingCard
        item={item}
        onPress={() => {
          navigation.navigate("BookingDetails", {booking: item});
        }}
      />
    );
  };

  const renderEmptyText = (isUpcoming) => {
    if (isUpcoming == ">") {
      setEmptyText("You do not have any upcoming bookings")
    } else {
      setEmptyText("You do not have any past bookings");
    }
  }

  return (
    <SignedInContainer>
      {bookings.length >= 1 && (
        <FlatList data={bookings} renderItem={renderItem} />
      )}
      {bookings.length == 0 && (
        <View style = {styles.view}>
          <Text style={styles.text}> {emptyText} </Text>
        </View>
      )}
    </SignedInContainer>
  );
};

export default Account;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: white,
    textAlign: "center"
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});