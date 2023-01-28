const Creatomate = require('creatomate');

function createScene1() {

  return new Creatomate.Composition({

    track: 1,
    duration: 5,

    elements: [

      // Background image
      new Creatomate.Image({

        source: 'https://creatomate-static.s3.amazonaws.com' +
          '/demo/unsplash-jeremy-bishop-dvACrXUExLs.jpg',

        // Slowly zoom out the background image (Ken Burns effect)
        animations: [
          new Creatomate.Scale({
            easing: 'linear',
            startScale: '150%',
            endScale: '100%',
            fade: false,
          }),
        ],
      }),

      new Creatomate.Text({

        // Put the text at the top
        x: '50%',
        y: '33%',
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

        text: 'Did you know you can create TikTok, Instagram, ' +
          'and YouTube videos using Node.js? 🔥',

        // Animate the text (slide up line-by-line)
        animations: [
          new Creatomate.TextSlideUpLineByLine({
            time: 0,
            duration: 1.5,
            easing: 'quadratic-out',
            scope: 'split-clip',
            distance: '100%',
          }),
        ],

      }),

    ],
  });
}

module.exports = { createScene1 };
