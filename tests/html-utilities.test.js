import * as htmlUtils from '../src/html-utilities';

test('createScrollingContent adds duplicated content for scrolling', () => {
  document.body.innerHTML = `
  <h1 id="smarquee">This is a test title.</h1>
  `;
  const subject = document.querySelector('#smarquee');

  htmlUtils.createScrollTitle(subject.innerHTML, subject);

  expect(subject.innerHTML).toContain(
    '<span data-smarquee-scroll-title="">This is a test title.</span>'
  );
});

test('appendStyleBlock adds a style block to the document head', () => {
  let subject = htmlUtils.appendStyleBlock(
    '.test { display: block; }',
    'ABC123'
  );

  expect(subject.id).toBe('ABC123');
  expect(subject.tagName.toLowerCase()).toBe('style');
  expect(subject.innerHTML).toBe('.test { display: block; }');
});
