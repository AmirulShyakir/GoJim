import { createStackNavigator, useHeaderHeight } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { StatusBarHeight } from "../components/Shared";

import { colours } from "../components/ColourPalette";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import LargeText from "../components/Texts/RegularText";

const {action, black, white} = colours;

const screens = {
    Login: {    //screen name
        screen: Login, //component name
    },
    Signup : {
        screen : Signup
    },
}

const LoginSignupStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {backgroundColor: action, borderBottomWidth: 0, shadowColor: "transparent"},
        headerTintColor: white,
        }
    });

export default createAppContainer(LoginSignupStack);