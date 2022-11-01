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
  duration: 4,

  elements: [

    new Creatomate.Shape({

      width: '23.5227%',
      height: '41.8179%',

      xScale: [
        new Creatomate.Keyframe('20%', 0),
        new Creatomate.Keyframe('100%', 2, 'elastic-out'),
      ],

      yScale: [
        new Creatomate.Keyframe('20%', 0),
        new Creatomate.Keyframe('100%', 2, 'elastic-out'),
      ],

      zRotation: [
        new Creatomate.Keyframe(-90, 0),
        new Creatomate.Keyframe(0, 2, 'elastic-out'),
      ],

      fillColor: [
        new Creatomate.Keyframe('#333333', 0),
        new Creatomate.Keyframe('#0079ff', 0.94),
        new Creatomate.Keyframe('#0079ff', 2),
        new Creatomate.Keyframe('rgba(0,121,255,0)', 2.5),
      ],

      strokeColor: 'rgba(0,121,255,1)',

      strokeWidth: [
        new Creatomate.Keyframe('0 vmin', 2),
        new Creatomate.Keyframe('4.3 vmin', 2.5),
        new Creatomate.Keyframe('0 vmin', 3.5),
      ],

      strokeStart: [
        new Creatomate.Keyframe('0%', 2.5),
        new Creatomate.Keyframe('100%', 3.5),
      ],

      strokeOffset: [
        new Creatomate.Keyframe('0%', 2.5),
        new Creatomate.Keyframe('50%', 3.5),
      ],

      path: [
        new Creatomate.Keyframe('M 0 0 L 100 0 L 100 100 L 0 100 L 0 0 Z', 0.94),
        new Creatomate.Keyframe('M -20 -20 C 15 -55 85 -55 120 -20 C 155 15 155 85 120 120 C 85 155 15 155 -20 120 C -55 85 -55 15 -20 -20 Z', 2.5, 'elastic-out'),
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
