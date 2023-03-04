const Creatomate = require('creatomate');
const srtparsejs = require('srtparsejs');
const transcribe = require('./transcribe');
const downloadS3File = require('./downloadS3File');
const timestampToSeconds = require('./timestampToSeconds');

const apiKey = process.argv[2];
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error('\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY');
  process.exit(1);
}

const client = new Creatomate.Client(apiKey);

// TODO: Insert your S3 bucket settings here
const transcribeJobName = `example-${new Date().getTime()}`;
const mediaUri = 'https://creatomate-static.s3.amazonaws.com/demo/the-knowledge-project.mp4';
const bucketName = 'Your S3 bucket';
const bucketKey = 'demo/subtitles';

async function run() {

  console.log('Transcribing video using AWS Transcribe...');

  const transcriptionJob = await transcribe(transcribeJobName, mediaUri, bucketName, bucketKey);

  const subtitles = await downloadS3File(bucketName, bucketKey + '.srt');

  // Create subtitle keyframes
  const keyframes = srtparsejs.parse(subtitles)
    .flatMap((sentence) => {

      const startTime = timestampToSeconds(sentence.startTime);
      const endTime = timestampToSeconds(sentence.endTime);

      return [
        new Creatomate.Keyframe(sentence.text, startTime),
        new Creatomate.Keyframe('', endTime),
      ];
    });

  console.log('Creating video with Creatomate...');

  // Create the video
  const source = new Creatomate.Source({
    outputFormat: 'mp4',

    elements: [

      new Creatomate.Video({
        source: mediaUri,
      }),

      new Creatomate.Text({

        // Make the subtitle container as large as the screen with some padding
        width: '100%',
        height: '100%',
        xPadding: '3 vmin',
        yPadding: '8 vmin',

        // Align text to bottom center
        xAlignment: '50%',
        yAlignment: '100%',

        // Text style
        fontWeight: '800',
        fontSize: '8.48 vh',
        fillColor: '#ffffff',
        shadowColor: 'rgba(0,0,0,0.65)',
        shadowBlur: '1.6 vmin',

        text: keyframes,
      }),

    ],
  });

  // Render the video
  const renders = await client.render({ source });
  console.log('Completed:', renders);
}

run()
  .catch(error => console.error(error));
