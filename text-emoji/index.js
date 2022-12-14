const Creatomate = require('creatomate');

const apiKey = process.argv[2];
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error('\n\nโ ๏ธ  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY');
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
      text: 'All Facebook, Google, Twitter and Apple emoji are supported. ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐คฃ  โบ๏ธ ๐ ๐ ๐ ' +
        '๐ ๐ ๐ ๐ ๐ฅฐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐คช ๐คจ ๐ง ๐ค ๐  ๐คฉ ๐ฅณ ๐ ๐ ๐ ๐ ๐ ๐ ๐ โน๏ธ ๐ฃ ๐ ๐ซ ๐ฉ ' +
        '๐ฅบ ๐ข ๐ญ ๐ฎโ๐จ ๐ค ๐  ๐ก ๐คฌ ๐คฏ ๐ณ ๐ฅต ๐ฅถ ๐ฑ ๐จ ๐ฐ ๐ฅ ๐  ๐ค  ๐ค  ๐คญ ๐คซ ๐คฅ ๐ถ ๐ถโ๐ซ๏ธ ๐ ๐ ๐ฌ  ๐ ๐ฏ ๐ฆ ' +
        '๐ง ๐ฎ ๐ฒ ๐ฅฑ ๐ด ๐คค ๐ช ๐ต ๐ตโ๐ซ  ๐ค ๐ฅด ๐คข ๐คฎ ๐คง ๐ท ๐ค ๐ค ๐ค ๐ค  ๐ ๐ฟ ๐น ๐บ ๐คก ๐ฉ ๐ป ๐ โ ๏ธ ๐ฝ ๐พ ๐ค ' +
        '๐ ๐บ ๐ธ ๐น ๐ป ๐ผ ๐ฝ ๐ ๐ฟ ๐พ (...and 10.000 more)',
    }),

  ],
});

console.log('Please wait while your image is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
