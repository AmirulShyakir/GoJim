import React from "react";
import renderer from 'react-test-renderer';
import OnboardingLoggedOut from "../OnboardingLoggedOut";
import { render, fireEvent } from "@testing-library/react-native";

test("OnboardingLoggedOut Snapshot test", () => {
    const tree = renderer.create(<OnboardingLoggedOut />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Renders first page but not the next few pages", () => {
  const { queryAllByText, getByText, getByTestId, queryAllByTestId }= render(<OnboardingLoggedOut />);
  expect(queryAllByText("BOOKINGS MADE SIMPLE.").length).toBe(1);
  getByTestId("page1");
  //other pages
  expect(queryAllByText("SEARCH FOR FACILITY.").length).toBe(0);
  expect(queryAllByTestId("page2")).toBeNull;

  expect(queryAllByText("JUST BOOK IT.").length).toBe(0);
  expect(queryAllByTestId("page3")).toBeNull;

  expect(queryAllByText("MAKE IT AN EVENT.").length).toBe(0);
  expect(queryAllByTestId("page4")).toBeNull;

  expect(queryAllByText("JOIN EVENTS.").length).toBe(0);
  expect(queryAllByTestId("page5")).toBeNull;

  expect(queryAllByText("TRACK YOUR BOOKINGS.").length).toBe(0);
  expect(queryAllByTestId("page6")).toBeNull;
})