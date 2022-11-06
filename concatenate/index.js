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
  elements: [

    new Creatomate.Video({
      track: 1,
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video1.mp4',
    }),

    new Creatomate.Video({
      track: 1,
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video2.mp4',

      // Add a transition like this:
      // transition: new Creatomate.Fade({ duration: 1 }),
    }),

  ],
});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
