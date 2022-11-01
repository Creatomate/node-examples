const Creatomate = require('creatomate');

const apiKey = process.argv[2];
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error('\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY');
  process.exit(1);
}

const client = new Creatomate.Client(apiKey);

const source = new Creatomate.Source({

  // Encodes to H.264 by default, a widely supported video format
  outputFormat: 'mp4',

  // Constant rate factor – a higher value means a higher compression
  crf: 27,

  elements: [
    new Creatomate.Video({

      // Provide any video file here. The video in this example is of HEVC (H.265), a format used by
      // iPhones but not supported by many video players.
      source: 'https://creatomate-static.s3.amazonaws.com/demo/h265.mov',
    }),
  ],
});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
