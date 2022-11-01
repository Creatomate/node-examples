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
  width: 1920,
  height: 1080,
  fillColor: '#ffffff',
  elements: [

    new Creatomate.Text({
      text: 'Inline styles can be applied to text with style tags. It\'s possible to set the ' +
        '[family Architects Daughter]font family[/family], [weight 800]weight[/weight], [style italic]style[/style], ' +
        '[size 50%]size[/size], and [color #3498db]color[/color].',
      y: '18.8478%',
      width: '67.2833%',
      height: '24.6106%',
      fontFamily: 'Aileron',
      fontWeight: 600,
      xAlignment: '50%',
      yAlignment: '50%',
    }),

    new Creatomate.Text({
      text: 'Text outline',
      x: '17.1225%',
      y: '41.5765%',
      fillColor: null,
      stroke: new Creatomate.Stroke('#333333', '0.4 vmin'),
      fontWeight: '800',
      fontSize: '8.16 vmin',
    }),

    new Creatomate.Text({
      text: 'Text shadow',
      x: '48.2061%',
      y: '41.5765%',
      shadow: new Creatomate.Shadow('rgba(0,0,0,0.37)', '3 vmin', '0 vmin', '3.3 vmin'),
      fontWeight: '800',
      fontSize: '8.16 vmin',
    }),

    new Creatomate.Text({
      text: 'Text gradient',
      x: '81.154%',
      y: '41.5765%',
      fill: Creatomate.Fill.horizontal(['#27e1ad', '#0004ff']),
      fontWeight: '800',
      fontSize: '8.16 vmin',
    }),

    new Creatomate.Text({
      text: 'This text is converted to uppercase.',
      y: '56.2158%',
      fontSize: '5.759 vmin',
      textTransform: 'uppercase',
    }),

    new Creatomate.Text({
      text: 'This text has a larger spacing between letters.',
      y: '67.9249%',
      fontSize: '5.759 vmin',
      letterSpacing: '190%',
    }),

    new Creatomate.Text({
      text: 'This text has a\nlarger line spacing.',
      x: '28.4155%',
      y: '84.7227%',
      width: '34.0633%',
      height: '17.4695%',
      xAlignment: '50%',
      lineHeight: '172%',
    }),

    new Creatomate.Text({
      text: 'This text has a background color.',
      x: '71.5845%',
      y: '84.7227%',
      width: '34.0633%',
      height: '17.4695%',
      xAlignment: '50%',
      fillColor: '#ffffff',
      background: new Creatomate.TextBackground('#000000', '43%', '25%', '23%', '0%'),
    }),

  ],
});

console.log('Please wait while your image is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
