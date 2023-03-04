const downloadS3File = require('./downloadS3File');

async function fetchTranscript(awsRegion, bucketName, bucketKey) {

  const words = [];

  // Download the AWS transcript result from S3
  const transcript = JSON.parse(await downloadS3File(awsRegion, bucketName, bucketKey));

  // Iterate through each transcription item, which can be a word, phrase, or punctuation mark
  // https://docs.aws.amazon.com/transcribe/latest/APIReference/API_streaming_Item.html
  for (const item of transcript.results.items) {

    // The word or punctuation that was transcribed
    const content = item.alternatives[0].content;

    if (item.type === 'punctuation') {

      // Append punctuations to the last word
      const lastWord = words[words.length - 1];
      if (lastWord) {
        lastWord.content += content;
      }

    } else {

      // Add the spoken word to the transcript, parsing the start and end time
      words.push({
        startTime: parseFloat(item.start_time),
        endTime: parseFloat(item.end_time),
        content,
      });
    }
  }

  return words;
}

module.exports = fetchTranscript;
