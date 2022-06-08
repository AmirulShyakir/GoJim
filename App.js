import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/SignedIn/Home';
import Events from './screens/SignedIn/Events';
import Profile from './screens/SignedIn/Profile';
import Settings from './screens/SignedIn/Settings';

import Signup from './screens/Signup';
import Login from './screens/Login';
import { colours } from './components/ColourPalette';
import { Feather } from '@expo/vector-icons'
const {action, white, black} = colours;

/*
export default function App() {
  return (
    <>
      <StatusBar barstyle="dark"/>
      <Navigator/>
    </>
  );
}
*/

function LoginSignupScreens() {
  const LoginSignupStack = createNativeStackNavigator();
  return (  
    <LoginSignupStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: action, borderBottomWidth: 0, shadowColor: "transparent"},
        headerTintColor: white}}
    >
      <LoginSignupStack.Screen name="Login" component={Login} />
      <LoginSignupStack.Screen name="Signup" component={Signup} />
    </LoginSignupStack.Navigator>
  );
}




const ProfileStackScreen = () => {
  const ProfileStack = createNativeStackNavigator();
  return (
      <ProfileStack.Navigator>
          <ProfileStack.Screen name="Profile" component={Profile} options={{headerShown:false}} />
      </ProfileStack.Navigator>
  )
}

const EventsStackScreen = () => {
  const EventsStack = createNativeStackNavigator();
  return (
      <EventsStack.Navigator>
          <EventsStack.Screen name="Events" component={Events} options={{headerShown:false}}/>
      </EventsStack.Navigator>
  )
}

const HomeStackScreen = () => {
  const HomeStack = createNativeStackNavigator();
  return (
      <HomeStack.Navigator>
          <HomeStack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      </HomeStack.Navigator>
  )
}

const SettingsStackScreen = () => {
  const SettingsStack = createNativeStackNavigator();
  return (
      <SettingsStack.Navigator>
          <SettingsStack.Screen name="Settings" component={Settings} options={{headerShown:false}}/>
      </SettingsStack.Navigator>
  )
}

function Tabs() {
  const Tabs = createBottomTabNavigator();
  return (
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
      })}
      tabBarOptions = {{
        activeTintColor: action,
        labelStyle: {fontSize: 10},
      }}
      initialRouteName="Home"
      >
      <Tabs.Screen name="Profile" component={ProfileStackScreen} />
      <Tabs.Screen name="Events" component={EventsStackScreen} />
      <Tabs.Screen name="Home" component={HomeStackScreen} />
      <Tabs.Screen name="Settings" component={SettingsStackScreen} />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
  )
}


