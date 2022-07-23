import { auth, db } from '../../firebase';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
//texts
import SignedInContainer from '../../components/containers/SignedInContainer';
import EventCard from '../../components/containers/EventCard';
import { colours } from '../../components/ColourPalette';
const {white, primary, secondary} = colours;

const Events = ({navigation, route}) => {
  const eventType  = route.params.key;
  const [emptyText, setEmptyText] = useState("");
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getData();
        setTimeout(() => {renderEmptyText(eventType)}, 300);
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
    
    const renderEmptyText = (eventType) => {
      setEmptyText("There are no " + eventType + " at the moment");
    }

    return <SignedInContainer>
      {events.length >= 1 && (
        <FlatList
          data={events}
          renderItem={renderEvents}
        />
      )}
      {events.length == 0 && (
        <View style = {styles.view}>
          <Text style={styles.text}> {emptyText} </Text>
        </View>
      )}
    </SignedInContainer>
}

export default Events;

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