import React from "react";
import renderer from 'react-test-renderer';
import Account1 from "../SignedIn/Account1";

test("Account1 Snapshot test", () => {
    const tree = renderer.create(<Account1 />).toJSON();
  expect(tree).toMatchSnapshot();
});

