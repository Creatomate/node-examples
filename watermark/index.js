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

  elements: [

    new Creatomate.Video({
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video1.mp4',
    }),

    // Add logo to the upper right corner
    new Creatomate.Image({
      source: 'https://creatomate-static.s3.amazonaws.com/demo/logoipsum.png',
      fit: 'contain',
      width: '60 vmin',
      height: '60 vmin',
      x: '100%',
      y: '0%',
      xAnchor: '100%',
      yAnchor: '0%',
      xAlignment: '100%',
      yAlignment: '0%',
      xPadding: '7 vmin',
      yPadding: '7 vmin',
      shadowColor: 'rgba(0,0,0,0.66)',
    }),
  ],
});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
