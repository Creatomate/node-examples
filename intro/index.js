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

  // By default, the output frame rate is adjusted to the input material. That means if your input video is 30 fps,
  // your output will be 30 fps too. In this case, we're going to enforce 60 fps for a more smooth transition animation
  frameRate: 60,

  elements: [

    // Intro
    new Creatomate.Composition({
      track: 1,
      duration: 2.5,
      elements: [

        new Creatomate.Text({
          width: '90%',
          height: '10%',
          text: 'Your intro here',
          fontFamily: 'Cabin',
          fontWeight: '700',
          xAlignment: '50%',
          yAlignment: '50%',
          fillColor: '#fff',
        }),

        // Place any other element here
      ],
    }),

    // Main video
    new Creatomate.Video({

      // Having the video on the same track as the intro composition makes it play after it
      track: 1,

      source: 'https://creatomate-static.s3.amazonaws.com/demo/video1.mp4',

      // Transition between the previous element (the intro composition) and this one
      transition: new Creatomate.CircularWipe({
        duration: 0.5,
      }),
    }),

  ],

});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
