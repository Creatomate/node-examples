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
  duration: 3,

  elements: [

    new Creatomate.Video({
      x: '40%',
      y: '40%',
      width: '50%',
      height: '50%',
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video1.mp4',
    }),

    new Creatomate.Video({
      x: '60%',
      y: '60%',
      width: '50%',
      height: '50%',
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video2.mp4',

      // Choose between 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light',
      // 'soft-light', 'lighter', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity';
      blendMode: 'difference',
    }),

  ],
});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
