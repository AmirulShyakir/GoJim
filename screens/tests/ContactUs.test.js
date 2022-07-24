import React from "react";
import renderer from 'react-test-renderer';
import ContactUs from "../SignedIn/ContactUs";
import { render } from "@testing-library/react-native";

test("ContactUs Snapshot test", () => {
    const tree = renderer.create(<ContactUs />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("it renders text correctly", () => {
  const { getByTestId }= render(<ContactUs />);
  getByTestId("text");
  getByTestId("image");
})