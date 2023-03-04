const {
  GetTranscriptionJobCommand,
  StartTranscriptionJobCommand,
  TranscribeClient,
} = require('@aws-sdk/client-transcribe');
const promiseRetry = require('promise-retry');

async function transcribe(jobName, mediaUri, bucketName, bucketKey) {

  const transcribeClient = new TranscribeClient({
    region: 'us-west-1',
  });

  await transcribeClient.send(
    new StartTranscriptionJobCommand({
      TranscriptionJobName: jobName,
      LanguageCode: 'en-US',
      MediaFormat: 'mp4',
      Media: { MediaFileUri: mediaUri },
      OutputBucketName: bucketName,
      OutputKey: bucketKey,
      Subtitles: {
        Formats: ['srt'],
      },
    }),
  );

  const command = new GetTranscriptionJobCommand({ TranscriptionJobName: jobName });

  return promiseRetry(async (retry) => {

    const response = await transcribeClient.send(command);

    if (response.TranscriptionJob?.TranscriptionJobStatus !== 'COMPLETED') {
      return retry(null);
    }

    return response.TranscriptionJob;

  }, { minTimeout: 2000, forever: true });
}

module.exports = transcribe;
