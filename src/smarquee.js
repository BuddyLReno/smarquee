import 'web-animations-js/web-animations-next-lite.min';
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
    this.animation = this.createAnimation();
    if (start) {
      this.play();
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

  createAnimation() {
    let keyframesScrolling = [
      { transform: 'translate3d(0px, 0, 0)' },
      {
        transform: `translate3d(-${
          this.animationCalulations.animatedDistance
        }px, 0, 0)`
      }
    ];

    let kfeScrolling = new KeyframeEffect(
      this.scrollWrapper,
      keyframesScrolling,
      {
        duration: this.animationCalulations.time * 1000,
        fill: 'both',
        delay: this.settings.pauseTime
      }
    );

    return new Animation(kfeScrolling, document.timeline);
  }

  play() {
    this.animation.play();
  }

  pause() {
    this.animation.pause();
  }
}
