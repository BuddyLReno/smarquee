import { defaults, styleOptions } from './defaults';
import * as htmlUtils from './html-utilities';
import * as mathUtils from './math-utilities';
import * as cssUtils from './css-utilities';

export default class Smarquee {
  constructor(options = {}) {
    this.assignSettings(options);

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
      cssUtils.buildStyle(this.id, this.settings.styleOptions),
      this.id
    );
  }

  assignSettings(options) {
    this.settings = Object.assign({}, defaults, options);
    this.settings.styleOptions = Object.assign(
      {},
      styleOptions,
      options.hasOwnProperty('styleOptions') ? options.styleOptions : {}
    );
  }

  get needsMarquee() {
    return (
      this.marqueeContainer.scrollWidth > this.marqueeContainer.clientWidth
    );
  }

  init(start = true) {
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
}
