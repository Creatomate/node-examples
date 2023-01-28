const Creatomate = require('creatomate');

function createScene2() {

  return new Creatomate.Composition({

    track: 1,
    duration: 6,

    // Animate between the previous and current scene (wipe down)
    transition: new Creatomate.WipeDown({
      duration: 1,
      fade: false,
    }),

    elements: [

      // Background image
      new Creatomate.Image({

        source: 'https://creatomate-static.s3.amazonaws.com' +
          '/demo/unsplash-matteo-catanese-4KrQq8Z6Y5c.jpg',

        // Slowly zoom in the background image (Ken Burns effect)
        animations: [
          new Creatomate.Scale({
            easing: 'linear',
            startScale: '100%',
            endScale: '150%',
            fade: false,
          }),
        ],
      }),

      new Creatomate.Text({

        // Put the text at the center
        x: '50%',
        y: '50%',
        width: '88%',
        height: '40%',

        // Relative font size
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: '6.2 vmin',
        lineHeight: '100%',

        // Center text alignment
        xAlignment: '50%',
        yAlignment: '50%',

        // TikTok default text style
        fillColor: '#ffffff',
        strokeColor: '#000000',
        strokeWidth: '1.05 vmin',

        text: 'You can programmatically add your own text here. ' +
          'All you need is Node.js! 😊',

        // Animate the text (typewriter effect)
        animations: [
          new Creatomate.TextTypewriter({
            time: 1,
            duration: 5,
            easing: 'quadratic-out',
            typingStart: 0,
            typingDuration: 1,
          }),
        ],

      }),

    ],
  });
}

module.exports = { createScene2 };
