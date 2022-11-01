const Creatomate = require('creatomate');

const apiKey = process.argv[2];
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error('\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY');
  process.exit(1);
}

const client = new Creatomate.Client(apiKey);

const source = new Creatomate.Source({

  outputFormat: 'jpg',

  elements: [

    new Creatomate.Image({
      source: 'https://creatomate-static.s3.amazonaws.com/demo/mockup.jpg',
    }),

    // Perspective warp (paper box)
    new Creatomate.Composition({

      x: '68.1869%',
      y: '28.7133%',
      width: '42.269%',
      height: '33.7887%',

      // Four corners (top left, top right, bottom left, bottom right)
      // Tip: Create these warp points with the template editor
      // https://creatomate.com/docs/template-editor/introduction
      warp: Creatomate.Warp.perspective(
        { x: '37.9232%', y: '11.5088%' },
        { x: '109.7814%', y: '62.9714%' },
        { x: '-1.5488%', y: '40.2822%' },
        { x: '68.4135%', y: '100.3913%' },
      ),

      // Blend the composition with the paper box
      opacity: '75%',
      blendMode: 'multiply',

      elements: [
        new Creatomate.Image({
          width: '71.8034%',
          height: '35.2843%',
          source: 'https://creatomate-static.s3.amazonaws.com/demo/logoipsum-dark.png',
          fit: 'contain',
        }),
      ],
    }),

    // Bezier warp (paper cup)
    new Creatomate.Composition({

      x: '28.4133%',
      y: '67.92%',
      width: '22.5898%',
      height: '41.5963%',

      // Blend the composition with the paper cup
      opacity: '75%',
      blendMode: 'multiply',

      // Tip: Create these warp points with the template editor
      // https://creatomate.com/docs/template-editor/introduction
      warp: new Creatomate.Warp([
        [
          { x: '-6.3758%', y: '-0.392%' },
          { x: '26.0196%', y: '16.7813%' },
          { x: '82.7921%', y: '6.5613%' },
          { x: '98.2782%', y: '-7.109%' },
        ],
        [
          { x: '1.2582%', y: '29.4872%' },
          { x: '29.4485%', y: '46.2501%' },
          { x: '81.9568%', y: '37.4197%' },
          { x: '95.8577%', y: '25.2226%' },
        ],
        [
          { x: '8.3391%', y: '58.5118%' },
          { x: '32.1827%', y: '76.329%' },
          { x: '81.1366%', y: '67.8714%' },
          { x: '93.1608%', y: '55.9079%' },
        ],
        [
          { x: '15.498%', y: '88.5088%' },
          { x: '34.2293%', y: '107.0924%' },
          { x: '80.4088%', y: '98.5387%' },
          { x: '91.087%', y: '82.7897%' },
        ],
      ]),

      elements: [
        new Creatomate.Image({
          source: 'https://creatomate-static.s3.amazonaws.com/demo/image1.jpg',
        }),
        new Creatomate.Image({
          x: '50%',
          y: '31.6376%',
          width: '84.6296%',
          height: '20.3905%',
          source: 'https://creatomate-static.s3.amazonaws.com/demo/logoipsum.png',
          fit: 'contain',
        }),
      ],
    }),

  ],

});

console.log('Please wait while your image is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
