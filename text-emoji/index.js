const Creatomate = require('creatomate');

const apiKey = process.argv[2];
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error('\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY');
  process.exit(1);
}

const client = new Creatomate.Client(apiKey);

const source = new Creatomate.Source({
  outputFormat: 'png',
  emojiStyle: 'apple', // Choose between 'facebook', 'google', 'twitter', or 'apple'
  width: 1920,
  height: 1080,
  fillColor: '#ffffff',
  elements: [

    new Creatomate.Text({
      track: 1,
      duration: 2,
      width: '90%',
      height: '90%',
      yAlignment: '50%',
      text: 'All Facebook, Google, Twitter and Apple emoji are supported. 😀 😃 😄 😁 😆 😅 😂 🤣  ☺️ 😊 😇 🙂 ' +
        '🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎  🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 ' +
        '🥺 😢 😭 😮‍💨 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓  🤗  🤔  🤭 🤫 🤥 😶 😶‍🌫️ 😐 😑 😬  🙄 😯 😦 ' +
        '😧 😮 😲 🥱 😴 🤤 😪 😵 😵‍💫  🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠️ 👽 👾 🤖 ' +
        '🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 (...and 10.000 more)',
    }),

  ],
});

console.log('Please wait while your image is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
