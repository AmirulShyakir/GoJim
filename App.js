import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { auth } from './firebase';

import Home from './screens/SignedIn/Home';
import Events from './screens/SignedIn/Events';
import Profile from './screens/SignedIn/Profile';
import Settings from './screens/SignedIn/Settings';

import Signup from './screens/Signup';
import Login from './screens/Login';
import { colours } from './components/ColourPalette';
import { Feather } from '@expo/vector-icons'
const {action, white, black} = colours;

const ProfileStackScreen = () => {
  const ProfileStack = createNativeStackNavigator();
  return (
      <ProfileStack.Navigator>
          <ProfileStack.Screen name="ProfileScreen" component={Profile} options={{headerShown:false}} />
      </ProfileStack.Navigator>
  )
}

const EventsStackScreen = () => {
  const EventsStack = createNativeStackNavigator();
  return (
      <EventsStack.Navigator>
          <EventsStack.Screen name="EventsScreen" component={Events} options={{headerShown:false}}/>
      </EventsStack.Navigator>
  )
}

const HomeStackScreen = ({navigation, route}) => {
  const HomeStack = createNativeStackNavigator();
  return (
      <HomeStack.Navigator>
          <HomeStack.Screen name="HomeScreen" component={Home} options={{headerShown:false}} 
          initialParams={{ authenticate: route.params.authenticate }} 
          />
      </HomeStack.Navigator>
  )
}

const SettingsStackScreen = () => {
  const SettingsStack = createNativeStackNavigator();
  return (
      <SettingsStack.Navigator>
          <SettingsStack.Screen name="SettingsScreen" component={Settings} options={{headerShown:false}}/>
      </SettingsStack.Navigator>
  )
}

const App = () => {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const LoginSignupStack = createNativeStackNavigator();
  const Tabs = createBottomTabNavigator();

  const AuthLogin = (LoginStatus) => {
    setIsLoggedIn(LoginStatus);
  }
  
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    })
  },[])


  if(!isLoggedIn){
    return (
      <NavigationContainer>
        <LoginSignupStack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: action, borderBottomWidth: 0, shadowColor: "transparent"},
            headerTintColor: white}}
        >
          <LoginSignupStack.Screen name="Login" component={Login}
          initialParams={{ authenticate: AuthLogin }} 
           />
          <LoginSignupStack.Screen name="Signup" component={Signup} />
        </LoginSignupStack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions = {({route}) => ({
            HeaderTitle: () => <Text> Header </Text>,
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
                if(route.name === "Profile") {
                  iconName = focused ? "user" : "user"; 
                } else if(route.name == "Events") {
                    iconName = focused ? "calendar" : "calendar";
                } else if(route.name == "Home") {
                    iconName = focused ?  "home" : "home";
                } else if(route.name == "Settings") {
                    iconName = focused ? "settings" : "settings";
                } 
                return (
                    <Feather 
                        name={iconName} size={size} color= {color} 
                    />
                );
              },
            headerStyle: {backgroundColor: action, borderBottomWidth: 0, shadowColor: "transparent"},
            headerTintColor: white,
            tabBarActiveBackgroundColor: black,
            tabBarActiveTintColor: action,
            tabBarLabelStyle: {
              "fontSize": 10
            }
            })}
          initialRouteName="Home"
          >
          <Tabs.Screen name="Profile" component={ProfileStackScreen} />
          <Tabs.Screen name="Events" component={EventsStackScreen} />
          <Tabs.Screen name="Home"  component={HomeStackScreen}
          initialParams={{ authenticate: AuthLogin }}
           />
          <Tabs.Screen name="Settings" 
          authenticate={ AuthLogin }
           component={SettingsStackScreen} />
        </Tabs.Navigator>
      </NavigationContainer>
    )
  }
}

export default App;
