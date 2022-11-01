const Creatomate = require('creatomate');

const apiKey = process.argv[2];
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error('\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY');
  process.exit(1);
}

const client = new Creatomate.Client(apiKey);

const options = {

  // Add the attached template (template.json in this directory) to your account and specify its ID here.
  // You can do this by creating a new blank template in the template editor, then pressing F12 to open the source editor and pasting the JSON document inside.
  // For more information, see https://creatomate.com/docs/template-editor/source-editor
  templateId: '2e8bccbf-e40a-41d5-a815-f58518ed9835',

  // Modifications that you want to apply to the template.
  // For more information, see https://creatomate.com/docs/api/rest-api/the-modifications-object
  modifications: {
    'Title': 'Insert your news headline or announcement here',
    'Text 1': 'Add a small snippet from your article here. This is just an example text to show how this template can be used.',
    'Text 2': 'Continuation of the story. You can enter an call to action here, for example.',
  },
};

console.log('Please wait while your video is being rendered...');

client.render(options)
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
