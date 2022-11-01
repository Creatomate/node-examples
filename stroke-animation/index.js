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

    // Rectangle with border radius
    new Creatomate.Rectangle({
      width: '80%',
      height: '80%',
      strokeColor: '#ffffff',
      strokeWidth: '3.1 vmin',
      strokeEnd: [
        new Creatomate.Keyframe('0%', 'start'),
        new Creatomate.Keyframe('100%', 'end'),
      ],
      strokeOffset: [
        new Creatomate.Keyframe('0%', 'start'),
        new Creatomate.Keyframe('50%', 'end'),
      ],
      borderRadius: '17.6 vmin',
    }),

    // Bézier curve
    new Creatomate.Shape({
      time: 0,
      x: 640,
      y: 360,
      strokeColor: '#ffffff',
      strokeWidth: '2.6 vmin',
      strokeEnd: [
        new Creatomate.Keyframe('0%', 0),
        new Creatomate.Keyframe('100%', 3),
      ],
      path: 'M -393.6568 154.7581 C -393.6568 154.7581 -26.0129 266.9806 55.5918 169.7829 C 137.1971 72.5862 -161.4926 -83.7996 -63.0777 -179.9604 C 35.3371 -276.1202 297.4396 -139.9921 297.4396 -139.9921',
    }),

    // Arrow
    new Creatomate.Shape({
      time: 3,
      x: 908.8047,
      y: 206.6498,
      width: '4.4742%',
      height: '13.0843%',
      strokeColor: '#ffffff',
      strokeWidth: '2.6 vmin',
      strokeEnd: [
        new Creatomate.Keyframe('0%', 0),
        new Creatomate.Keyframe('100%', 1),
      ],
      path: 'M 57.8803 0 L 100 63.7958 L -3.6107 90.1225',
    }),

  ],
});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
