import * as mathUtils from '../../src/math-utilities';

test('calculates correct animated distance', () => {
  let subject = mathUtils.calculateAnimationValues(200, 50, 24);
  expect(subject.animatedDistance).toBe(114);
});

test('calculates correct time scale from velocity', () => {
  let subject = mathUtils.calculateAnimationValues(200, 50, 24);
  expect(subject.time).toBe(4);
});

test('returns object with expected properties', () => {
  let subject = mathUtils.calculateAnimationValues(1, 1, 0);
  expect(subject).toMatchObject({
    distance: 1,
    animatedDistance: 2.5,
    time: 1
  });
});
