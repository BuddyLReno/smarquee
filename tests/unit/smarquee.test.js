import Smarquee from '../../src/smarquee';

test('element with id smarquee is selected in constructor', () => {
  document.body.innerHTML = `
  <div id="smarquee">Some title</div>
  `;

  const smarquee = new Smarquee();
  expect(smarquee.marqueeContainer.id).toBe('smarquee');
});

test('preselected element is set to marqueeContainer on init', () => {
  document.body.innerHTML = `
  <div id="smarquee2">a test title</div>
  `;

  const smarquee = new Smarquee({
    element: document.querySelector('#smarquee2')
  });

  expect(smarquee.marqueeContainer.id).toBe('smarquee2');
  expect(smarquee.marqueeContainer.innerHTML).toBe('a test title');
});