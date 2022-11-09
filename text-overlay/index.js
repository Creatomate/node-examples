const Creatomate = require('creatomate');

const apiKey = process.argv[2];
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error('\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY');
  process.exit(1);
}

const client = new Creatomate.Client(apiKey);

const source = new Creatomate.Source({
  outputFormat: 'mp4',
  frameRate: 60,
  emojiStyle: 'apple', // Choose between 'facebook', 'google', 'twitter' and 'apple'

  elements: [

    new Creatomate.Video({
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video4.mp4',
    }),

    new Creatomate.Text({
      text: 'This text adjusts automatically to the size of the video. 🔥',
      y: '75%',
      width: '100%',
      height: '50%',
      xPadding: '5 vw',
      yPadding: '5 vh',
      yAlignment: '100%',
      font: new Creatomate.Font('Open Sans', 700),
      fontSizeMaximum: '10.4 vmin',
      background: new Creatomate.TextBackground('rgba(255,255,255,0.69)', '23%', '8%', '0%', '0%'),
      fillColor: '#333333',
      enter: new Creatomate.TextSlide({
        duration: 2,
        easing: 'quadratic-out',
        split: 'line',
        scope: 'element',
        backgroundEffect: 'scaling-clip',
      }),
    }),

  ],

});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
