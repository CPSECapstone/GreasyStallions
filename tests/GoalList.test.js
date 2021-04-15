// __tests__/Intro-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import ClassPage from '../screens/ClassPage';

test('renders correctly', () => {
  const tree = renderer.create(<ClassPage />).toJSON();
  expect(tree).toMatchSnapshot();
});