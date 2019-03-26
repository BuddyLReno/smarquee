import Smarquee from '../../src/smarquee';
import MathUtils from '../../src/math-utilities';
jest.mock('../../src/math-utilities', () => ({
  generateHash: () => {
    return 'ABC123';
  },
  calculateAnimationValues: () => {
    return {
      distance: 200,
      animatedDistance: 100,
      time: 30
    };
  }
}));

test('element with id smarquee is selected in constructor', () => {
  document.body.innerHTML = `
  <div id="smarquee">Some title</div>
  `;

  const subject = new Smarquee();
  expect(subject.marqueeContainer.id).toBe('smarquee');
});

test('preselected element is set to marqueeContainer on init', () => {
  document.body.innerHTML = `
  <div id="smarquee2">a test title</div>
  `;

  const subject = new Smarquee({
    element: document.querySelector('#smarquee2')
  });

  expect(subject.marqueeContainer.id).toBe('smarquee2');
  expect(subject.marqueeContainer.innerHTML).toBe('a test title');
});

test('needsMarquee returns true when when scrollWidth is larger than displayed width', () => {
  document.body.innerHTML = `
  <h1 id="smarquee">This is a long test title that needs a marquee</h1>
  `;

  let subject = new Smarquee();
  jest
    .spyOn(subject.marqueeContainer, 'scrollWidth', 'get')
    .mockReturnValue(100);
  jest
    .spyOn(subject.marqueeContainer, 'clientWidth', 'get')
    .mockReturnValue(10);
  expect(subject.needsMarquee).toBe(true);
});

test('needsMarquee returns false when when scrollWidth is equal or less than displayed width', () => {
  document.body.innerHTML = `
  <h1 id="smarquee">This is a long test title that needs a marquee</h1>
  `;

  let subject = new Smarquee();
  jest
    .spyOn(subject.marqueeContainer, 'scrollWidth', 'get')
    .mockReturnValue(10);
  jest
    .spyOn(subject.marqueeContainer, 'clientWidth', 'get')
    .mockReturnValue(10);
  expect(subject.needsMarquee).toBe(false);
});

test('init adds scrolling content if needsMarquee is true', () => {
  document.body.innerHTML = `
  <h1 id="smarquee">This is a long test title that needs a marquee</h1>
  `;

  let subject = new Smarquee();
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  jest.spyOn(subject, 'createScrollTitle');
  subject.init();
  expect(subject.createScrollTitle).toHaveBeenCalled();
});

test('id is set in the constructor', () => {
  document.body.innerHTML = `
  <h1 id="smarquee">This is a title.</h1>
  `;

  let subject = new Smarquee();
  expect(subject.id).toBe('ABC123');
});

test('styleBlock is created during init', () => {
  document.body.innerHTML = `
  <h1 id="smarquee">This is a title.</h1>
  `;

  let subject = new Smarquee();
  jest.spyOn(subject, 'needsMarquee', 'get').mockReturnValue(true);
  subject.init();
  expect(subject.styleBlock.id).toBe('ABC123');
  expect(document.head.querySelector('#ABC123').tagName.toLowerCase()).toBe(
    'style'
  );
});

test('Smarquee has a unique class attached', () => {
  document.body.innerHTML = `
  <h1 id="smarquee">This is a title.</h1>
  `;

  let subject = new Smarquee();

  expect(subject.marqueeContainer.classList).toContain('Smarquee');
  expect(subject.marqueeContainer.classList).toContain('Smarquee--ABC123');
});
