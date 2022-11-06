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

    new Creatomate.Composition({

      // Simulate camera shake
      animations: [
        // Random horizontal shake
        new Creatomate.Shake({
          distance: '0.5%',
          frequency: '1.5 Hz',
          randomness: '100%',
          rampDuration: '0%',
        }),
        // Random vertical shake
        new Creatomate.Shake({
          direction: '90°',
          distance: '0.5%',
          frequency: '1.5 Hz',
          randomness: '100%',
          rampDuration: '0%',
        }),
        // Random rotational wiggle
        new Creatomate.Wiggle({
          frequency: '1 Hz',
          randomness: '100%',
          zRotation: '0.2°',
          rampDuration: '0%',
        }),
      ],

      // Scale up to account for camera shake
      xScale: '105%',
      yScale: '105%',

      elements: [

        // Times square photo
        new Creatomate.Image({
          source: 'https://creatomate-static.s3.amazonaws.com/demo/times-square.jpg',
        }),

        // Composition that is projected on a billboard
        new Creatomate.Composition({
          x: '53.6583%',
          y: '52.4322%',
          width: '16.4755%',
          height: '20.2832%',
          aspectRatio: 0.6498,
          fillColor: '#4b7be5',

          // Four corners (top left, top right, bottom left, bottom right)
          // Tip: Create these warp points with the template editor
          // https://creatomate.com/docs/template-editor/introduction
          warp: Creatomate.Warp.perspective(
            { x: '3.0703%', y: '0.2217%' },
            { x: '95.0703%', y: '2.5683%' },
            { x: '-2.2956%', y: '98.61%' },
            { x: '101.3554%', y: '100.5701%' },
          ),

          elements: [

            // Video projected on billboard. The total video stretches to the length of this video.
            new Creatomate.Video({
              track: 1,
              source: 'https://creatomate-static.s3.amazonaws.com/demo/vertical.mp4',
            }),

            // Outro that is played after the video
            new Creatomate.Composition({
              track: 1,

              transition: new Creatomate.CircularWipe({
                duration: 1,
              }),

              elements: [

                new Creatomate.Text({
                  width: '66.2379%',
                  height: '22.3534%',
                  xAlignment: '50%',
                  yAlignment: '50%',
                  fillColor: '#fff',
                  text: 'Edit This Outro',
                  fontWeight: '800',
                  lineHeight: '94%',
                }),

                new Creatomate.Rectangle({
                  width: '82.7212%',
                  height: '38.8825%',
                  strokeColor: '#fff',
                  strokeWidth: '0.5 vmin',
                }),
              ],
            }),
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
