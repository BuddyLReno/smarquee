import * as cssUtils from '../src/css-utilities';

let element = null;
beforeEach(() => {
  document.body.innerHTML = '<h1 id="testID">Test Title</h1>';

  element = document.querySelector('#testID');
});

test('buildStyle returns the expected default style', () => {
  let subject = cssUtils.buildStyle('abc123', '23', '233');
  expect(subject).toContain('.Smarquee--abc123 {');
  expect(subject).toContain('.Smarquee--abc123 [data-smarquee-scroll-title]');
});

test('setAnimationProperties adds time and distance variables', () => {
  jest.spyOn(element.style, 'setProperty');
  cssUtils.setAnimationProperties(element, 30, 400);

  expect(element.style.setProperty).toHaveBeenCalledWith('--time', '30s');
  expect(element.style.setProperty).toHaveBeenCalledWith(
    '--distance',
    '-400px'
  );
});

test('updatePlayState updates the playState variable with selected value', () => {
  jest.spyOn(element.style, 'setProperty');
  cssUtils.updatePlayState(element, 'paused');
  expect(element.style.setProperty).toHaveBeenCalledWith(
    '--playState',
    'paused'
  );
});

test('updateIterations updates the iteration variable with selected value', () => {
  jest.spyOn(element.style, 'setProperty');
  cssUtils.updateIterations(element, '3');
  expect(element.style.setProperty).toHaveBeenCalledWith(
    '--iterationCount',
    '3'
  );
});

test('updateDirection updates the iteration variable with selected value', () => {
  jest.spyOn(element.style, 'setProperty');
  cssUtils.updateDirection(element, 'backwards');
  expect(element.style.setProperty).toHaveBeenCalledWith(
    '--direction',
    'backwards'
  );
});

test('updateFillMode updates the iteration variable with selected value', () => {
  jest.spyOn(element.style, 'setProperty');
  cssUtils.updateFillMode(element, 'both');
  expect(element.style.setProperty).toHaveBeenCalledWith('--fillMode', 'both');
});

test('updateTimingFunction updates the iteration variable with selected value', () => {
  jest.spyOn(element.style, 'setProperty');
  cssUtils.updateTimingFunction(element, 'ease-in');
  expect(element.style.setProperty).toHaveBeenCalledWith(
    '--timingFunction',
    'ease-in'
  );
});
