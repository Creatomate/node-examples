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
  emojiStyle: 'apple', // Choose between 'facebook', 'google', 'twitter' and 'apple'

  elements: [

    new Creatomate.Video({
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video4.mp4',
    }),

    new Creatomate.Text({
      y: '74%',
      width: '92%',
      height: '14%',
      text: 'This text adjusts automatically to the resolution of the video.',
      fontFamily: 'Dosis',
      fontWeight: '600',
      fontSizeMinimum: '5.8 vmin',
      fillColor: '#fff',
      background: new Creatomate.TextBackground('#000', '25%', '25%', '20%', '100%'),
      xAlignment: '50%',
      yAlignment: '100%',
    }),

    new Creatomate.Text({
      y: '89%',
      width: '92%',
      height: '11%',
      text: 'Facebook, Google, Twitter and Apple emojis are supported. 🙂✌️',
      fontFamily: 'Dosis',
      fontWeight: '600',
      fontSizeMinimum: '5.8 vmin',
      fillColor: '#000',
      background: new Creatomate.TextBackground('#fff', '25%', '25%', '20%', '0%'),
      xAlignment: '50%',
      yAlignment: '50%',
    }),

  ],

});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
