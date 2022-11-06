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
  frameRate: 30,
  duration: 8,
  elements: [

    new Creatomate.Video({
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video5.mp4',
      colorOverlay: 'rgba(0,0,0,0.3)',
    }),

    new Creatomate.Video({
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video5.mp4',
      xAnchor: '0%',
      yAnchor: '0%',
      width: '40%',
      height: '40%',

      x: [
        new Creatomate.Keyframe('5%', 0),
        new Creatomate.Keyframe('55%', 2, 'steps(1)'),
        new Creatomate.Keyframe('5%', 4, 'steps(1)'),
        new Creatomate.Keyframe('55%', 6, 'steps(1)'),
      ],

      y: [
        new Creatomate.Keyframe('5%', 0),
        new Creatomate.Keyframe('5%', 2, 'steps(1)'),
        new Creatomate.Keyframe('55%', 4, 'steps(1)'),
        new Creatomate.Keyframe('55%', 6, 'steps(1)'),
      ],

    }),

  ],
});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
