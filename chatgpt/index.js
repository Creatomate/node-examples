const Creatomate = require('creatomate');
const fetch = require('node-fetch');

// API keys passed to this script
const creatomateApiKey = process.argv[2];
const openAiApiKey = process.argv[3];

// A topic on which you would like to generate a video. This will be passed on to ChatGPT.
// It will also be used as the intro text for the final video.
const topic = '5 fascinating facts about the Golden Eagle';

// TODO: The ID of the template in your Creatomate account
const templateId = 'Insert your template ID here';

if (!creatomateApiKey || !openAiApiKey) {
  console.error('\n\n⚠️  To run this example, please specify your API keys as follows: node index.js CREATOMATE_API_KEY OPENAI_API_KEY');
  process.exit(1);
}

async function run() {

  console.log('Requesting a list of results from ChatGPT...');

  // Call OpenAI's API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openAiApiKey}`,
    },
    body: JSON.stringify({
      // The model currently used by ChatGPT
      'model': 'gpt-3.5-turbo',
      //  Ask ChatGPT to tell us something about the provided topic,
      //  using additional instructions to get a useful response
      'messages': [{
        'role': 'user',
        'content': `${topic}. Make a numbered list of 5 short sentences with multiple emojis. `
          + `Surround the most important words with [color #f1c40f] and [/color].`
      }],
    }),
  });

  // Catch any unsuccessful HTTP responses
  if (!response.ok) {
    console.error(`Error: OpenAI returned status code ${response.status}. `
      + `Make sure that you've provided a valid OpenAI API key`);
    process.exit(1);
  }

  // Parse ChatGPT's JSON response as a JavaScript object
  const data = await response.json();

  // Check if ChatGPT's response is as expected before continuing
  const reply = Array.isArray(data.choices) && data.choices[0].message?.content;
  if (typeof reply !== 'string') {
    console.error('Error: Received an unexpected response from OpenAI');
    process.exit(1);
  }

  // We'll parse the response and insert it into this variable
  const facts = {};

  // Iterate through ChatGPT's response line by line
  for (const textLine of reply.split(/\r?\n/)) {

    // Match list item by a regular expression (each list item starts with a digit)
    const matchResult = textLine.match(/^\d+?/);
    if (matchResult) {
      facts[`Fact-${matchResult[0]}`] = textLine;
    }
  }

  // Check if the response contains values for each text placeholder
  if (!facts['Fact-1'] || !facts['Fact-2'] || !facts['Fact-3'] || !facts['Fact-4'] || !facts['Fact-5']) {
    console.error('Error: Expected OpenAI to return a list of 5 sentences');
    process.exit(1);
  }

  console.log('Please wait while your video is being rendered...');

  const client = new Creatomate.Client(creatomateApiKey);

  // Render a video based on a template in your Creatomate project
  const renders = await client.render({
    // The ID of the template that we want to render
    templateId,
    // These are the modifications that are inserted into the template
    modifications: {
      'Intro-Text': topic,
      ...facts,
    },
  });

  console.log('Completed:', renders);
}

run()
  .catch(error => console.error(error));
