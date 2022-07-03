import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp
} from "firebase/firestore";
import { Image, FlatList } from "react-native";
import { useState, useEffect } from "react";
import MainContainer from "../../components/containers/MainContainer";
import SignedInContainer from "../../components/containers/SignedInContainer";
//texts
import LargeText from "../../components/Texts/LargeText";
import BookingCard from "../../components/containers/BookingCard";

const Account = ({navigation, route}) => {
  const [bookings, setBookings] = useState([]);
  //isUpcoming is a string that is either ">" || "<=" that will be
  //used in where() in getData()
  const isUpcoming = route.params;
  console.log("This has reached the next page: " + isUpcoming);

  useEffect(() => {
    getData();
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
    list.sort((a, b) => b.date.toDate() - a.date.toDate());
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

  return (
    <SignedInContainer>
      <FlatList data={bookings} renderItem={renderItem} />
    </SignedInContainer>
  );
};

export default Account;
