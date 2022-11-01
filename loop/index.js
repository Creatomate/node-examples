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
  duration: 8,

  elements: [

    new Creatomate.Composition({

      // This example demonstrates how to loop a composition. To loop video or audio clips, use the 'loop' property of
      // the video or audio element instead.

      // By setting the duration of this composition to 2 seconds and setting 'loop' to true, the composition and its
      // content is looped for the total length (8 seconds)
      duration: 2,
      loop: true,

      // If you want to limit the number of loops, uncomment the following line:
      // plays: 2,

      elements: [

        new Creatomate.Rectangle({

          width: '24%',
          height: '42%',

          // Animate x position in 2 seconds
          x: [
            new Creatomate.Keyframe('20%', 0),
            new Creatomate.Keyframe('80%', 1),
            new Creatomate.Keyframe('20%', 2),
          ],

          // Animate from blue -> gray -> red -> gray -> blue in 2 seconds
          fillColor: [
            new Creatomate.Keyframe('#0079ff', 0),
            new Creatomate.Keyframe('#333333', 0.5),
            new Creatomate.Keyframe('#ff5454', 1),
            new Creatomate.Keyframe('#333333', 1.5),
            new Creatomate.Keyframe('#0079ff', 2),
          ],

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
