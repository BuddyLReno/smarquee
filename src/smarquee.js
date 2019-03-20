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
    }

    if (this.settings.element) {
      this.marqueeContainer = this.settings.element;
    } else {
      this.marqueeContainer = document.querySelector(this.settings.selector);
    }

    this.originalMarqueeContent = this.marqueeContainer.innerHTML;
  }

  get needsMarquee() {
    return this.marqueeContainer.scrollWidth > this.marqueeContainer.clientWidth;
  }

  init() {
    if (this.needsMarquee) {
      this.createScrollTitle();
      this.setAnimationProperties();
    }
  }

  createScrollTitle() {
    this.scrollWrapper = htmlUtils.createScrollTitle(this.originalMarqueeContent, this.marqueeContainer);
  }

  setAnimationProperties() {
    this.animationCalulations = mathUtils.calculateAnimationValues(this.marqueeContainer.scrollWidth, this.settings.velocity, this.settings.scrollingTitleMargin);

    this.marqueeContainer.style.setProperty('--time', `${this.animationCalulations.time}s`);
    this.marqueeContainer.style.setProperty('--distance', `-${this.animationCalulations.animatedDistance}px`);
  }

  activateAnimation() {
    this.scrollWrapper.classList.add('animate');
  }

  deactivateAnimation() {
    this.scrollWrapper.classList.remove('animate');
  }
}