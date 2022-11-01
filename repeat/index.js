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
  width: 1280,
  height: 720,
  duration: 5,

  elements: [

    new Creatomate.Composition({

      width: [
        new Creatomate.Keyframe('100%', 1),
        new Creatomate.Keyframe('10%', 3),
      ],

      height: [
        new Creatomate.Keyframe('100%', 1),
        new Creatomate.Keyframe('10%', 3),
      ],

      zRotation: [
        new Creatomate.Keyframe(0, 2),
        new Creatomate.Keyframe(45, 3),
      ],

      repeat: true,

      elements: [
        new Creatomate.Video({
          source: 'https://creatomate-static.s3.amazonaws.com/demo/video4.mp4',
        }),
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
