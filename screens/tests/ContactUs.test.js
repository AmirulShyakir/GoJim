import React from "react";
import renderer from 'react-test-renderer';
import ContactUs from "../SignedIn/ContactUs";

test("settings test", () => {
    const tree = renderer.create(<ContactUs />).toJSON();
  expect(tree).toMatchSnapshot();
});
