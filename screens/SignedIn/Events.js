import { auth, db } from '../../firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import SignedInContainer from '../../components/containers/SignedInContainer';
//texts
import { FlatList } from 'react-native';
import EventCard from '../../components/containers/EventCard';
import { useState, useEffect } from 'react';

const Events = ({navigation, route}) => {
  const eventType  = route.params.key;

    const [events, setEvents] = useState([]);

    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {
      console.log(eventType + " EVENTS SCREEN");
      const list = [];
      const events = query(
        collection(db, "bookings"),
        where("event", "==", true),
        where("eventType", "==", eventType),
        where("userUID", "!=", auth.currentUser.uid)
      );
      const eventsSnapshot = await getDocs(events);
      eventsSnapshot.forEach((events) => {
        list.push(events.data());
      });
      list.sort((a, b) => b.date.toDate() - a.date.toDate());
      setEvents([...list]);
    };

    const renderEvents = ({ item }) => {
        return (
          <EventCard
            item={item}
            onPress={() => {
              console.log("selected " + item.eventName);
              navigation.navigate("JoinEventScreen", {eventDetails: item});
          }}
          />
        );
      };
    
    return <SignedInContainer>
        <FlatList
          data={events}
          renderItem={renderEvents}
        />
    </SignedInContainer>
}

export default Events;