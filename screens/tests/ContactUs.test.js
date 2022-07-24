import React from "react";
import renderer from 'react-test-renderer';
import ContactUs from "../SignedIn/ContactUs";

test("ContactUs Snapshot test", () => {
    const tree = renderer.create(<ContactUs />).toJSON();
  expect(tree).toMatchSnapshot();
});
