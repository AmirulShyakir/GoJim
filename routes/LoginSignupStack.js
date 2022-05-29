import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Login from "../screens/Login";
import Signup from "../screens/Signup";

const screens = {
    Login: {    //screen name
        screen: Login //component name
    },
    Signup : {
        screen : Signup
    },
}

const LoginSignupStack = createStackNavigator(screens);

export default createAppContainer(LoginSignupStack);