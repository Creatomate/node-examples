const Creatomate = require('creatomate');

function createScene4() {

  return new Creatomate.Composition({

    track: 1,
    duration: 6,

    // Animate between the previous and current scene (fade effect)
    transition: new Creatomate.Fade({
      duration: 1,
    }),

    elements: [

      // Background video
      new Creatomate.Video({
        source: 'https://creatomate-static.s3.amazonaws.com' +
          '/demo/pexels-person-on-a-cliff-overlooking-the-mountains-2040075.mp4',
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

        text: 'Automate the creation of any kind of storytelling video. 🚀',

        // Animate the text
        animations: [

          // Fly-in text animation
          new Creatomate.TextFlyInLineByLine({
            time: 1,
            duration: 1.5,
            easing: 'quadratic-out',
          }),

          // Make the text wiggle as long as it is on screen
          new Creatomate.Wiggle({
            easing: 'linear',
            zRotation: '4°',
            rampDuration: '0%',
            frequency: '0.5 Hz',
          }),
        ],

      }),

    ],
  });
}

module.exports = { createScene4 };
