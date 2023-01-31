const AWS = require('aws-sdk');

const polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-2',
});

const s3 = new AWS.S3();

async function textToSpeech(text, i) {

  // Text to speech
  const speech = await polly.synthesizeSpeech({
    OutputFormat: 'mp3',
    Text: text,
    VoiceId: 'Matthew',
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
    // TODO: Insert your S3 bucket here
    Bucket: 'Your S3 bucket',
    Key: `speech/part${i}.mp3`,
    ContentType: 'audio/mpeg',
    ACL: 'public-read',
  }).promise();

  // Parse speech marks
  const marks = speechMarks.AudioStream
    .toString('utf8')
    .split('\n')
    .filter(mark => mark.length > 0)
    .map(mark => JSON.parse(mark));

  return { text, uploadLocation: upload.Location, textMarks: marks };
}

module.exports = { textToSpeech };
