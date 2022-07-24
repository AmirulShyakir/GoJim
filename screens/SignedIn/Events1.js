import EventTypeCard from "../../components/containers/EventTypeCard";
import EventContainer from "../../components/containers/EventContainer";

const Events1 = ({ navigation }) => {

  function pressEvent(eventType) {
    console.log(eventType + " EVENTS1 SCREEN");
    navigation.navigate("EventsScreen", {key: eventType});
  }

  return (
    <EventContainer>
      <EventTypeCard
        testID="friendlySports"
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
        testID="networkingSessions"
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
        testID="recreationalTraining"
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
        testID="studySessions"
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
