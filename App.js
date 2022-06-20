import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { auth } from './firebase';

import Home from './screens/SignedIn/Home';
import Home1 from './screens/SignedIn/Home1';
import Events from './screens/SignedIn/Events';
import Events1 from './screens/SignedIn/Events1';
import Account from './screens/SignedIn/Account';
import Settings from './screens/SignedIn/Settings';

import Signup from './screens/Signup';
import Login from './screens/Login';
import { colours } from './components/ColourPalette';
import { Feather } from '@expo/vector-icons'
const {action, white, secondary, primary, tertiary} = colours;

const AccountStackScreen = () => {
  const AccountStack = createNativeStackNavigator();
  return (
      <AccountStack.Navigator>
          <AccountStack.Screen name="ProfileScreen" component={Account} options={{
            headerShown:true, 
            headerTitle:'Account', 
            headerStyle:{
              backgroundColor: primary,
              },
            headerTintColor: white,
          }} />
      </AccountStack.Navigator>
  )
}

const EventsStackScreen = () => {
  const EventsStack = createNativeStackNavigator();
  return (
      <EventsStack.Navigator>
          <EventsStack.Screen name="EventsScreen1" component={Events1} options={{
            headerShown:true, 
            headerTitle:'Event Types', 
            headerStyle:{
              backgroundColor: primary,
              },
            headerTintColor: white,
          }} 
          />   
          <EventsStack.Screen name="EventsScreen" component={Events} options={{
            headerShown:true, 
            headerTitle:'Events', 
            headerStyle:{
              backgroundColor: primary,
              },
            headerTintColor: white,
          }} />
      </EventsStack.Navigator>
  )
}

const HomeStackScreen = ({navigation, route}) => {
  const HomeStack = createNativeStackNavigator();
  return (
      <HomeStack.Navigator>
          <HomeStack.Screen name="HomeScreen1" component={Home1} options={{
            headerShown:true, 
            headerTitle:'Home', 
            headerStyle:{
              backgroundColor: primary,
              },
            headerTintColor: white,
          }} 
          initialParams={{ authenticate: route.params.authenticate }} 
          />         
          <HomeStack.Screen name="HomeScreen" component={Home} options={{
            headerShown:true, 
            headerTitle:'Facilities', 
            headerStyle:{
              backgroundColor: primary,
              },
            headerTintColor: white,
          }} 
          />
      </HomeStack.Navigator>
  )
}

const SettingsStackScreen = () => {
  const SettingsStack = createNativeStackNavigator();
  return (
      <SettingsStack.Navigator>
          <SettingsStack.Screen name="SettingsScreen" component={Settings} options={{
            headerShown:true, 
            headerTitle:'Settings', 
            headerStyle:{
              backgroundColor: primary,
              },
            headerTintColor: white,
          }} />
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
            HeaderTitle: () => <Text> ZYZZ </Text>,
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
                if(route.name === "Account") {
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
            tabBarActiveTintColor: action,
            tabBarInactiveTintColor: tertiary,
            tabBarLabelStyle: {
              "fontSize": 10
            },
            tabBarStyle: { backgroundColor: primary, borderTopWidth: 2, borderTopColor: tertiary}, 
            })}
          initialRouteName="Home"
          >
          <Tabs.Screen name="Account" component={AccountStackScreen} />
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
