const Creatomate = require('creatomate');
const { textToSpeech } = require('./textToSpeech');

const apiKey = process.argv[2];
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error('\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY');
  process.exit(1);
}

const client = new Creatomate.Client(apiKey);

async function run() {

  const slides = [
    'Thank you for trying this demo that shows how to convert text to speech.',
    'This is just an example. You can find the code for generating a video like this in the example repository.',
  ];

  console.log('Converting text to speech using AWS Polly...');

  // Convert each text to speech
  const spokenTexts = await Promise.all(slides.map((text, i) => textToSpeech(text, i)));

  console.log('Creating video with Creatomate...');

  // Create the video
  const source = new Creatomate.Source({
    outputFormat: 'mp4',
    width: 1280,
    height: 720,

    elements: [

      ...spokenTexts.map(({ text, uploadLocation, textMarks }) => (

        new Creatomate.Composition({

          // Play all compositions sequentially by putting them on the same track
          track: 1,

          elements: [

            // Attach the speech audio clip
            new Creatomate.Audio({
              source: uploadLocation,
            }),

            new Creatomate.Text({
              width: '90%',
              height: '90%',
              fillColor: 'rgba(255,255,255,0.1)',
              fontWeight: 800,
              yAlignment: '50%',

              // Create keyframes for each spoken word
              text: textMarks.map((mark) => {

                // The spoken part
                const spoken = text.substring(0, mark.start);

                // The word being spoken right now
                const word = text.substring(mark.start, mark.end);

                // What hasn't been said yet
                const notSpoken = text.substring(mark.end);

                // Create styled text
                const highlightedText = `[color rgba(255,255,255,0.6)]${spoken}[/color]`
                  + `[color #fff]${word}[/color]`
                  + notSpoken;

                return new Creatomate.Keyframe(highlightedText, mark.time / 1000);
              }),
            }),

          ],
        })
      )),

      // Progress bar
      new Creatomate.Rectangle({
        x: '0%',
        y: '0%',
        width: '100%',
        height: '3%',
        xAnchor: '0%',
        yAnchor: '0%',
        fillColor: 'rgba(255,255,255,0.8)',
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

  // Render the video
  const renders = await client.render({ source });

  console.log('Completed:', renders);
}

run()
  .catch(error => console.error(error));
