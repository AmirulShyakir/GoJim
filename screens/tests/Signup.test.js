import React from "react";
import renderer from 'react-test-renderer';
import { render, fireEvent } from "@testing-library/react-native";
import Signup from "../Signup";

test("Signup snapshot test", () => {
  const tree = renderer.create(<Events1 />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Renders default elements", () => {
  const { getAllByText, getByText, getByPlaceholderText} = render(<Signup />);
  getByText("Email Address");
  getByText("Password");
  getByText("New Account Signup");
  getByText("Forgot Password");
  getByText("Login");
  getByPlaceholderText("example@u.nus.edu");
  getByPlaceholderText("********")
})
