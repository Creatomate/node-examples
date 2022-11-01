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

    // First video
    new Creatomate.Video({
      time: 0,
      duration: 3,
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video4.mp4',
    }),

    // Second video
    new Creatomate.Video({
      time: 1,
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video5.mp4',
    }),

    // Apply a luma mask to the video above
    new Creatomate.Video({
      time: 1,
      source: 'https://creatomate-static.s3.amazonaws.com/demo/mask.mp4',
      maskMode: 'luma',
    }),
  ],
});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
