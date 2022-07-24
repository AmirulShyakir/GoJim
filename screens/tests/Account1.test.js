import React from "react";
import renderer from "react-test-renderer";
import Account1 from "../SignedIn/Account1";
import { render } from "@testing-library/react-native";

test("Account1 Snapshot test", () => {
  const tree = renderer.create(<Account1 />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("it renders all cards correctly", () => {
  const { getByTestId } = render(<Account1 />);
  getByTestId("upcoming");
  getByTestId("past");
  getByTestId("favourites");
});
