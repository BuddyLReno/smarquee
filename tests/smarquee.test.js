import Smarquee from '../src/smarquee';
import * as cssUtils from '../src/css-utilities';
jest.mock('../src/math-utilities', () => ({
  generateHash: () => 'ABC123',
  calculateAnimationValues: () => ({
    distance: 200,
    animatedDistance: 100,
    time: 30
  })
}));

let subject = null;
beforeEach(() => {
  document.body.innerHTML = '<div id="smarquee">A test title</div>';

  subject = new Smarquee();
});

test('element with id smarquee is selected in constructor', () => {
  expect(subject.marqueeContainer.id).toBe('smarquee');
});

test('preselected element is set to marqueeContainer on init', () => {
  document.body.innerHTML = `
  <div id="smarquee2">a test title</div>
  `;

  subject = new Smarquee({
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
      fillMode: 'none',
      playState: 'running'
    }
  });
});

test('settings object returns with default event listeners', () => {
  expect(subject.settings).toHaveProperty('onAnimationStart');
  expect(subject.settings).toHaveProperty('onAnimationIterate');
  expect(subject.settings).toHaveProperty('onAnimationEnd');
  expect(subject.settings).toHaveProperty('onAnimationCancel');
  expect(subject.settings).toHaveProperty('onClick');
});

test('settings object can override styleOptions', () => {
  subject = new Smarquee({
    styleOptions: {
      scrollingTitleMargin: 36
    }
  });

  expect(subject.settings.styleOptions.scrollingTitleMargin).toBe(36);
});

test('assignSettings object reassigns defaults with passed in properties', () => {
  let testObj = {
    selector: '#smarquee',
    element: null,
    velocity: 50,
    styleOptions: {
      scrollingTitleMargin: 24,
      animationName: 'marquee',
      timingFunction: 'linear',
      iterationCount: 'infinite',
      pausePercent: 30,
      fillMode: 'none',
      playState: 'running'
    }
  };

  expect(subject.settings).toMatchObject(testObj);
  subject.assignSettings({ velocity: 60, styleOptions: { pausePercent: 40 } });
  testObj.velocity = 60;
  testObj.styleOptions.pausePercent = 40;
  expect(subject.settings).toMatchObject(testObj);
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

test('needsMarquee returns true when when scrollWidth is the same as displayed width', () => {
  jest
    .spyOn(subject.marqueeContainer, 'scrollWidth', 'get')
    .mockReturnValue(800);
  jest
    .spyOn(subject.marqueeContainer, 'clientWidth', 'get')
    .mockReturnValue(800);
  expect(subject.needsMarquee).toBe(true);
});

test('needsMarquee returns false when when scrollWidth is less than displayed width', () => {
  jest
    .spyOn(subject.marqueeContainer, 'scrollWidth', 'get')
    .mockReturnValue(15);
  jest
    .spyOn(subject.marqueeContainer, 'clientWidth', 'get')
    .mockReturnValue(100);
  expect(subject.needsMarquee).toBe(false);
});

test("init doesn't initiate if no marquee is needed", () => {
  jest.spyOn(subject, 'createScrollTitle');
  jest.spyOn(subject, 'setupEventListeners');
  jest.spyOn(subject, 'calculateAnimationProperties');
  jest.spyOn(subject, 'setAnimationProperties');
  jest.spyOn(subject, 'activate');

  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(false);

  subject.init();

  expect(subject.createScrollTitle).toHaveBeenCalledTimes(0);
  expect(subject.setupEventListeners).toHaveBeenCalledTimes(0);
  expect(subject.calculateAnimationProperties).toHaveBeenCalledTimes(0);
  expect(subject.setAnimationProperties).toHaveBeenCalledTimes(0);
  expect(subject.activate).toHaveBeenCalledTimes(0);
});

test("init doesn't activate is start is false", () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(subject, 'activate');

  subject.init(false);

  expect(subject.activate).toHaveBeenCalledTimes(0);
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

test('setupEventListeners is called during init', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(subject, 'setupEventListeners');
  subject.init();

  expect(subject.setupEventListeners).toHaveBeenCalledTimes(1);
});

test('setupEventListeners attaches events to scrollWrapper', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  subject.init();
  jest.spyOn(subject.scrollWrapper, 'addEventListener');
  subject.setupEventListeners();

  expect(subject.scrollWrapper.addEventListener).toHaveBeenCalledTimes(5);

  expect(subject.scrollWrapper.addEventListener).toHaveBeenCalledWith(
    'animationstart',
    subject.settings.onAnimationStart
  );
  expect(subject.scrollWrapper.addEventListener).toHaveBeenCalledWith(
    'animationiteration',
    subject.settings.onAnimationIterate
  );
  expect(subject.scrollWrapper.addEventListener).toHaveBeenCalledWith(
    'animationend',
    subject.settings.onAnimationEnd
  );
  expect(subject.scrollWrapper.addEventListener).toHaveBeenCalledWith(
    'animationcancel',
    subject.settings.onAnimationCancel
  );
  expect(subject.scrollWrapper.addEventListener).toHaveBeenCalledWith(
    'click',
    subject.settings.onClick
  );
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
  subject.init();
  jest.useFakeTimers();
  jest.spyOn(subject, 'activate');
  jest.spyOn(subject, 'deactivate');
  subject.restart();
  expect(subject.deactivate).toHaveBeenCalled();
  jest.runAllTimers();
  expect(setTimeout).toHaveBeenCalled();
  expect(subject.activate).toHaveBeenCalled();
});

test('play updates playState with running', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(cssUtils, 'updatePlayState');

  subject.init();
  subject.play();

  expect(cssUtils.updatePlayState).toHaveBeenCalledWith(
    subject.marqueeContainer,
    'running'
  );
});

