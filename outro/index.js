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

    // Main video
    new Creatomate.Video({
      track: 1,
      source: 'https://creatomate-static.s3.amazonaws.com/demo/video1.mp4',
    }),

    // Outro
    new Creatomate.Composition({

      // Having the outro composition on the same track as the video makes it play after it
      track: 1,

      duration: 2.5,
      elements: [
        new Creatomate.Text({
          width: '90%',
          height: '10%',
          fill_color: '#fff',
          text: 'Your outro here',
          fontFamily: 'Cabin',
          fontWeight: '700',
          xAlignment: '50%',
          yAlignment: '50%',
        }),

        // Place any other element here
      ],

      // Transition between the previous element (the video) and this one
      transition: new Creatomate.CircularWipeAnimation({
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
