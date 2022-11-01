const Creatomate = require('creatomate');

const apiKey = process.argv[2];
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error('\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY');
  process.exit(1);
}

const client = new Creatomate.Client(apiKey);

const filters = [
  null,
  new Creatomate.ColorFilter('brighten', '20%'),
  new Creatomate.ColorFilter('contrast', '50%'),
  new Creatomate.ColorFilter('invert', '100%'),
  new Creatomate.ColorFilter('grayscale', '100%'),
  new Creatomate.ColorFilter('sepia', '100%'),
];

const source = new Creatomate.Source({
  outputFormat: 'mp4',
  frameRate: 30,
  width: 1280,
  height: 720,
  elements: [

    // Create a video for each filter
    ...filters.map((filter, i) => (
      new Creatomate.Video({
        track: 1,
        time: i * 3,
        duration: 3,
        trimStart: i * 3,
        source: 'https://creatomate-static.s3.amazonaws.com/demo/video5.mp4',
        colorFilter: filter,
      })
    )),

    // Add text overlays to display the filter used
    ...filters.map((filter, i) => (
      new Creatomate.Text({
        track: 2,
        time: i * 3,
        duration: 3,
        x: '50%',
        y: '95%',
        yAnchor: '100%',
        xAlignment: '50%',
        text: filter?.type ?? 'original',
        fontSize: 25,
        fillColor: '#000',
        background: new Creatomate.TextBackground('#fff'),
      })
    )),

  ],
});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