test('pause updates playState with paused', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(cssUtils, 'updatePlayState');

  subject.init();
  subject.pause();

  expect(cssUtils.updatePlayState).toHaveBeenCalledWith(
    subject.marqueeContainer,
    'paused'
  );
});

test('updateText updates the innerHtml with the new text', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.useFakeTimers();
  subject.init();
  expect(subject.originalMarqueeContent).toBe('A test title');
  expect(subject.marqueeContainer.innerHTML).toContain('A test title');
  subject.updateText('A new title');
  jest.runAllTimers();
  expect(subject.originalMarqueeContent).toBe('A new title');
  expect(subject.marqueeContainer.innerHTML).toContain('A new title');
});

test('updateText deactivates the animation', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(subject, 'deactivate');
  jest.useFakeTimers();
  subject.init();
  subject.updateText('A new title');
  jest.runAllTimers();
  expect(subject.deactivate).toHaveBeenCalled();
});

test('updateText reinits with a delay if given', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.useFakeTimers();
  subject.init();
  jest.spyOn(subject, 'init');
  expect(subject.init).not.toHaveBeenCalled();
  subject.updateText('A new title', 2000);
  jest.runAllTimers();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(subject.init).toHaveBeenCalled();
});

test('udpateIterationCount updates iterations with given value', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(cssUtils, 'updateIterations');

  subject.init();
  subject.updateIterationCount(3);

  expect(cssUtils.updateIterations).toHaveBeenCalledWith(
    subject.marqueeContainer,
    3
  );
});

test('udpateIterationCount converts NaN values to infinite', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(cssUtils, 'updateIterations');

  subject.init();
  subject.updateIterationCount('google');

  expect(cssUtils.updateIterations).toHaveBeenCalledWith(
    subject.marqueeContainer,
    'infinite'
  );
});

test('updateFillMode updates fill mode with given value', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(cssUtils, 'updateFillMode');

  subject.init();
  subject.updateFillMode('both');

  expect(cssUtils.updateFillMode).toHaveBeenCalledWith(
    subject.marqueeContainer,
    'both'
  );
});

test('updateDelay updates delay with given value', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(cssUtils, 'updateDelay');

  subject.init();
  subject.updateDelay('250ms');

  expect(cssUtils.updateDelay).toHaveBeenCalledWith(
    subject.marqueeContainer,
    '250ms'
  );
});

test('resetStyleProperties removes properties updated after init', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(cssUtils, 'resetStyleProperties');

  subject.init();
  subject.resetStyleProperties();

  expect(cssUtils.resetStyleProperties).toHaveBeenCalledWith(
    subject.marqueeContainer
  );
});

test('updateTimingFunction updates timing function with given value', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(cssUtils, 'updateTimingFunction');

  subject.init();
  subject.updateTimingFunction('ease-in');

  expect(cssUtils.updateTimingFunction).toHaveBeenCalledWith(
    subject.marqueeContainer,
    'ease-in'
  );
});

test('deInit resets back to initial state before calling init', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(subject, 'deactivate');

  expect(subject.marqueeContainer.innerHTML).toBe(
    subject.originalMarqueeContent
  );
  expect(subject.scrollWrapper).toBe(null);

  subject.init();
  subject.deInit();

  expect(subject.marqueeContainer.innerHTML).toBe(
    subject.originalMarqueeContent
  );
  expect(subject.scrollWrapper).toBe(null);
  expect(subject.deactivate).toHaveBeenCalledTimes(1);
});

test('destroy completely kills the smarquee object', () => {
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(subject, 'deInit');

  subject.init();
  subject.destroy();

  expect(subject.deInit).toHaveBeenCalledTimes(1);
  expect(subject.originalMarqueeContent).toBe('');
  expect(subject.marqueeContainer).toBe(null);
  expect(subject.styleBlock).toBe(null);
});
