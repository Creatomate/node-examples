const Creatomate = require('creatomate');

const apiKey = process.argv[2];
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error('\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY');
  process.exit(1);
}

const client = new Creatomate.Client(apiKey);

const options = {

  // In order to create multiple renders in one API call, assign tags to any of your templates in your project,
  // then specify those tags here.
  // For more information, see https://creatomate.com/docs/api/rest-api/post-v1-renders
  tags: [
    'instagram-templates',
    'twitter-templates',
  ],

  // Modifications that you want to apply to all templates.
  // For more information, see https://creatomate.com/docs/api/rest-api/the-modifications-object
  modifications: {
    'Title': 'Insert your news headline or announcement here',
    'Text 1': 'Add a small snippet from your article here. This is just an example text to show how this template can be used.',
    'Text 2': 'Continuation of the story. You can enter an call to action here, for example.',
  },
};

console.log('Please wait while your video(s) are being rendered...');

client.render(options)
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
