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

  elements: [

    new Creatomate.Video({
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video1.mp4',
    }),

    new Creatomate.Rectangle({
      x: '0%',
      y: '0%',
      width: '100%',
      height: '3%',
      xAnchor: '0%',
      yAnchor: '0%',
      fillColor: 'rgba(224,241,59,0.88)',
      animations: [
        new Creatomate.Wipe({
          xAnchor: '0%',
          fade: false,
          easing: 'linear',
        }),
      ],
    }),
  ],
});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
