import defaults from './defaults';
import * as htmlUtils from './html-utilities';
import * as mathUtils from './math-utilities';

export default class Smarquee {
  constructor(options = {}) {
    this.settings = Object.assign({}, defaults, options);

    this.animationCalulations = {
      distance: 0,
      animatedDistance: 0,
      time: 0
    };

    if (this.settings.element) {
      this.marqueeContainer = this.settings.element;
    } else {
      this.marqueeContainer = document.querySelector(this.settings.selector);
    }

    this.originalMarqueeContent = this.marqueeContainer.innerHTML;
  }

  get needsMarquee() {
    return (
      this.marqueeContainer.scrollWidth > this.marqueeContainer.clientWidth
    );
  }

  async init() {
    if (!this.needsMarquee) {
      return;
    }

    await this.createScrollTitle();
    await this.calculateAnimationProperties();
    await this.setAnimationProperties();
    this.activate();
  }

  async createScrollTitle() {
    this.scrollWrapper = htmlUtils.createScrollTitle(
      this.originalMarqueeContent,
      this.marqueeContainer
    );
  }

  async calculateAnimationProperties() {
    this.animationCalulations = mathUtils.calculateAnimationValues(
      this.marqueeContainer.scrollWidth,
      this.settings.velocity,
      this.settings.scrollingTitleMargin
    );
  }

  async setAnimationProperties() {
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
