import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import MainContainer from "../../components/containers/MainContainer";
import SignedInContainer from "../../components/containers/SignedInContainer";
//texts
import LargeText from "../../components/Texts/LargeText";
import RegularButton from "../../components/Buttons/RegularButton";
import { FlatList } from "react-native";
import EventCard from "../../components/containers/EventCard";
import EventTypeCard from "../../components/containers/EventTypeCard";
import EventContainer from "../../components/containers/EventContainer";
import { useState, useEffect } from "react";

const Events1 = ({ navigation }) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    console.log(selected + "joe");
  }, [selected]);

  function pressEvent(eventType) {
    setSelected(eventType);
    console.log(selected);
    navigation.navigate("EventsScreen", { eventType: selected });
  }

  return (
    <EventContainer>
      <EventTypeCard
        onPress={() => {
          pressEvent("Friendly Sports");
        }}
        image={{
          uri: "https://images.unsplash.com/photo-1616453239004-3ab56827fb76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHRlbm5pcyUyMHBsYXllcnxlbnwwfHwwfHw%3D&w=1000&q=80",
        }}
      >
        Friendly Sports
      </EventTypeCard>

      <EventTypeCard
        onPress={() => {
          pressEvent("Networking Sessions");
        }}
        image={{
          uri: "https://media.istockphoto.com/photos/brilliant-ideas-in-the-making-picture-id540526464?k=20&m=540526464&s=612x612&w=0&h=Gz0d2rwaT7Z9OxAPxrHRcddVVblvQt77C-pqvX4pcAw=",
        }}
      >
        Networking Sessions
      </EventTypeCard>
      <EventTypeCard
        onPress={() => {
          pressEvent("Recreational Training");
        }}
        image={{
          uri: "https://vivace.smu.edu.sg/sites/vivace.smu.edu.sg/files/styles/gallery/public/2021-08/euru%204.JPG?itok=fRtmCk5Y",
        }}
      >
        Recreational Training
      </EventTypeCard>
      <EventTypeCard
        onPress={() => {
          pressEvent("Study Sessions");
        }}
        image={{
          uri: "https://images.unsplash.com/photo-1604882735652-699f1c867bba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        }}
      >
        Study Sessions
      </EventTypeCard>
    </EventContainer>
  );
};

export default Events1;
