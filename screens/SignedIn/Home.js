import React, { useEffect } from 'react';
import { auth } from '../../firebase';
import MainContainer from '../../components/containers/MainContainer'; 
//texts
import LargeText from '../../components/Texts/LargeText';

const Home = ({navigation, route}) => {
    useEffect(() => {
        auth.onAuthStateChanged( (user) => {
            if(user){
          
            } else {
                route.params.authenticate(false);
            }   
        })
      },[])


    return <MainContainer>
        <LargeText>Homescreen Stub</LargeText>
    </MainContainer>
}

export default Home;