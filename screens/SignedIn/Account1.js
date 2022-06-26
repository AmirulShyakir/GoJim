import EventTypeCard from "../../components/containers/EventTypeCard";
import CurrentPastFavouriteCard from "../../components/containers/CurrentPastFavouriteCard";
import CurrentPastFavouriteContainer from "../../components/containers/CurrentPastFavouriteContainer";

const Account1 = ({ navigation, route }) => {

  function handlePress(selected) {
    console.log("this is getting passed to the next page: " + selected)
    if (selected == "Favourite Facilities") {
      console.log("Navigating to Facility")
      //navigation.navigate("Facility", {key: selected});
    } else {
      //navigate to a page containing list of bookings
      navigation.navigate("MyBookings", selected);
    }
  }

  return (
    <CurrentPastFavouriteContainer>
      <CurrentPastFavouriteCard
        onPress={() => {
          handlePress("joe");
        }}
        image={{
          uri: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
        }}
      >
        Upcoming Bookings
      </CurrentPastFavouriteCard>

      <CurrentPastFavouriteCard
        onPress={() => {
          handlePress("mama");
        }}
        image={{
          uri: "https://images.unsplash.com/photo-1510531704581-5b2870972060?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
        }}
      >
        Past Bookings
      </CurrentPastFavouriteCard>
      <CurrentPastFavouriteCard
        onPress={() => {
          handlePress("Favourite Facilities");
        }}
        image={{
          uri: "https://uci.nus.edu.sg/suu/wp-content/uploads/sites/5/2020/07/Olympic-pool-1-1024x706.jpg",
        }}
      >
        Favourite Facilities
      </CurrentPastFavouriteCard>
    </CurrentPastFavouriteContainer>
  );
};

export default Account1;