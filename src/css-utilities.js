export function buildStyle(id) {
  let style = `
  .Smarquee--${id} {
    --time: 15s;
    --distance: 0;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
  }

  .Smarquee--${id} [data-smarquee-scroll-title] {
    margin-left: 24px;
  }
  
  .Smarquee--${id} .animate {
    animation-name: marquee;
    animation-duration: var(--time);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    display: block;
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
  `;
  return style;
}
