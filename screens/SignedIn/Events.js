import { db } from '../../firebase';
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import MainContainer from '../../components/containers/MainContainer'; 
//texts
import LargeText from '../../components/Texts/LargeText';
import RegularButton from '../../components/Buttons/RegularButton';


const Events = () => {
    
    const getEvents = async () =>{
        
        
        const docRef = doc(db, 'events', 'eventTypes', 'Friendlies', "friendly1");
        
        // attempt at printing all documents in collections (failed)
        //const docRef = collections(db, 'events', 'eventTypes', 'Friendlies');
        /*const q = query(docRef, where("eventName", "==", "1v1 me!!!"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });*/

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          };  
        }
    
    return <MainContainer>
        <LargeText>Events Stub</LargeText>
        <RegularButton onPress={getEvents}>Check if database works</RegularButton>
    </MainContainer>
}

export default Events;