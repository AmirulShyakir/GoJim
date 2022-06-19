import LargeText from '../../components/Texts/LargeText';
import RegularButton from '../../components/Buttons/RegularButton';
import { colours } from '../../components/ColourPalette';
import RegularText from '../../components/Texts/RegularText';
import RowContainer from '../../components/containers/RowContainer';
import MaxCapacityContainer from '../../components/containers/MaxCapacityContainer';
import { TouchableOpacity, StyleSheet } from 'react-native';

const {white, secondary, primary} = colours;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 20,
    paddingBottom: 10,
    backgroundColor: primary,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 25,
    color: white,
  },
  image: {
    width:'100%', 
    height:183,
    paddingBottom:50,
    borderRadius: 10
  }
});

  const EventCard = ({ item, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.item]}>
        <LargeText>{item.name}</LargeText>
        <RowContainer>
          <RegularText>{item.venue}</RegularText>
          <MaxCapacityContainer>
            <RegularText>{item.currentParticipants}/{item.maxParticipants}</RegularText>
          </MaxCapacityContainer>
        </RowContainer>
      </TouchableOpacity>
    );
  };

export default EventCard;