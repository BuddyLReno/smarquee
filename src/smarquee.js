import defaults from './defaults';

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
    const titleContent = this.marqueeContainer.innerHTML;
    const scrollTitle = `<span data-marquee-scroll-wrapper>${titleContent}<span data-smarquee-scroll-title>${titleContent}</span></span>`;

    this.marqueeContainer.innerHTML = scrollTitle;
    this.scrollWrapper = this.marqueeContainer.querySelector('[data-marquee-scroll-wrapper]');
  }

  setAnimationProperties() {
    const distance = this.marqueeContainer.scrollWidth;
    const finalDistance = distance / 2 + 24;
    const time = distance / this.settings.velocity;

    this.marqueeContainer.style.setProperty('--time', `${time}s`);
    this.marqueeContainer.style.setProperty('--distance', `-${finalDistance}px`);

    this.animationCalulations.distance = distance;
    this.animationCalulations.animatedDistance = finalDistance;
    this.animationCalulations.time = time;

    this.scrollWrapper.classList.add('animate');
  }

}