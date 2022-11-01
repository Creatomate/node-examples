const Creatomate = require('creatomate');

const apiKey = process.argv[2];
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error('\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY');
  process.exit(1);
}

const client = new Creatomate.Client(apiKey);

const source = new Creatomate.Source({

  outputFormat: 'gif',

  // Set to 'fast' or 'best' depending on your preference
  gifQuality: 'best',

  // Compression level ranging from 0 to 200 (0 means no compression, 200 means heavy compression)
  gifCompression: 30,

  // Frame rate of the GIF
  frameRate: 15,

  // GIF width
  width: 480,

  // GIF height
  height: 272,

  elements: [
    new Creatomate.Video({
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video1.mp4',
    }),
  ],
});

console.log('Please wait while your GIF is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
