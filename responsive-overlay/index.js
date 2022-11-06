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
  frameRate: 30,

  // Try different resolutions to see the responsive overlay in action.
  width: 720,
  height: 720,

  elements: [

    new Creatomate.Composition({
      track: 1,
      xPadding: '3 vmin',
      yPadding: '3 vmin',
      fillColor: 'rgba(230,126,34,1)',
      elements: [

        // Image 1
        new Creatomate.Image({
          track: 1,
          duration: 3,
          borderRadius: '2 vmin',
          clip: true,
          source: 'https://creatomate-static.s3.amazonaws.com/demo/city1.jpg',
          animations: [
            new Creatomate.Scale({
              easing: 'linear',
              scope: 'element',
              endScale: '130%',
              startScale: '100%',
              fade: false,
            }),
          ],
        }),

        // Image 2
        new Creatomate.Image({
          track: 1,
          duration: 3,
          borderRadius: '2 vmin',
          clip: true,
          source: 'https://creatomate-static.s3.amazonaws.com/demo/city2.jpg',
          animations: [
            new Creatomate.Scale({
              easing: 'linear',
              scope: 'element',
              startScale: '100%',
              endScale: '130%',
              fade: false,
            }),
          ],
        }),

        // Image 3
        new Creatomate.Image({
          track: 1,
          duration: 3,
          borderRadius: '2 vmin',
          clip: true,
          source: 'https://creatomate-static.s3.amazonaws.com/demo/city3.jpg',
          animations: [
            new Creatomate.Scale({
              easing: 'linear',
              scope: 'element',
              startScale: '100%',
              endScale: '130%',
              fade: false,
            }),
          ],
        }),

        // Text "Amsterdam"
        new Creatomate.Text({
          track: 2,
          y: '68.3864%',
          width: '71.94%',
          height: '16.9545%',
          xAlignment: '50%',
          yAlignment: '100%',
          text: 'Amsterdam',
          font: new Creatomate.Font('Cabin', 700),
          fillColor: '#ffffff',
          shadow: new Creatomate.Shadow('rgba(0,0,0,1)', 0, '0.5 vmin', '0.5 vmin'),
          enter: new Creatomate.TextSlide({
            time: 'start',
            duration: '1 s',
            easing: 'quadratic-out',
            type: 'text-slide',
            scope: 'split-clip',
            split: 'letter',
            distance: '200%',
            direction: 'up',
          }),
        }),

        // Text "from $90 per night"
        new Creatomate.Text({
          track: 3,
          time: 1.08,
          y: '87.0623%',
          width: '71.94%',
          height: '15.2653%',
          xAlignment: '50%',
          text: 'from [weight 700]$90[/weight] per night',
          textWrap: false,
          font: new Creatomate.Font('Cabin', 400),
          fillColor: '#ffffff',
          background: new Creatomate.TextBackground('rgba(230,126,34,1)', '50%', '17%', '28%'),
          enter: new Creatomate.TextReveal({
            time: 'start',
            duration: '1 s',
            easing: 'quadratic-out',
            axis: 'x',
            split: 'line',
            xAnchor: '0%',
          }),
        }),

      ],
    }),

    // Logo in upper left corner
    new Creatomate.Composition({
      track: 2,
      x: '0%',
      y: '0%',
      width: '53.5906 vmin',
      height: '16.8567 vmin',
      xAnchor: '0%',
      yAnchor: '0%',
      fillColor: 'rgba(230,126,34,1)',
      borderRadius: '2.3 vmin',
      elements: [
        new Creatomate.Image({
          width: '81.6363%',
          height: '61.5928%',
          source: 'https://creatomate-static.s3.amazonaws.com/demo/logoipsum.png',
          fit: 'contain',
          shadow: new Creatomate.Shadow('rgba(0,0,0,1)', 0, '0.5 vmin', '0.5 vmin'),
        }),
      ],
    }),

  ],
});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
