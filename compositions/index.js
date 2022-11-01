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

      elements: [
        new Creatomate.Image({
          source: 'https://creatomate-static.s3.amazonaws.com/demo/image1.jpg',
        }),
        new Creatomate.Text({
          width: '100%',
          height: '10%',
          text: 'Place elements in the same composition to group them',
          background: new Creatomate.TextBackground('#fff', '25%', '25%', '20%', '0%'),
          xAlignment: '50%',
        }),
      ],

      width: [
        new Creatomate.Keyframe('100%', 1),
        new Creatomate.Keyframe('50%', 3),
      ],

      height: [
        new Creatomate.Keyframe('100%', 3),
        new Creatomate.Keyframe('50%', 4),
      ],

      yRotation: [
        new Creatomate.Keyframe(0, 4),
        new Creatomate.Keyframe(360, 5),
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
