import { auth } from '../../firebase';
import { Image } from 'react-native';
import MainContainer from '../../components/containers/MainContainer'; 
//texts
import LargeText from '../../components/Texts/LargeText';
import EventTypeCard from '../../components/containers/EventTypeCard';

const Account = () => {
    return <MainContainer>
        <LargeText>Account Stub</LargeText>
        <Image 
            style={{width: '100%', height: '50%', borderRadius: 10}}
            source={{
            uri:'https://firebasestorage.googleapis.com/v0/b/gojim-1d589.appspot.com/o/why01008.jpg?alt=media&token=1f35e00d-f0ab-44e0-b522-6b41b71e3dae'
            }}
        />
    </MainContainer>
}

export default Account;