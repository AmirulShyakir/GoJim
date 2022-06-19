import { db } from '../../firebase';
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import MainContainer from '../../components/containers/MainContainer'; 
import SignedInContainer from '../../components/containers/SignedInContainer';
//texts
import LargeText from '../../components/Texts/LargeText';
import RegularButton from '../../components/Buttons/RegularButton';
import { FlatList } from 'react-native';
import EventCard from '../../components/containers/EventCard';
import { useState, useEffect } from 'react';



const Events = () => {
    

    const [events, setEvents] = useState([]);

    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {
        const list = [];
        const events = query(collection(db, "bookings"), where("event", "==", true), where("eventType", "==", "Networking Sessions"));
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