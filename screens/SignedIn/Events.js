import { db } from '../../firebase';
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import MainContainer from '../../components/containers/MainContainer'; 
//texts
import LargeText from '../../components/Texts/LargeText';
import RegularButton from '../../components/Buttons/RegularButton';



const Events = () => {
    
    const getEvents = async () =>{
        const docRef = doc(db, 'events', 'eventTypes', 'Friendlies', "friendly1");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          };
          
          // attempt at printing all documents in collections (failed)
        const events = query(collection(db, "events"), where("type", "==", "friendlies"));
        const eventSnapshot = await getDocs(events);
        eventSnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
    }
    
    return <MainContainer>
        <LargeText>Events Stub</LargeText>
        <RegularButton onPress={getEvents}>Check if database works</RegularButton>
    </MainContainer>
}

export default Events;