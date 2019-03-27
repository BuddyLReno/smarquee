function buildMainWrapper(id, styleOptions) {
  return `.Smarquee--${id} {
    --time: 15s;
    --distance: 0;
    --timingFunction: ${styleOptions.timingFunction};
    --iterationCount: ${styleOptions.iterationCount};
    --direction: ${styleOptions.direction};
    --fillMode: ${styleOptions.fillMode};
    --playState: ${styleOptions.playState};
    overflow: hidden;
    white-space: nowrap;
  }`;
}

function buildScrollMargin(id, styleOptions) {
  return `.Smarquee--${id} [data-smarquee-scroll-title] {
    margin-left: ${styleOptions.scrollingTitleMargin}px;
  }`;
}

function buildAnimationProperties(id, styleOptions) {
  return `.Smarquee--${id} .animate {
    animation-name: ${styleOptions.animationName};
    animation-duration: var(--time);
    animation-timing-function: var(--timingFunction);
    animation-iteration-count: var(--iterationCount);
    animation-direction: var(--direction);
    animation-fill-mode: var(--fillMode);
    animation-play-state: var(--playState);
  }`;
}

function buildKeyframes(styleOptions) {
  return `@keyframes ${styleOptions.animationName} {
    0% {
      transform: translate3d(0px, 0, 0);
    }
    ${100 - styleOptions.pausePercent}% {
      transform: translate3d(var(--distance), 0, 0);
    }
    100% {
      transform: translate3d(var(--distance), 0, 0);
    }`;
}

export function buildStyle(id, styleOptions) {
  let style = `
  ${buildMainWrapper(id, styleOptions)}

  ${buildScrollMargin(id, styleOptions)}
  
  ${buildAnimationProperties(id, styleOptions)}
  
  ${buildKeyframes(styleOptions)}
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

export function updateIterations(element, value) {
  element.style.setProperty('--iterationCount', value);
}

export function updateDirection(element, value) {
  element.style.setProperty('--direction', value);
}

export function updateFillMode(element, value) {
  element.style.setProperty('--fillMode', value);
}

export function updateTimingFunction(element, value) {
  element.style.setProperty('--timingFunction', value);
}
