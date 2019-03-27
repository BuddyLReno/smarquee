export function buildStyle(id, styleOptions) {
  let style = `
  .Smarquee--${id} {
    --time: 15s;
    --distance: 0;
    --timingFunction: ${styleOptions.timingFunction};
    --iterationCount: ${styleOptions.iterationCount};
    --direction: ${styleOptions.direction};
    --fillMode: ${styleOptions.fillMode};
    --playState: ${styleOptions.playState};
    overflow: hidden;
    white-space: nowrap;
  }

  .Smarquee--${id} [data-smarquee-scroll-title] {
    margin-left: ${styleOptions.scrollingTitleMargin}px;
  }
  
  .Smarquee--${id} .animate {
    animation-name: ${styleOptions.animationName};
    animation-duration: var(--time);
    animation-timing-function: var(--timingFunction);
    animation-iteration-count: var(--iterationCount);
    animation-direction: var(--direction);
    animation-fill-mode: var(--fillMode);
    animation-play-state: var(--playState);
  }
  
  @keyframes ${styleOptions.animationName} {
    0% {
      transform: translate3d(0px, 0, 0);
    }
    ${100 - styleOptions.pausePercent}% {
      transform: translate3d(var(--distance), 0, 0);
    }
    100% {
      transform: translate3d(var(--distance), 0, 0);
    }
  `;
  return style;
}

export function setAnimationProperties(element, time, distance) {
  element.style.setProperty('--time', `${time}s`);
  element.style.setProperty('--distance', `-${distance}px`);
}

export function updatePlayState(element, value) {
  element.style.setProperty('--playState', value);
}
