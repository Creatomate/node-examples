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

    // First row

    new Creatomate.Video({
      x: '16.6667%',
      y: '16.6667%',
      width: '33.3333%',
      height: '33.3333%',
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video1.mp4',
    }),

    new Creatomate.Video({
      x: '50%',
      y: '16.6667%',
      width: '33.3333%',
      height: '33.3333%',
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video2.mp4',
    }),

    new Creatomate.Video({
      x: '83.3333%',
      y: '16.6667%',
      width: '33.3333%',
      height: '33.3333%',
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video3.mp4',
    }),

    // Second row

    new Creatomate.Video({
      x: '16.6667%',
      y: '50%',
      width: '33.3333%',
      height: '33.3333%',
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video3.mp4',
    }),

    new Creatomate.Video({
      x: '50%',
      y: '50%',
      width: '33.3333%',
      height: '33.3333%',
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video1.mp4',
    }),

    new Creatomate.Video({
      x: '83.3333%',
      y: '50%',
      width: '33.3333%',
      height: '33.3333%',
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video2.mp4',
    }),

    // Third row

    new Creatomate.Video({
      x: '16.6667%',
      y: '83.3333%',
      width: '33.3333%',
      height: '33.3333%',
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video2.mp4',
    }),

    new Creatomate.Video({
      x: '50%',
      y: '83.3333%',
      width: '33.3333%',
      height: '33.3333%',
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video3.mp4',
    }),

    new Creatomate.Video({
      x: '83.3333%',
      y: '83.3333%',
      width: '33.3333%',
      height: '33.3333%',
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video1.mp4',
    }),

  ],
});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
