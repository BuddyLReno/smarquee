import * as mathUtils from '../src/math-utilities';

test('calculateAnimationValues calculates correct animated distance', () => {
  let subject = mathUtils.calculateAnimationValues(200, 50, 24);
  expect(subject.animatedDistance).toBe(112);
});

test('calculateAnimationValues calculates correct time scale from velocity', () => {
  let subject = mathUtils.calculateAnimationValues(200, 50, 24);
  expect(subject.time).toBe(4);
});

test('calculateAnimationValues returns object with expected properties', () => {
  let subject = mathUtils.calculateAnimationValues(1, 1, 4);
  expect(subject).toMatchObject({
    distance: 1,
    animatedDistance: 2.5,
    time: 1
  });
});

test('calculateAnimationValues sets a separator margin to zero if it was not passed in', () => {
  let subject = mathUtils.calculateAnimationValues(1, 1);
  expect(subject).toMatchObject({
    distance: 1,
    animatedDistance: 0.5,
    time: 1
  });
});

test('generateHash always contains a random letter for the first character', () => {
  let subject = mathUtils.generateHash();
  expect(subject).toMatch(/^([A-Za-z]){1}/);
});
