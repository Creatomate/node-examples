const Creatomate = require('creatomate');
const transcribe = require('./transcribe');
const generateSubtitles = require('./generateSubtitles');

const apiKey = process.argv[2];
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error('\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY');
  process.exit(1);
}

const client = new Creatomate.Client(apiKey);

// Note: Provide these AWS settings
const awsRegion = 'us-west-1';
const bucketName = 'insert-your-bucket-name';
const bucketKey = `my-folder/subtitle-${new Date().getTime()}`;
const transcribeJobName = `example-${new Date().getTime()}`;

// Note: Provide a URL to a video file
const mediaUri = 'https://creatomate-static.s3.amazonaws.com/demo/tkp-720p-square.mp4';

async function run() {

  console.log('Transcribing video using AWS Transcribe...');

  // Invoke AWS Transcribe to automatically generate the subtitles from the video
  await transcribe(transcribeJobName, mediaUri, awsRegion, bucketName, bucketKey);

  // Create subtitle keyframes
  const subtitleKeyframes = await generateSubtitles(awsRegion, bucketName, bucketKey);

  console.log('Creating video with Creatomate...');

  // Create the video. Note that we don't provide an output width and height,
  // as the Creatomate API detects these automatically based on the first found video element
  const source = new Creatomate.Source({
    outputFormat: 'mp4',

    elements: [

      // The video file. Since we do not specify a duration, the length of the video element
      // is determined by the video file provided
      new Creatomate.Video({
        source: mediaUri,
      }),

      // The subtitles
      new Creatomate.Text({

        // Make the subtitle container as large as the screen with some padding
        width: '100%',
        height: '100%',
        xPadding: '3 vmin',
        yPadding: '8 vmin',

        // Align text to bottom center
        xAlignment: '50%',
        yAlignment: '100%',

        // Text style – note that the default fill color is null (transparent)
        fontWeight: '800',
        fontSize: '8.48 vh',
        fillColor: null,
        shadowColor: 'rgba(0,0,0,0.65)',
        shadowBlur: '1.6 vmin',

        text: subtitleKeyframes,
      }),

      // Progress bar
      new Creatomate.Rectangle({
        x: '0%',
        y: '0%',
        width: '100%',
        height: '3%',
        xAnchor: '0%',
        yAnchor: '0%',
        fillColor: '#fff',
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
