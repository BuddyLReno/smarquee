import defaults from './defaults';

export default class Smarquee {

  constructor(options = {}) {
    this.settings = Object.assign({}, defaults, options);

    if (this.settings.element) {
      this.marqueeContainer = this.settings.element;
    } else {
      this.marqueeContainer = document.querySelector(this.settings.selector);
    }
  }

  init() {

  }
}