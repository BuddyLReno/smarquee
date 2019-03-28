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
      direction: 'normal',
      fillMode: 'none',
      playState: 'running'
    }
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
      this.marqueeContainer.scrollWidth > this.marqueeContainer.clientWidth
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
    this.setupAnimationEvents();
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

  setupAnimationEvents() {
    this.scrollWrapper.addEventListener('animationstart', () => {
      console.log('animation start');
    });

    this.scrollWrapper.addEventListener('animationiteration', () => {
      console.log('iterated');
    });
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
    cssUtils.updatePlayState(this.scrollWrapper, 'running');
  }

  pause() {
    cssUtils.updatePlayState(this.scrollWrapper, 'paused');
  }

  updateText(text, delay = 0, start = true) {
    this.deactivate();
    this.originalMarqueeContent = this.marqueeContainer.innerHTML = text;

    setTimeout(() => {
      this.init(start);
    }, delay);
  }

  updateIterationCount(iterations) {
    cssUtils.updateIterations(
      this.scrollWrapper,
      isNaN(iterations) ? 'infinite' : iterations
    );
  }

  updateDirection(direction) {
    cssUtils.updateDirection(this.scrollWrapper, direction);
  }

  updateFillMode(fillMode) {
    cssUtils.updateFillMode(this.scrollWrapper, fillMode);
  }

  updateTimingFunction(timingFunction) {
    cssUtils.updateTimingFunction(this.scrollWrapper, timingFunction);
  }
}
