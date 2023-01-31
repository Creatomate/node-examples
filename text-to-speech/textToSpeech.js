const { Polly, S3 } = require('aws-sdk');
const uuid = require('uuid');

const polly = new Polly({ region: 'us-west-1' });
const s3 = new S3();

async function textToSpeech(text) {

  // Text to speech
  const speech = await polly.synthesizeSpeech({
    OutputFormat: 'mp3',
    Text: text,
    VoiceId: 'Joanna',
  }).promise();

  // Get the marks at which words are spoken
  const speechMarks = await polly.synthesizeSpeech({
    OutputFormat: 'json',
    Text: text,
    VoiceId: 'Matthew',
    SpeechMarkTypes: ['word'],
  }).promise();

  // Upload the audio file to S3 and make it publicly accessible
  const upload = await s3.upload({
    Body: speech.AudioStream,
    Bucket: 'text-to-speech-s3', // TODO: Insert your S3 bucket here
    Key: `${uuid.v4()}.mp3`,
    ContentType: 'audio/mpeg',
    ACL: 'public-read',
  }).promise();

  // Parse speech marks
  const marks = speechMarks.AudioStream
    .toString('utf8')
    .split('\n')
    .filter(mark => mark.length > 0)
    .map(mark => JSON.parse(mark));

  return { uploadLocation: upload.Location, speechMarks: marks };
}

module.exports = { textToSpeech };
