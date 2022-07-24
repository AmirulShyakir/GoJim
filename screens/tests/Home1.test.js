import React from "react";
import renderer from 'react-test-renderer';
import Home1 from "../SignedIn/Home1";

test("Home1 Snapshot test", () => {
    const tree = renderer.create(<Home1 />).toJSON();
  expect(tree).toMatchSnapshot();
});

