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

    new Creatomate.Image({
      x: '50%',
      y: '16.6667%',
      width: '33.3333%',
      height: '33.3333%',
      source: 'https://creatomate-static.s3.amazonaws.com/demo/image1.jpg',

      // Rotate on the Z axis
      zRotation: [
        new Creatomate.Keyframe(0, 'start'),
        new Creatomate.Keyframe(360, 'end'),
      ],

    }),

    new Creatomate.Image({
      x: '16.6667%',
      y: '50%',
      width: '33.3333%',
      height: '33.3333%',
      source: 'https://creatomate-static.s3.amazonaws.com/demo/image1.jpg',

      // Rotate on the X axis
      xRotation: [
        new Creatomate.Keyframe(0, 'start'),
        new Creatomate.Keyframe(360, 'end'),
      ],
    }),

    new Creatomate.Image({
      x: '83.3333%',
      y: '50%',
      width: '33.3333%',
      height: '33.3333%',
      source: 'https://creatomate-static.s3.amazonaws.com/demo/image1.jpg',

      // Rotate on the Y axis
      yRotation: [
        new Creatomate.Keyframe(0, 'start'),
        new Creatomate.Keyframe(360, 'end'),
      ],
    }),

    new Creatomate.Image({
      x: '50%',
      y: '83.3333%',
      width: '33.3333%',
      height: '33.3333%',
      source: 'https://creatomate-static.s3.amazonaws.com/demo/image1.jpg',

      // Rotate on the Y axis
      yRotation: [
        new Creatomate.Keyframe(0, 'start'),
        new Creatomate.Keyframe(360, 'end'),
      ],

      // Don't render the backface
      backfaceVisible: false,
    }),

  ],

});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
