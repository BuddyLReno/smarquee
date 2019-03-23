import * as cssUtils from '../src/css-utilities';

test('buildStyle returns the expected default style', () => {
  let subject = cssUtils.buildStyle('abc123', '23', '233');
  expect(subject).toBe(`
  .Smarquee.Smarquee--abc123 {
    --time: 23s;
    --distance: -233px;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    position: relative;
  }
  
  .Smarquee--abc123 .animate {
    animation-name: marquee;
    animation-duration: var(--time);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    display: block;
  }
  
  .Smarquee--abc123 .animate > span {
    margin-left: 24px;
  }
  
  @keyframes marquee {
    0% {
      transform: translate3d(0px, 0, 0);
    }
    70% {
      transform: translate3d(var(--distance), 0, 0);
    }
    100% {
      transform: translate3d(var(--distance), 0, 0);
    }
  }
  `);
});
