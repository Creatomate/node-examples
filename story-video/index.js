const Creatomate = require('creatomate');
const { createScene1 } = require('./createScene1');
const { createScene2 } = require('./createScene2');
const { createScene3 } = require('./createScene3');
const { createScene4 } = require('./createScene4');

const apiKey = process.argv[2];
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error('\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY');
  process.exit(1);
}

const client = new Creatomate.Client(apiKey);

const source = new Creatomate.Source({

  // Create a video (mp4). This can also be set to 'gif', 'jpg', or 'png'.
  outputFormat: 'mp4',

  // Dimensions of the output video
  width: 1080,
  height: 1920,

  // Frame rate in frames per second
  frameRate: 60,

  // Extract a still image from the video to be used as thumbnail or poster
  snapshotTime: 3.5,

  // Content of the video
  elements: [

    // Background music
    new Creatomate.Audio({
      source: 'https://creatomate-static.s3.amazonaws.com' +
        '/demo/pixabay-best-summer-128473.mp3',
      duration: null,
      audioFadeOut: 2,
    }),

    createScene1(),
    createScene2(),
    createScene3(),
    createScene4(),
  ],
});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
