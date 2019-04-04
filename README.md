[![Maintainability](https://api.codeclimate.com/v1/badges/98e882574aabe5a4a64a/maintainability)](https://codeclimate.com/github/BuddyLReno/smarquee/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/98e882574aabe5a4a64a/test_coverage)](https://codeclimate.com/github/BuddyLReno/smarquee/test_coverage)
[![Build Status](https://travis-ci.org/BuddyLReno/smarquee.svg?branch=master)](https://travis-ci.org/BuddyLReno/smarquee)

# Smarquee

A smart scrolling marquee for audio players and other text tickers.

## Overview

Smarquee enables you to easily create a smooth, looping marquee without any hassle. Two lines of js is all it takes to create a marquee!

```html
<div id="smarquee">A title that needs to loop</div>
```

```javascript
let smarquee = new Smarquee();
smarquee.init();
```

## Key Features

- Intelligently determines if marquees are needed when changing content.
- Play/Pause Controls
- Animation callback events
- Easily update animation properties.
- Pure javascript and css transforms.
- Zero dependencies
- 2kb gzipped!

## Demo

View the interactive demo on [CodePen](https://codepen.io/BuddyLReno/full/XQXrxZ)

## Installation

```bash
$ npm i smarquee
```

Then import into your javascript.

```javascript
import Smarquee from 'smarquee';
```

Or include the minified script file in the dist folder. `/dist/smarquee.min.js`.

## Usage

**Basic Setup**
This will initialize Smarquee with all default options. Options can be passed in through Smarquee's constructor.

```html
<h2 id="smarquee">
  The Entire World Is Counting On Me And They Don't Even Know It - Norma Jean
</h2>
```

```javascript
let smarquee = new Smarquee(); // or new Smarquee({ OPTIONS });
smarquee.init();
```

## Options

Pass in options while instantiating a new Smarquee object.

```javascript
let smarquee = new Smarquee({
  selector: '#smarquee', // css selector used to grab the html element.
  element: null, // you can select your own element and pass it in here.
  // element supersedes the selector option.
  velocity: 50 // A represntation of the animation speed.
  // Lower is slower and higher is faster. How this affects the animation
  // will depend on the length of content being scrolled.
  styleOptions: {
    scrollingTitleMargin: 24, // in pixels. This is the size of the margin
    // between the original title and the duplicated title.
    animationName: 'marquee', // change the generated animation name.
    timingFunction: 'linear', // accepts values for the css property [animation-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function)
    iterationCount: 'infinite', // accepts numbers or 'infinite'.
    fillMode: 'none', // accepts none, forwards, backwards, or both.
    playState: 'running', // set running or paused as the initial playstate of the animation.
    delay: '0', // set delay for the start of the animation
    pausePercent: 30, // for animations that iterate more than once, you can build in a pause
    // this pause is activated at the end of the animation for X% of the remaining time in the
    // animation. This is to allow the scrolled in title to be re-read before starting the
    // animation over again. By default, this is set to 30% of the animation time.
    // From 0% to 70%, Smarquee will animate, then pause for 30% before firing the
    // onAnimationIteration() event.
  },
  // Events
  onAnimationStart() {}, // fires at the start of the animation.
  onAnimationEnd() {}, // fires when the animation is complete.
  // Does not fire if iterationCount is infinite.
  onAnimationIterate() {}, // fires when the animation iterates.
  onAnimationCancel() {}, // fires when the animation is canceled. see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/animationcancel_event) for details. You may have issues getting this event to fire.
  onClick() {} // fires when the marquee is clicked.
});
```

### CSS Styling

Smarquee objects have two classes added during init: `.Smarquee` and `.Smarquee--<ID>`. The id is uniquely generated to help namespace Smarquee's default styling. You may key off of these classes to customize instances of Smarquee.

Smarquee will not overwrite any existing classes that are already added to the element being used.

## API

### Properties

#### needsMarquee

Smarquee measures the area and determines if a marquee is needed.

#### id

Unique identifier for Smarquee. This id is attached to the generated style for namespacing.

#### marqueeContainer

HTML object that the instance of Smarquee is attached to.

#### scrollWrapper

Generated inner HTML wrapper of the Smarquee HTML object.

#### originalMarqueeContent

Original InnerHTML of the HTML object the instance of Smarquee is attached to.

#### styleBlock

HTML reference to the generated styleBlock styling the instance of Smarquee.

#### animationCalculations

JS object containing the various calculations required for animating Smarquee.

```javascript
animationCalculations = {
  distance: 0, // the width of the original content before init in pixels.
  animatedDistance: 0, // the distance in pixels needed to animate.
  time: 0 // as seconds. Calculated with distance and velocity.
};
```

### Methods

#### init(start = true)

Initializes a Smarquee instance. Accepts a boolean that will activate the animation automatically. Defaulted to `true`.

#### pause()

Pauses the animation.

#### play()

Plays the animation. Continues from where it left off from pause.

#### restart()

Restarts the animation. This will refire `onAnimationStart()`.

#### deactivate()

removes the animated class to stop the animation completely.

#### activate()

Adds the animation class to restart the animation. This will refire `onAnimationStart()`.

#### updateText(text, delay = 0, start = true)

Update the text used in the Smarquee instance. This will deinit the instance, insert the new text, and reasses if a Smarquee is needed. If the available space can display the content completely, Smarquee will not animate. This will refire `onAnimationStart()`.

`delay` in milliseconds. Sets a delay before `updateText` actually updates the text.

`start` as boolean. Can be passed in to keep Smarquee from automatically starting the animation of the newly updated text.

#### updateIterationCount(iterations)

Updates the number of iterations the animation will perform. Use `'infinite'` to loop indefinitely.

#### updateFillMode(fillMode)

Updates the animation's fill mode property.

#### updateDelay(delay)

Updates the animation's delay property. This will only be a factor when an animation is starting for the first time. This value is not used in iterations.

#### updateTimingFunction(timingFunction)

Updates the animation's timing function.

#### resetStyleProperties()

Removes all style properties that were updated via the API methods after init.

#### deInit()

Deinitializes the smarquee instance. The instance will require a call to `init()` to restart.

#### destroy()

No going back. The instance is completely destroyed. All html modifications and style blocks are removed. Content is returned to normal. a new Smarquee instance will need to be created.

## Licensing

Using Smarquee for a personal site or open source site is completely free forever.

To use Smarquee in a commercial project, please contact me for licensing options at [buddylreno@gmail.com](mailto:buddylreno@gmail.com).

## Contributing

Please do! I'd love your help and ideas to make Smarquee even better. Please read [CONTRIBUTING.md](https://github.com/BuddyLReno/smarquee/blob/master/CONTRIBUTING.md) for more details.

## License

[MPL-2.0](https://github.com/BuddyLReno/smarquee/blob/master/LICENSE) © Buddy Reno
