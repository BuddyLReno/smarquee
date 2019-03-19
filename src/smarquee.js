export class Smarquee {
  defaults = {
    selector: '[data-smarquee]',
    velocity: 50,
    titleSiblingMargin: 36
  }

  settings = {}

  constructor(options = {}) {
    settings = Object.assign({}, defaults, options);
    console.log(settings);
  }
}