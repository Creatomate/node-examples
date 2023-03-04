const {
  GetTranscriptionJobCommand,
  StartTranscriptionJobCommand,
  TranscribeClient,
} = require('@aws-sdk/client-transcribe');
const promiseRetry = require('promise-retry');

async function transcribe(jobName, mediaUri, awsRegion, bucketName, bucketKey) {

  const transcribeClient = new TranscribeClient({ region: awsRegion });

  // Start to transcribe the audio from the media file
  // https://docs.aws.amazon.com/transcribe/latest/APIReference/API_StartTranscriptionJob.html
  await transcribeClient.send(
    new StartTranscriptionJobCommand({
      TranscriptionJobName: jobName,
      LanguageCode: 'en-US',
      MediaFormat: 'mp4',
      Media: { MediaFileUri: mediaUri },
      OutputBucketName: bucketName,
      OutputKey: bucketKey,
      // https://docs.aws.amazon.com/transcribe/latest/APIReference/API_Subtitles.html
      Subtitles: {
        Formats: ['srt'],
      },
    }),
  );

  // Gets the status of a current transcription job
  // https://docs.aws.amazon.com/transcribe/latest/APIReference/API_TranscriptionJob.html
  const command = new GetTranscriptionJobCommand({ TranscriptionJobName: jobName });

  // Poll the status of the job, and return the transcription job is complete
  return promiseRetry(async (retry) => {

    const response = await transcribeClient.send(command);

    if (response.TranscriptionJob?.TranscriptionJobStatus !== 'COMPLETED') {
      // Not completed – retry in 2 seconds
      return retry(null);
    }

    // Completed
    return response.TranscriptionJob;

  }, { minTimeout: 2000, forever: true });
}

module.exports = transcribe;
