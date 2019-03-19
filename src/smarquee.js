import defaults from './defaults';

export default class Smarquee {

  constructor(options = {}) {
    this.settings = Object.assign({}, defaults, options);
  }

  init() {
    console.log(this.settings);
  }
}