import { Image } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { colours } from "../../components/ColourPalette";

const { primary, secondary, tertiary, action } = colours;

const HowItWorks = ({navigation}) => (
  <Onboarding
    onDone={() => navigation.goBack()}
    onSkip={() => navigation.goBack()}
    titleStyles= {{fontSize: 20, fontWeight: 'bold'}}
    pages={[
      {
        backgroundColor: primary,
        image: <Image source={require('../../assets/GojimLogo.png')} />,
        title: 'SEARCH FOR FACILITY.',
        subtitle: 'Filter by facility type in Home',
      },
      {
        backgroundColor: '#fe6e58',
        image: <Image source={require('../../assets/GojimLogo.png')} />,
        title: 'JUST BOOK IT.',
        subtitle: 'Select date and available timeslot \n And thats pretty much it',
      },
      {
        backgroundColor: '#999',
        image: <Image source={require('../../assets/GojimLogo.png')} />,
        title: 'MAKE IT AN EVENT.',
        subtitle: "Okay shawty, one's company, two's a crowd and three's a party! Enter event details and publish",
      },
      {
        backgroundColor: action,
        image: <Image source={require('../../assets/GojimLogo.png')} />,
        title: 'JOIN EVENTS.',
        subtitle: "Fancy a quick battle? Or perhaps a study date? There's always something fresh in the Events tab. ASSC who?",
      },
      {
        backgroundColor: tertiary,
        image: <Image source={require('../../assets/GojimLogo.png')} />,
        title: 'TRACK YOUR BOOKINGS.',
        subtitle: "View your past and upcoming bookings in the Account tab. Psst! You can also find your favourite facilities here",
      },
    ]}
  />
);

export default HowItWorks;