import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Profile from "../screens/SignedIn/Profile";
import Events from "../screens/SignedIn/Events";
import Home from "../screens/SignedIn/Home";
import Settings from "../screens/SignedIn/Settings";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ProfileStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.screen name="Profile" component={Profile} />
        </Stack.Navigator>
    )
}

function EventsStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.screen name="Events" component={Events} />
        </Stack.Navigator>
    )
}

function HomeStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}

function SettingsStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.screen name="Settings" component={Settings} />
        </Stack.Navigator>
    )
}

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions = {({route}) => ({
                HeaderTitle: () => <Text> Header </Text>,
                tabBarIcon: ({color, size, padding}) => {
                    let iconName;
                    if(route.name === "Profile") {
                        iconName = "user"; 
                    } else if(route.name == "Events") {
                        iconName = "calendar";
                    } else if(route.name == "Home") {
                        iconName = "home";
                    } else {
                        iconName = "settings";
                    }
                    return (
                        <Feather 
                            name={iconName} 
                            size={size} 
                            color= {color}
                            style={{paddingBottom: padding}}
                        />
                    );
                },
            })}
            tabBarOptions = {{
                activeTintColor: {action},
                inactiveTintColor: {white},
                labelStyle: {fontSize: 16},
                style: {width: fullScreenWidth},
            }}>
            <Tab.Screen> name="Profile" component={ProfileStackScreen}</Tab.Screen>
            <Tab.Screen> name="Events" component={EventsStackScreen}</Tab.Screen>
            <Tab.Screen> name="Home" component={HomeStackScreen}</Tab.Screen>
            <Tab.Screen> name="Settings" component={SettingsStackScreen}</Tab.Screen>
        </Tab.Navigator>
    )
}

export default Tabs;