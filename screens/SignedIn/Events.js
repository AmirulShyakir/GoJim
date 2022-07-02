import { auth, db } from '../../firebase';
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
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
      const list = [];
      const events = query(
        collection(db, "bookings"),
        where("event", "==", true),
        where("eventType", "==", eventType),
        where("userUID", "!=", auth.currentUser.uid)
        //where("date", ">=", Timestamp.fromMillis(Date.now()))
      );
      const eventsSnapshot = await getDocs(events);
      eventsSnapshot.forEach((events) => {
        list.push(events.data());
      });
      list.sort((a, b) => b.date.toDate() - a.date.toDate());
      const arrayOfEvents = list.filter(filterEvents);
      setEvents(arrayOfEvents);
    };


    /*
    Filter events that are in the past, have no more participant slots
    or if the current user is already a participants
    */
    const filterEvents = (event) => {
      return event.date > Timestamp.fromMillis(Date.now()) && 
      event.participants.length < event.maxParticipants &&
      event.participants.findIndex(findCurrentUser) == -1;
    }

    const findCurrentUser = (participant) => {
      return participant == auth.currentUser.uid;
    }

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