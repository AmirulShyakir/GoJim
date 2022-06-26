import { auth, db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { Image, FlatList } from "react-native";
import { useState, useEffect } from "react";
import MainContainer from "../../components/containers/MainContainer";
import SignedInContainer from "../../components/containers/SignedInContainer";
//texts
import LargeText from "../../components/Texts/LargeText";
import BookingCard from "../../components/containers/BookingCard";

const Account = ({route}) => {
  const [bookings, setBookings] = useState([]);
  const isUpcoming = route.params.key;
  console.log("isUpcomingBooking: " + isUpcoming);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const list = [];
    //update list to fill in participated events
    const events = query(
      collection(db, "bookings"),
      where("events", "==", true),
      where("participants", "array-contains", auth.currentUser.uid)
    );
    const eventsSnapshot = await getDocs(events);
    eventsSnapshot.forEach((event) => {
      list.push(event.data());
    });

    const bookings = query(
      collection(db, "bookings"),
      where("userUID", "==", auth.currentUser.uid)
    );
    /*const unsubscribe = onSnapshot(bookings, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            list.push(doc.data());
            //console.log(doc.data());
        });
      });*/
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
          console.log("Navigating to " + item.venue);
        }}
      />
    );
  };

  return (
    <SignedInContainer>
      <LargeText>Your Bookings</LargeText>
      <FlatList data={bookings} renderItem={renderItem} />
    </SignedInContainer>
  );
};

export default Account;
