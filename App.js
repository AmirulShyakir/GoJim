import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Navigator from './routes/LoginSignupStack';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <Navigator/>
    </>
  );
}