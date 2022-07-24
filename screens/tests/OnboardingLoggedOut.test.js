import React from "react";
import renderer from 'react-test-renderer';
import OnboardingLoggedOut from "../OnboardingLoggedOut";

test("OnboardingLoggedOut Snapshot test", () => {
    const tree = renderer.create(<OnboardingLoggedOut />).toJSON();
  expect(tree).toMatchSnapshot();
});
