const Creatomate = require('creatomate');

const apiKey = process.argv[2];
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error('\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY');
  process.exit(1);
}

const client = new Creatomate.Client(apiKey);

// This example shows how to take a screenshot from a video
// Look at the 'video-snapshot' example if you want to make a screenshot alongside a video render

const source = new Creatomate.Source({

  outputFormat: 'jpg',

  elements: [
    new Creatomate.Video({
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video1.mp4',

      // By default, the screenshot is taken at the beginning. To screenshot at 2 seconds, uncomment the following:
      // trimStart: 2,
    }),
  ],
});

console.log('Please wait while your image is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
