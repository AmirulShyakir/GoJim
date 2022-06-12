import React from "react";
import { TouchableHighlight } from "react-native";
import styled from "styled-components/native";

import { colours } from "../ColourPalette";
import SmallText from "../Texts/SmallText";

const { action, white } = colours;

const StyledPressable = styled.Pressable`
  padding-vertical: 5px;
  align-self: center;
`;

const PressableText = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} {...props}>
      <SmallText style={{ color: action }}>{props.children}</SmallText>
    </TouchableHighlight>
  );
};

export default PressableText;
