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
    
    const getEvents = async () =>{
        
        
        const docRef = doc(db, 'events', 'eventTypes', 'Friendlies', "friendly1");
        
        // attempt at printing all documents in collections (failed)
        //const docRef = collections(db, 'events');
        /*const q = query(docRef, where("type", "==", "friendlies"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });*/

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          };  
        }


    const [events, setEvents] = useState([]);

    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {
        const list = [];
        const events = query(collection(db, "events"), where("type", "==", "friendlies"));
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
            onPress={() => console.log("selected " + item.name)}
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