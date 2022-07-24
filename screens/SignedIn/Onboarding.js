import { Image } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { colours } from "../../components/ColourPalette";

const { primary, secondary, tertiary, action } = colours;

const HowItWorks = ({navigation}) => (
  <Onboarding
    onDone={() => navigation.goBack()}
    onSkip={() => navigation.goBack()}
    transitionAnimationDuration = {500}
    titleStyles= {{fontSize: 20, fontWeight: 'bold'}}
    pages={[
      {
        backgroundColor: primary,
        image: <Image
            testID="page1"
						source={require("../../assets/GOJIM.png")}
						style={{
							width: 250,
							height: 50,
							resizeMode: "contain",
							marginBottom: 0,
							marginTop: 0,
							alignSelf: "center",
						}}
					/>,
        title: 'BOOKINGS MADE SIMPLE.',
        subtitle: 'Who says it has to be hard?',
      },
      {
        backgroundColor: "#E4D0D0",
        image: <Image testID="page2" source={require('../../assets/SearchForFacilityFINAL.png')}/>,
        title: 'SEARCH FOR FACILITY.',
        subtitle: 'Filter by facility type in Home.',
      },
      {
        backgroundColor: '#E4EAEB',
        image: <Image testID="page3" source={require('../../assets/JustBookIt.png')} />,
        title: 'JUST BOOK IT.',
        subtitle: 'Select date and available timeslot. \n And thats pretty much it.',
      },
      {
        backgroundColor: '#F8F0D4',
        image: <Image testID="page4" source={require('../../assets/MakeItAnEvent.png')} />,
        title: 'MAKE IT AN EVENT.',
        subtitle: "Okay shawty, one's company, two's a crowd and three's a party! Enter event details and publish.",
      },
      {
        backgroundColor: "#F6DDC1",
        image: <Image testID="page5" source={require('../../assets/JoinEvents.png')} />,
        title: 'JOIN EVENTS.',
        subtitle: "Fancy a quick battle? Or perhaps a study date? There's always something fresh in the Events tab. ASSC who?",
      },
      {
        backgroundColor: "#D4D4D4",
        image: <Image testID="page6" source={require('../../assets/TrackBookings.png')} />,
        title: 'TRACK YOUR BOOKINGS.',
        subtitle: "View your bookings in the Bookings tab. \n Psst! Here's where you can find your favourite facilities.",
      },
    ]}
  />
);

export default HowItWorks;