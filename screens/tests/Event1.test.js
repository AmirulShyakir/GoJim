import React from "react";
import renderer from 'react-test-renderer';
import { render, fireEvent } from "@testing-library/react-native";
import Events1 from "../SignedIn/Events1";

test("Event1 snapshot test", () => {
  const tree = renderer.create(<Events1 />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("it renders text correctly", () => {
  const { getByText, queryAllByText }= render(<Events1 />);
  expect (queryAllByText("Friendly Sports").length).not.toBe(0);
  expect (queryAllByText("Networking Sessions").length).not.toBe(0);
  expect (queryAllByText("Recreational Training").length).not.toBe(0);
  expect (queryAllByText("Study Sessions").length).not.toBe(0);
})
