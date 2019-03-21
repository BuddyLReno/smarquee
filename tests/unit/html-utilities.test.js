import * as htmlUtils from '../../src/html-utilities';

test('createScrollingContent adds duplicated content for scrolling', () => {
  document.body.innerHTML = `
  <h1 id="smarquee">This is a test title.</h1>
  `;
  const subject = document.querySelector('#smarquee');

  htmlUtils.createScrollTitle(subject.innerHTML, subject);

  expect(subject.innerHTML).toBe(
    '<span data-smarquee-scroll-wrapper="">This is a test title.<span data-smarquee-scroll-title="">This is a test title.</span></span>'
  );
});
