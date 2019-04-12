import * as htmlUtils from './html-utilities';
import * as mathUtils from './math-utilities';
import * as cssUtils from './css-utilities';

export default class Smarquee {
  // default props
  defaults = {
    selector: '#smarquee',
    element: null,
    velocity: 50,
    styleOptions: {
      scrollingTitleMargin: 24,
      animationName: 'marquee',
      timingFunction: 'linear',
      iterationCount: 'infinite',
      pausePercent: 30,
      fillMode: 'none',
      playState: 'running',
      delay: '0s'
    },
    onAnimationStart() {},
    onAnimationIterate() {},
    onAnimationEnd() {},
    onAnimationCancel() {},
    onClick() {}
  };
  animationCalulations = {
    distance: 0,
    animatedDistance: 0,
    time: 0
  };
  id = null;
  marqueeContainer = null;
  scrollWrapper = null;
  originalMarqueeContent = '';
  styleBlock = null;

  constructor(options = {}) {
    this.id = mathUtils.generateHash();

    this.assignSettings(options);

    this.setupMarqueeContainer();

    this.styleBlock = htmlUtils.appendStyleBlock(
      cssUtils.buildStyle(this.id, this.settings.styleOptions),
      this.id
    );
  }

  // getters and setters
  get needsMarquee() {
    return (
      this.marqueeContainer.scrollWidth >= this.marqueeContainer.clientWidth
    );
  }

  assignSettings(options) {
    this.settings = Object.assign({}, this.defaults, options);
    this.settings.styleOptions = Object.assign(
      {},
      this.defaults.styleOptions,
      options.hasOwnProperty('styleOptions') ? options.styleOptions : {}
    );
  }

  setupMarqueeContainer() {
    if (this.settings.element) {
      this.marqueeContainer = this.settings.element;
    } else {
      this.marqueeContainer = document.querySelector(this.settings.selector);
    }

    this.marqueeContainer.classList.add('Smarquee', `Smarquee--${this.id}`);
    this.originalMarqueeContent = this.marqueeContainer.innerHTML;
  }

  init(start = true) {
    if (this.needsMarquee === false) {
      return;
    }

    this.createScrollTitle();
    this.setupEventListeners();
    this.calculateAnimationProperties();
    this.setAnimationProperties();

    if (start) {
      this.activate();
    }
  }

  createScrollTitle() {
    this.scrollWrapper = htmlUtils.createScrollTitle(
      this.originalMarqueeContent,
      this.marqueeContainer
    );
  }

  setupEventListeners() {
    this.scrollWrapper.addEventListener(
      'animationstart',
      this.settings.onAnimationStart
    );

    this.scrollWrapper.addEventListener(
      'animationiteration',
      this.settings.onAnimationIterate
    );

    this.scrollWrapper.addEventListener(
      'animationend',
      this.settings.onAnimationEnd
    );

    this.scrollWrapper.addEventListener(
      'animationcancel',
      this.settings.onAnimationCancel
    );

    this.scrollWrapper.addEventListener('click', this.settings.onClick);
  }

  calculateAnimationProperties() {
    this.animationCalulations = mathUtils.calculateAnimationValues(
      this.marqueeContainer.scrollWidth,
      this.settings.velocity,
      this.settings.styleOptions.scrollingTitleMargin
    );
  }

  setAnimationProperties() {
    cssUtils.setAnimationProperties(
      this.marqueeContainer,
      this.animationCalulations.time,
      this.animationCalulations.animatedDistance
    );
  }

  activate() {
    this.scrollWrapper.classList.add('animate');
  }

  deactivate() {
    this.scrollWrapper.classList.remove('animate');
  }

  restart() {
    this.deactivate();
    setTimeout(() => {
      this.activate();
    }, 500);
  }

  play() {
    cssUtils.updatePlayState(this.marqueeContainer, 'running');
  }

  pause() {
    cssUtils.updatePlayState(this.marqueeContainer, 'paused');
  }

  updateText(text, delay = 0, start = true) {
    setTimeout(
      (newText, shouldStart) => {
        this.deactivate();
        this.originalMarqueeContent = this.marqueeContainer.innerHTML = newText;
        this.init(shouldStart);
      },
      delay,
      text,
      start
    );
  }

  updateIterationCount(iterations) {
    cssUtils.updateIterations(
      this.marqueeContainer,
      isNaN(iterations) ? 'infinite' : iterations
    );
  }

  updateFillMode(fillMode) {
    cssUtils.updateFillMode(this.marqueeContainer, fillMode);
  }

  updateDelay(delay) {
    cssUtils.updateDelay(this.marqueeContainer, delay);
  }

  updateTimingFunction(timingFunction) {
    cssUtils.updateTimingFunction(this.marqueeContainer, timingFunction);
  }

  resetStyleProperties() {
    cssUtils.resetStyleProperties(this.marqueeContainer);
  }

  deInit() {
    this.deactivate();
    this.marqueeContainer.innerHTML = this.originalMarqueeContent;
    this.scrollWrapper = null;
  }

  destroy() {
    this.deInit();
    this.originalMarqueeContent = '';
    this.marqueeContainer = null;
    this.styleBlock.parentNode.removeChild(this.styleBlock);
    this.styleBlock = null;
  }
}
