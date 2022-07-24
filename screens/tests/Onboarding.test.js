import React from "react";
import renderer from 'react-test-renderer';
import Onboarding from "../SignedIn/Onboarding";

test("Onboarding Snapshot test", () => {
    const tree = renderer.create(<Onboarding />).toJSON();
  expect(tree).toMatchSnapshot();
});
