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
      source: 'https://creatomate-static.s3.amazonaws.com/demo/vertical.mp4',
      muted: true,
      fit: 'cover',
      colorOverlay: 'rgba(0,0,0,0.15)',
      blurRadius: 57,
      clip: true,
    }),
    new Creatomate.Video({
      source: 'https://creatomate-static.s3.amazonaws.com/demo/vertical.mp4',
      fit: 'contain',
    }),
  ],
});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
