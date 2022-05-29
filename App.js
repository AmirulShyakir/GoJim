import { StatusBar } from 'expo-status-bar';
import Navigator from './routes/LoginSignupStack';

export default function App() {
  return (
    <>
      <StatusBar barstyle="dark"/>
      <Navigator/>
    </>
  );
}