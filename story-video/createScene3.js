const Creatomate = require('creatomate');

function createScene3() {

  return new Creatomate.Composition({

    track: 1,
    duration: 6,

    // Animate between the previous and current scene (circular wipe)
    transition: new Creatomate.CircularWipe({
      duration: 1,
      fade: false,
    }),

    elements: [

      // Background video
      new Creatomate.Video({
        source: 'https://creatomate-static.s3.amazonaws.com' +
          '/demo/pexels-aerial-footage-of-the-mountains-peak-3121327.mp4',
      }),

      new Creatomate.Text({

        // Put the text at the bottom
        x: '50%',
        y: '66%',
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

        // Instagram text style
        fillColor: '#000000',
        background: new Creatomate.TextBackground('#ffffff', '68%', '32%', '24%', '5%'),

        text: 'Use any type of style, image, video clip, emoji, or background music. 🖌️🎨',

        // Animate the text (slide right line-by-line)
        animations: [
          new Creatomate.TextSlideRightLineByLine({
            time: 1,
            duration: 1.5,
            easing: 'quadratic-out',
            fade: false,
            backgroundEffect: 'sliding',
          }),
        ],

      }),

    ],
  });
}

module.exports = { createScene3 };
