function buildMainWrapper(id, styleOptions) {
  return `.Smarquee--${id} {
    --time: 15s;
    --distance: 0;
    --timingFunction: ${styleOptions.timingFunction};
    --iterationCount: ${styleOptions.iterationCount};
    --fillMode: ${styleOptions.fillMode};
    --playState: ${styleOptions.playState};
    --delay: ${styleOptions.delay};
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
    animation-delay: var(--delay);
    animation-timing-function: var(--timingFunction);
    animation-iteration-count: var(--iterationCount);
    animation-direction: forwards;
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

export function updateFillMode(element, value) {
  element.style.setProperty('--fillMode', value);
}

export function updateTimingFunction(element, value) {
  element.style.setProperty('--timingFunction', value);
}

export function updateDelay(element, value) {
  element.style.setProperty('--delay', value);
}

export function resetStyleProperties(element) {
  element.style.removeProperty('--playState');
  element.style.removeProperty('--iterationCount');
  element.style.removeProperty('--fillMode');
  element.style.removeProperty('--timingFunction');
  element.style.removeProperty('--delay');
}
