import React, { useState, useEffect } from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	View,
	Text,
	Modal,
	Alert,
	Switch,
	TouchableOpacity,
} from "react-native";

//Firestore
import { auth, db } from "../../firebase";
import {
	doc,
	getDoc,
	setDoc,
	addDoc,
	collection,
	arrayUnion,
	updateDoc,
	arrayRemove,
} from "firebase/firestore";
//texts
import LargeText from "../../components/Texts/LargeText";
import RegularText from "../../components/Texts/RegularText";
import MessageBox from "../../components/Texts/MessageBox";
//Containers
import MaxCapacityContainer from "../../components/containers/MaxCapacityContainer";
import RowContainer from "../../components/containers/RowContainer";
//Others
import RegularButton from "../../components/Buttons/RegularButton";
import { colours } from "../../components/ColourPalette";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CheckBoxTimeSlot from "../../components/containers/CheckBoxTimeSlot";
import { Feather } from "@expo/vector-icons";

const { primary, white, action, tertiary } = colours;

const Facility = ({ navigation, route }) => {
	const [message, setMessage] = useState("");
	const [isSuccessMessage, setIsSuccessMessage] = useState("false");

	const facilityName = route.params.facilityName;

	const [facility, setFacility] = useState({});
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [selectedDateString, setSelectedDateString] = useState("Select Date");
	const [selectedDateObject, setSelectedDateObject] = useState({});
	const [modalVisible, setModalVisible] = useState(false);
	const [timeSlotChosen, setTimeSlotChosen] = useState(0);
	const [fav, setFav] = useState(false);

	useEffect(() => {
		getFacility();
		checkFav();
	}, []);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	// Get facility details
	const getFacility = async () => {
		const docRef = doc(db, "facilities", facilityName);
		const docSnap = await getDoc(docRef);
		const facility = docSnap.data();
		setFacility(facility);
	};

	//Check if user fav this facil
	const checkFav = async () => {
		const userRef = doc(db, "users", auth.currentUser.uid);
		const userSnap = await getDoc(userRef);
		if (
			userSnap.exists() &&
			userSnap.data().favourites.indexOf(facilityName) > -1
		) {
			setFav(true);
		} else if (!userSnap.exists()) {
			await setDoc(doc(db, "users", auth.currentUser.uid), {
				favourites: [],
			});
		} else {
			setFav(false);
		}
	};

	const handleFav = async () => {
		const userRef = doc(db, "users", auth.currentUser.uid);
		if (fav) {
			setFav(false);
			//Remove from firestore
			await updateDoc(userRef, { favourites: arrayRemove(facilityName) });
			console.log("Removed from favs");
		} else {
			setFav(true);
			//Add to firestore
			await updateDoc(userRef, { favourites: arrayUnion(facilityName) });
			console.log("Added to favs");
		}
	};

	//Standardise Time on Date to be 0000 and change Regular Button text to date selected
	const selectDate = async (date) => {
		date.setHours(0, 0, 0);
		setSelectedDateString(date.toDateString());
		setSelectedDateObject(date);
		hideDatePicker();
		setTimeout(() => setModalVisible(true), Platform.OS === "ios" ? 500 : 0);
	};

	//Update Regular Button text to date
	const showTimeSlotChosen = () => {
		if (timeSlotChosen == 0) {
			return "";
		} else {
			var timeDisplayed = {
				8: ",  8am - 10am",
				10: ",  10am-12pm",
				12: ",  12pm-2pm",
				14: ",  2pm-4pm",
				16: ",  4pm-6pm",
				18: ",  6pm-8pm",
				20: ",  8pm-10pm",
			};
			return timeDisplayed[timeSlotChosen];
		}
	};

	//Retrieve timeSlotChosen from CheckBoxTimeSlot.js
	const callbackTimeSlot = (childData) => {
		setTimeSlotChosen(childData);
		console.log(childData);
	};

	//Closes modal on confirm
	const callbackClose = () => {
		setModalVisible(!modalVisible);
	};

	//On confirm Booking update Firestore accordingly
	const updateFiretore = async () => {
		//Update Facil array
		if (timeSlotChosen != 0 && selectedDateString !== "Select Date") {
			await setDoc(
				doc(db, "facilities", facilityName, "bookings", selectedDateString),
				{
					timeSlots: arrayUnion(timeSlotChosen),
				},
				{ merge: true }
			);
			//Update Bookings
			const bookingRef = doc(collection(db, "bookings"));
			await setDoc(bookingRef, {
				bookingID: bookingRef.id,
				venue: facilityName,
				date: selectedDateObject,
				timeSlot: timeSlotChosen,
				userUID: auth.currentUser.uid,
			});
			//Ask if want event or nah
			Alert.alert("Booking Confirmed!", "Make an Event?", [
				{
					text: "No",
					onPress: () => navigation.navigate("HomeScreen1"),
					style: "cancel",
				},
				{
					text: "Yes",
					onPress: () =>
						navigation.navigate("MakeEvent", { bookingID: bookingRef.id }),
				},
			]);
		} else if (selectedDateString == "Select Date" || timeSlotChosen == 0) {
			console.log("No date found");
			setIsSuccessMessage(false);
			setMessage("Please select a date and time");
		}
	};

	return (
		<View style={styles.scrollView}>
			<Image
				style={{ width: "100%", height: 200, borderRadius: 10 }}
				source={{ uri: facility.imageURL }}
			/>
			<LargeText>{facilityName}</LargeText>
			<RowContainer>
				<RegularText>
					{facility.venue} {facility.unit}
				</RegularText>
				<MaxCapacityContainer>
					<RegularText>{facility.capacity}</RegularText>
				</MaxCapacityContainer>
			</RowContainer>
			{facility.description && (
				<RegularText>{facility.description}</RegularText>
			)}
			<View style={styles.fav}>
				<Switch
					trackColor={{ false: "#767577", true: action }}
					thumbColor="#f4f3f4"
					ios_backgroundColor="#3e3e3e"
					onValueChange={handleFav}
					value={fav}
				/>
				<RegularText>Add to Favourites</RegularText>
			</View>
			<TouchableOpacity
				style={{ flexDirection: "row", alignItems: "center" }}
				onPress={showDatePicker}
			>
				<Feather name="calendar" size={25} color={white} />
				<RegularText style={{ marginLeft: 10 }}>
					{selectedDateString} {showTimeSlotChosen()}
				</RegularText>
			</TouchableOpacity>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				minimumDate={new Date()}
				onConfirm={selectDate}
				onCancel={hideDatePicker}
				textColor="black"
			/>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				backdropOpacity={0.5}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<CheckBoxTimeSlot
							date={selectedDateObject}
							facilityName={{ facilityName }}
							timeSlotChosen={callbackTimeSlot}
							onPressClose={callbackClose}
						/>
						<RegularButton
							onPress={() => setModalVisible(!modalVisible)}
							style={{ alignSelf: "center" }}
						>
							Cancel
						</RegularButton>
					</View>
				</View>
			</Modal>
			<View style={styles.container}>
				<MessageBox style={{ marginBottom: 15 }} success={isSuccessMessage}>
					{message || " "}
				</MessageBox>
				<RegularButton onPress={updateFiretore}>Confirm Booking</RegularButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: primary,
		padding: 25,
		minHeight: "100%",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		margin: 22,
	},
	fav: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	modalView: {
		margin: 10,
		backgroundColor: "white",
		borderRadius: 10,
		padding: 50,
		alignItems: "flex-start",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	container: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 0,
	},
});

export default Facility;
