import defaults from './defaults';
import * as htmlUtils from './html-utilities';
import * as mathUtils from './math-utilities';
import * as cssUtils from './css-utilities';

export default class Smarquee {
  constructor(options = {}) {
    this.settings = Object.assign({}, defaults, options);

    this.animationCalulations = {
      distance: 0,
      animatedDistance: 0,
      time: 0
    };

    this.id = mathUtils.generateHash();
    this.styleBlock = null;

    if (this.settings.element) {
      this.marqueeContainer = this.settings.element;
    } else {
      this.marqueeContainer = document.querySelector(this.settings.selector);
    }

    this.marqueeContainer.classList.add('Smarquee', `Smarquee--${this.id}`);
    this.originalMarqueeContent = this.marqueeContainer.innerHTML;

    this.styleBlock = htmlUtils.appendStyleBlock(
      cssUtils.buildStyle(this.id, this.settings.scrollingTitleMargin),
      this.id
    );
  }

  get needsMarquee() {
    return (
      this.marqueeContainer.scrollWidth > this.marqueeContainer.clientWidth
    );
  }

  init(start = false) {
    if (this.needsMarquee === false) {
      return;
    }

    this.createScrollTitle();
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

  calculateAnimationProperties() {
    this.animationCalulations = mathUtils.calculateAnimationValues(
      this.marqueeContainer.scrollWidth,
      this.settings.velocity,
      this.settings.scrollingTitleMargin
    );
  }

  setAnimationProperties() {
    this.marqueeContainer.style.setProperty(
      '--time',
      `${this.animationCalulations.time}s`
    );
    this.marqueeContainer.style.setProperty(
      '--distance',
      `-${this.animationCalulations.animatedDistance}px`
    );
  }

  activate() {
    this.scrollWrapper.classList.add('animate');
  }

  deactivate() {
    this.scrollWrapper.classList.remove('animate');
  }
}
