import { TouchableOpacity, ImageBackground, Image, StyleSheet, Text } from "react-native";
import LargeText from "../Texts/LargeText";
import { colours } from "../ColourPalette";

const EventTypeCard = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} {...props} style={[styles.container]}>
            <ImageBackground
            style={[styles.image]}
            imageStyle={[styles.image]}
            source= {require=(props.image)}
            >
                <LargeText style={{padding:10, fontWeight: "bold"}}>{props.children}</LargeText>
            </ImageBackground>
        </TouchableOpacity>
    );
    
};

const {primary} = colours
const styles = StyleSheet.create({
    container: {
        width: "46%",
        height: "48%",
        backgroundColor: primary,
        borderRadius: 10,
        margin: 5,
    },
    image: {
        width: '100%', 
        height: '100%',
        borderRadius: 10,
        opacity: 50,
      }
});

export default EventTypeCard;