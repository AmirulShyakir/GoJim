import React from 'react';

//Nav Components
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Ionicons} from '@expo/vector-icons';

// Import Screens
import Home from "../screens/Home";
import Help from '../screens/Help';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

import { ScreenWidth } from './Shared';

const Stack = createStackNavigator();

function HomeStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}

function HelpStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Help" component={Help} />
        </Stack.Navigator>
    );
}

function ProfileStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    );
}

//bottom tab navigator
const Tab = createBottomTabNavigator();
export default function Navigation(props) {
    return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={({route}) => ({
                headerTitle: () => <Text>Header</Text>,
                tabBarIcon: ({focused, color, size, padding}) => {
                    let iconName;
                    if(route.name === 'Home') {
                       iconName = focused ? 'home' : 'home-outline'
                    } else if(route.name === 'Help') {
                        iconName = focused ? 'information-circle' : 'information-circle-outline'
                    } else if(route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline'
                    }

                    return (
                        <Ionicons 
                            name={iconName} 
                            size = {size} 
                            color={color} 
                            style={{paddingBottom: padding}} 
                        />
                    );
                },
            })}
            tabBarOptions={{
                labelStyle: {fontSize: 16},
                style: {width: ScreenWidth}
            }}
            >
                <Tab.Screen name='Home' component={HomeStackScreen}/>
                <Tab.Screen name='Help' component={HelpStackScreen}/>
                <Tab.Screen name='Profile' component={ProfileStackScreen}/>
            </Tab.Navigator>
        </NavigationContainer>

    )
}