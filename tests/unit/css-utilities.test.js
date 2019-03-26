import * as cssUtils from '../../src/css-utilities';

test('buildStyle returns the expected default style', () => {
  let subject = cssUtils.buildStyle('abc123', '23', '233');
  expect(subject).toContain('.Smarquee--abc123 {');
  expect(subject).toContain('.Smarquee--abc123 [data-smarquee-scroll-title]');
});
