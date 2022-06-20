import { TouchableOpacity, ImageBackground, Image, StyleSheet, Text } from "react-native";
import LargeText from "../Texts/LargeText";
import { colours } from "../ColourPalette";

const EventTypeCard = (props, {onPress}) => {

    return (
        <TouchableOpacity onPress={onPress} style={[styles.container]}>
            <ImageBackground
            style={[styles.image]}
            imageStyle={[styles.image]}
            source={{
                uri:'https://images.unsplash.com/photo-1604882735652-699f1c867bba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                }}
            >
                <Text>{props.children}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
    
};

const {primary} = colours
const styles = StyleSheet.create({
    container: {
        width:174,
        height: 298,
        backgroundColor: primary,
        borderRadius: 10,
        margin: 10,
    },
    image: {
        width: '100%', 
        height: '100%',
        borderRadius: 10,
        opacity: 50,
      }
});

export default EventTypeCard;