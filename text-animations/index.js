const Creatomate = require('creatomate');

const apiKey = process.argv[2];
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error('\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY');
  process.exit(1);
}

const client = new Creatomate.Client(apiKey);

// The SDK comes with these preset text animations.
// Each animation is highly configurable, you can use the template editor to test out variations.
// https://creatomate.com/docs/template-editor/animations
const textAnimations = [

  // Text Slide and variants
  new Creatomate.TextSlideAnimation(),
  // new Creatomate.SlideDownLetterByLetterAnimation(),
  // new Creatomate.SlideDownLetterByLetterClippedAnimation(),
  // new Creatomate.SlideDownLineByLineAnimation(),
  // new Creatomate.SlideDownLineByLineClippedAnimation(),
  // new Creatomate.SlideDownWordByWordAnimation(),
  // new Creatomate.SlideDownWordByWordClippedAnimation(),
  // new Creatomate.SlideLeftLetterByLetterAnimation(),
  // new Creatomate.SlideLeftLetterByLetterClippedAnimation(),
  // new Creatomate.SlideLeftLineByLineAnimation(),
  // new Creatomate.SlideLeftLineByLineClippedAnimation(),
  // new Creatomate.SlideLeftWordByWordAnimation(),
  // new Creatomate.SlideLeftWordByWordClippedAnimation(),
  // new Creatomate.SlideRightLetterByLetterClippedAnimation(),
  // new Creatomate.SlideRightLineByLineAnimation(),
  // new Creatomate.SlideRightLineByLineClippedAnimation(),
  // new Creatomate.SlideRightWordByWordAnimation(),
  // new Creatomate.SlideRightWordByWordClippedAnimation(),
  // new Creatomate.SlideUpLetterByLetterAnimation(),
  // new Creatomate.SlideUpLetterByLetterClippedAnimation(),
  // new Creatomate.SlideUpLineByLineAnimation(),
  // new Creatomate.SlideUpLineByLineClippedAnimation(),
  // new Creatomate.SlideUpWordByWordAnimation(),
  // new Creatomate.SlideUpWordByWordClippedAnimation(),

  // Text Scale and variants
  new Creatomate.TextScaleAnimation(),
  // new Creatomate.TextScaleCenterAnimation(),
  // new Creatomate.TextScaleCenterHorizontalAnimation(),
  // new Creatomate.TextScaleCenterVerticalAnimation(),
  // new Creatomate.TextScaleDownAnimation(),
  // new Creatomate.TextScaleLeftAnimation(),
  // new Creatomate.TextScaleRightAnimation(),
  // new Creatomate.TextScaleUpAnimation(),

  // Text Appear and variants
  new Creatomate.TextAppearAnimation(),
  // new Creatomate.AppearLetterByLetterAnimation(),
  // new Creatomate.AppearLetterByLetterHighlightingAnimation(),
  // new Creatomate.AppearLetterByLetterRandomlyAnimation(),
  // new Creatomate.AppearLineByLineAnimation(),
  // new Creatomate.AppearLineByLineHighlightingAnimation(),
  // new Creatomate.AppearLineByLineRandomlyAnimation(),
  // new Creatomate.AppearWordByWordAnimation(),
  // new Creatomate.AppearWordByWordHighlightingAnimation(),
  // new Creatomate.AppearWordByWordRandomlyAnimation(),

  // Text Reveal and variants
  new Creatomate.TextRevealAnimation(),
  // new Creatomate.TextRevealCenterAnimation(),
  // new Creatomate.TextRevealCenterHorizontalAnimation(),
  // new Creatomate.TextRevealCenterVerticalAnimation(),
  // new Creatomate.TextRevealDownAnimation(),
  // new Creatomate.TextRevealLeftAnimation(),
  // new Creatomate.TextRevealRightAnimation(),
  // new Creatomate.TextRevealUpAnimation(),

  // Text Spin and variants
  new Creatomate.TextSpinAnimation(),
  // new Creatomate.RollLettersAnimation(),
  // new Creatomate.RollLettersChaoticAnimation(),
  // new Creatomate.RollLettersChaoticRandomAnimation(),
  // new Creatomate.RollLettersDownAnimation(),
  // new Creatomate.RollLettersLeftAnimation(),
  // new Creatomate.RollLettersRightAnimation(),
  // new Creatomate.RollLettersUpAnimation(),

  // Text Fly and variants
  new Creatomate.TextFlyAnimation(),
  // new Creatomate.FlyingInLetterByLetterAnimation(),
  // new Creatomate.FlyingInLineByLineAnimation(),
  // new Creatomate.FlyingInWordByWordAnimation(),

  // Text Wave and variants
  new Creatomate.TextWaveAnimation(),
  // new Creatomate.WavingInLetterByLetterAlternativeAnimation(),
  // new Creatomate.WavingInLetterByLetterAnimation(),
  // new Creatomate.WavingInLetterByLetterRandomlyAnimation(),
  // new Creatomate.WavingInLineByLineAnimation(),
  // new Creatomate.WavingInLongWavelengthAnimation(),
  // new Creatomate.WavingInWordByWordAnimation(),

  // Text Typewriter and variants
  new Creatomate.TextTypewriterAnimation(),
  // new Creatomate.TextTypewritingFixedDurationAnimation(),
];

const source = new Creatomate.Source({
  outputFormat: 'mp4',
  frameRate: 60,
  width: 1280,
  height: 720,
  fillColor: '#ffffff',
  elements: [

    ...(textAnimations.map((animation) => (
      new Creatomate.Text({
        track: 1,
        duration: 2.5,
        width: '90%',
        height: '90%',
        yAlignment: '50%',
        text: animation.constructor.name
          .replace(/([a-z0-9])([A-Z])/g, '$1 $2'),
        enter: animation,
        exit: animation,
      })
    ))),

  ],
});

console.log('Please wait while your video is being rendered...');

client.render({ source })
  .then((renders) => {
    console.log('Completed:', renders);
  })
  .catch((error) => console.error(error));
