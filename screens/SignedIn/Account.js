import { auth, db } from '../../firebase';
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { Image, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import MainContainer from '../../components/containers/MainContainer'; 
import SignedInContainer from '../../components/containers/SignedInContainer';
//texts
import LargeText from '../../components/Texts/LargeText';
import BookingCard from '../../components/containers/BookingCard';

const Account = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      const collectionRef = query(collection(
        db,
        "bookings",
        where("userUID", "==", auth.currentUser.uid)
      ));
      const collectionSnap = await getDocs(collectionRef);
      collectionSnap.forEach((booking) => {
          console.log(booking.id, " => ", booking.data());
          list.push(booking.data());
        })
      setBookings(bookings);
    };

    const renderItem = ({ item }) => {
        return (
          <BookingCard
            item={item}
            onPress={() => {
              console.log("Navigating to " + item.name);
            }}
          />
        );
      };
    
    return <SignedInContainer>
        <LargeText>Account Stub</LargeText>
        <FlatList
            data={bookings}
            renderItem={renderItem}
        />
    </SignedInContainer>
}

export default Account;