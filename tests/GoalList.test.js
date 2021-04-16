// __tests__/Intro-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import findNumIndex from '../screens/Goals/CreateGoalPage';

test('findNumIndex test', () => {
  const idx = findNumIndex("make 10 pies");
  expect(idx).toEqual(1);
});