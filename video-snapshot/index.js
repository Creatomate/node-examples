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

  // At 2 seconds in, a screenshot is taken and stored alongside the video in 'snapshotUrl' in the render result
  // If you only want to create a screenshot and don't care about the video, refer to the 'video-screenshot' example
  snapshotTime: 2,

  elements: [
    new Creatomate.Video({
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video1.mp4',
    }),
  ],
});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {

    // Look for the 'snapshotUrl' property to access the snapshot image

    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
