const Creatomate = require('creatomate');

const apiKey = process.argv[2];
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error('\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY');
  process.exit(1);
}

const client = new Creatomate.Client(apiKey);

const source = new Creatomate.Source({
  outputFormat: 'mp4',
  frameRate: 1,
  width: 1280,
  height: 720,
  fillColor: '#ffffff',
  elements: [

    new Creatomate.Text({
      track: 1,
      duration: 2,
      width: '80%',
      height: '80%',
      text: '1. This is an example text.',
      fontFamily: 'Montserrat',
      fontWeight: 800,
      yAlignment: '50%',
    }),

    new Creatomate.Text({
      track: 1,
      duration: 2,
      width: '80%',
      height: '80%',
      text: '2. This is an example text\nwithout line wrapping.',
      fontFamily: 'Montserrat',
      fontWeight: 800,
      yAlignment: '50%',
      textWrap: false,
    }),

    new Creatomate.Text({
      track: 1,
      duration: 2,
      width: '80%',
      height: '80%',
      text: '3. This is a centered example text.',
      fontFamily: 'Montserrat',
      fontWeight: 800,
      xAlignment: '50%',
      yAlignment: '50%',
    }),

    new Creatomate.Text({
      track: 1,
      duration: 3,
      width: '80%',
      height: '80%',
      text: '4. This is a very long text. You can see that the text auto-sizes to fit the available space.',
      fontFamily: 'Montserrat',
      fontWeight: 800,
      yAlignment: '50%',
    }),

    new Creatomate.Text({
      track: 1,
      duration: 3,
      width: '80%',
      height: '80%',
      text: '5. Font auto-sizing can be controlled by setting a [color gray]minimum[/color] and ' +
        '[color gray]maximum[/color]. As can be seen in this example, text has a very small minimum size by default ' +
        'and therefore shrinks as it gets longer. Maybe you don\'t want this, since it might become too small for ' +
        'your needs. This can be fixed by setting a minimum font size as shown in the next example.',
      fontFamily: 'Montserrat',
      fontWeight: 800,
      yAlignment: '50%',
    }),

    new Creatomate.Text({
      track: 1,
      duration: 3,
      width: '80%',
      height: '80%',
      text: '6. In this example, the minimum font size has been set. This results in this text being clipped with an ' +
        'ellipsis (...) because it overflows its available space and can\'t be shrunk to fit.',
      fontFamily: 'Montserrat',
      fontWeight: 800,
      fontSizeMinimum: '12 vmin',
      textClip: true,
      yAlignment: '50%',
    }),

    new Creatomate.Text({
      track: 1,
      duration: 3,
      text: '7. In the absence of width or height,\nthe text does not adhere to a bounding box.\n' +
        'A fixed font size is required.',
      fontFamily: 'Montserrat',
      fontWeight: 800,
      fontSize: '6 vmin',
    }),

    new Creatomate.Text({
      track: 1,
      duration: 3,
      width: '80%',
      text: '8. It\'s also possible to just set a width.',
      fontFamily: 'Montserrat',
      fontWeight: 800,
    }),

    new Creatomate.Text({
      track: 1,
      duration: 3,
      height: '30%',
      text: '9. Or height',
      fontFamily: 'Montserrat',
      fontWeight: 800,
    }),

    new Creatomate.Text({
      track: 1,
      duration: 3,
      width: '80%',
      height: '80%',
      text: '10. Here\'s an example of using a fixed width, height, and font size. When the text exceeds the ' +
        'available space, it is clipped.',
      fontFamily: 'Montserrat',
      fontWeight: 800,
      fontSize: '12 vmin',
      textClip: true,
      yAlignment: '50%',
    }),

    new Creatomate.Text({
      track: 1,
      duration: 3,
      width: '80%',
      height: '80%',
      text: '11. Even when using [size 150%][weight 700]different[/weight][/size] fonts, [family Roboto Slab]the ' +
        'text will [size 50%]automatically adjust to fit the available space 👌.[/size][/family]',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      yAlignment: '50%',
    }),

  ],
});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
