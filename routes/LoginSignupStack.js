import { createStackNavigator, useHeaderHeight } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import { colours } from "../components/ColourPalette";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home";

const {action, white} = colours;

const screens = {
    Login: { 
        screen: Login, 
    },
    Signup : {
        screen : Signup,
    },
    Home : {
        screen : Home,
    }
}

const LoginSignupStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {backgroundColor: action, borderBottomWidth: 0, shadowColor: "transparent"},
        headerTintColor: white,
        }
    });

export default createAppContainer(LoginSignupStack);