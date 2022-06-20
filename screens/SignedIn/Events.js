import { db } from '../../firebase';
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import SignedInContainer from '../../components/containers/SignedInContainer';
//texts
import { FlatList } from 'react-native';
import EventCard from '../../components/containers/EventCard';
import EventTypeCard from '../../components/containers/EventTypeCard';
import { useState, useEffect } from 'react';



const Events = ({route}) => {
  const { eventType } = route.params;

    const [events, setEvents] = useState([]);

    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {
        const list = [];
        const events = query(collection(db, "bookings"), where("event", "==", true), where("eventType", "==", eventType));
        const eventsSnapshot = await getDocs(events);
        eventsSnapshot.forEach(events => {
                list.push(events.data());
            });
            setEvents([...list])
    };

    const renderEvents = ({ item }) => {
        return (
          <EventCard
            item={item}
            onPress={() => console.log("selected " + item.eventName)}
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