const { GetObjectCommand, S3Client } = require('@aws-sdk/client-s3');

async function downloadS3File(awsRegion, bucketName, bucketKey) {

  const s3Client = new S3Client({ region: awsRegion });

  const data = await s3Client.send(new GetObjectCommand({ Bucket: bucketName, Key: bucketKey }));

  // Helper function to convert a ReadableStream to a string
  const streamToString = (stream) =>
    new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });

  return await streamToString(data.Body);
}

module.exports = downloadS3File;
