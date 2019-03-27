import Smarquee from '../../src/smarquee';
import * as cssUtils from '../../src/css-utilities';
jest.mock('../../src/math-utilities', () => ({
  generateHash: () => 'ABC123',
  calculateAnimationValues: () => ({
    distance: 200,
    animatedDistance: 100,
    time: 30
  })
}));

let subject = null;
beforeEach(() => {
  document.body.innerHTML = `<div id="smarquee">A test title</div>`;

  subject = new Smarquee();
});

test('element with id smarquee is selected in constructor', () => {
  expect(subject.marqueeContainer.id).toBe('smarquee');
});

test('preselected element is set to marqueeContainer on init', () => {
  document.body.innerHTML = `
  <div id="smarquee2">a test title</div>
  `;

  let subject = new Smarquee({
    element: document.querySelector('#smarquee2')
  });

  expect(subject.marqueeContainer.id).toBe('smarquee2');
  expect(subject.marqueeContainer.innerHTML).toBe('a test title');
});

test('settings object returns with default properties', () => {
  expect(subject.settings).toMatchObject({
    selector: '#smarquee',
    element: null,
    velocity: 50,
    styleOptions: {
      scrollingTitleMargin: 24,
      animationName: 'marquee',
      timingFunction: 'linear',
      iterationCount: 'infinite',
      pausePercent: 30,
      direction: 'normal',
      fillMode: 'none',
      playState: 'running'
    }
  });
});

test('settings object can override styleOptions', () => {
  let subject = new Smarquee({
    styleOptions: {
      scrollingTitleMargin: 36
    }
  });

  expect(subject.settings.styleOptions.scrollingTitleMargin).toBe(36);
});

test('needsMarquee returns true when when scrollWidth is larger than displayed width', () => {
  jest
    .spyOn(subject.marqueeContainer, 'scrollWidth', 'get')
    .mockReturnValue(100);
  jest
    .spyOn(subject.marqueeContainer, 'clientWidth', 'get')
    .mockReturnValue(10);
  expect(subject.needsMarquee).toBe(true);
});

test('needsMarquee returns false when when scrollWidth is equal or less than displayed width', () => {
  jest
    .spyOn(subject.marqueeContainer, 'scrollWidth', 'get')
    .mockReturnValue(10);
  jest
    .spyOn(subject.marqueeContainer, 'clientWidth', 'get')
    .mockReturnValue(10);
  expect(subject.needsMarquee).toBe(false);
});

test('init adds scrolling content if needsMarquee is true', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(subject, 'createScrollTitle');
  subject.init();
  expect(subject.createScrollTitle).toHaveBeenCalled();
});

test('id is set in the constructor', () => {
  expect(subject.id).toBe('ABC123');
});

test('styleBlock is created during init', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  subject.init();
  expect(subject.styleBlock.id).toBe('ABC123');
  expect(document.head.querySelector('#ABC123').tagName.toLowerCase()).toBe(
    'style'
  );
});

test('Smarquee has a unique class attached', () => {
  expect(subject.marqueeContainer.classList).toContain('Smarquee');
  expect(subject.marqueeContainer.classList).toContain('Smarquee--ABC123');
});

test('activate adds the activate class', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  subject.init(true);
  expect(subject.scrollWrapper.classList).toContain('animate');
});

test('deactivate remove the activate class', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  subject.init();
  subject.deactivate();
  expect(subject.scrollWrapper.classList).not.toContain('animate');
});

test('restart removes active and readds after a short period', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(subject, 'activate');
  jest.spyOn(subject, 'deactivate');
  subject.init();
  subject.restart();
  expect(subject.activate).toHaveBeenCalled();
  expect(subject.deactivate).toHaveBeenCalled();
});

test('play updates playState with running', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(cssUtils, 'updatePlayState');

  subject.init();
  subject.play();

  expect(cssUtils.updatePlayState).toHaveBeenCalledWith(
    subject.scrollWrapper,
    'running'
  );
});

test('pause updates playState with paused', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(cssUtils, 'updatePlayState');

  subject.init();
  subject.pause();

  expect(cssUtils.updatePlayState).toHaveBeenCalledWith(
    subject.scrollWrapper,
    'paused'
  );
});

test('updateText updates the innerHtml with the new text', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  subject.init();
  expect(subject.originalMarqueeContent).toBe('A test title');
  expect(subject.marqueeContainer.innerHTML).toContain('A test title');
  subject.updateText('A new title');
  expect(subject.originalMarqueeContent).toBe('A new title');
  expect(subject.marqueeContainer.innerHTML).toContain('A new title');
});

test('updateText deactivates the animation', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(subject, 'deactivate');
  subject.init();
  subject.updateText('A new title');
  expect(subject.deactivate).toHaveBeenCalled();
});

test('updateText reinits with a delay if given', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.useFakeTimers();
  subject.init();
  subject.updateText('A new title', 2000);

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
});

test('udpateIterationCount updates iterations with given value', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(cssUtils, 'updateIterations');

  subject.init();
  subject.updateIterationCount(3);

  expect(cssUtils.updateIterations).toHaveBeenCalledWith(
    subject.scrollWrapper,
    3
  );
});

test('udpateIterationCount converts NaN values to infinite', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(cssUtils, 'updateIterations');

  subject.init();
  subject.updateIterationCount('google');

  expect(cssUtils.updateIterations).toHaveBeenCalledWith(
    subject.scrollWrapper,
    'infinite'
  );
});

test('updateDirection updates direction with given value', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(cssUtils, 'updateDirection');

  subject.init();
  subject.updateDirection('backwards');

  expect(cssUtils.updateDirection).toHaveBeenCalledWith(
    subject.scrollWrapper,
    'backwards'
  );
});

test('updateFillMode updates direction with given value', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(cssUtils, 'updateFillMode');

  subject.init();
  subject.updateFillMode('both');

  expect(cssUtils.updateFillMode).toHaveBeenCalledWith(
    subject.scrollWrapper,
    'both'
  );
});

test('updateTimingFunction updates direction with given value', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(cssUtils, 'updateTimingFunction');

  subject.init();
  subject.updateTimingFunction('ease-in');

  expect(cssUtils.updateTimingFunction).toHaveBeenCalledWith(
    subject.scrollWrapper,
    'ease-in'
  );
});
