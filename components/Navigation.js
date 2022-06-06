import React from 'react';

//Nav Components
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Import Screens
import Home from "../screens/Home";
import Help from '../screens/Help';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();

function HomeStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}

function HelpStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.screen name="Help" component={Help} />
        </Stack.Navigator>
    );
}

function ProfileStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.screen name="Profile" component={Profile} />
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export default function Navigation(props) {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name='Home' component={HomeStackScreen}/>
            </Tab.Navigator>
        </NavigationContainer>

    )
}