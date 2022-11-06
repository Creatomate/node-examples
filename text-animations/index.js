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
  new Creatomate.TextSlide(),
  // new Creatomate.TextSlideDownLetterByLetter(),
  // new Creatomate.TextSlideDownLetterByLetterClipped(),
  // new Creatomate.TextSlideDownLineByLine(),
  // new Creatomate.TextSlideDownLineByLineClipped(),
  // new Creatomate.TextSlideDownWordByWord(),
  // new Creatomate.TextSlideDownWordByWordClipped(),
  // new Creatomate.TextSlideLeftLetterByLetter(),
  // new Creatomate.TextSlideLeftLetterByLetterClipped(),
  // new Creatomate.TextSlideLeftLineByLine(),
  // new Creatomate.TextSlideLeftLineByLineClipped(),
  // new Creatomate.TextSlideLeftWordByWord(),
  // new Creatomate.TextSlideLeftWordByWordClipped(),
  // new Creatomate.TextSlideRightLetterByLetterClipped(),
  // new Creatomate.TextSlideRightLineByLine(),
  // new Creatomate.TextSlideRightLineByLineClipped(),
  // new Creatomate.TextSlideRightWordByWord(),
  // new Creatomate.TextSlideRightWordByWordClipped(),
  // new Creatomate.TextSlideUpLetterByLetter(),
  // new Creatomate.TextSlideUpLetterByLetterClipped(),
  // new Creatomate.TextSlideUpLineByLine(),
  // new Creatomate.TextSlideUpLineByLineClipped(),
  // new Creatomate.TextSlideUpWordByWord(),
  // new Creatomate.TextSlideUpWordByWordClipped(),

  // Text Scale and variants
  new Creatomate.TextScale(),
  // new Creatomate.TextScaleCenter(),
  // new Creatomate.TextScaleCenterHorizontal(),
  // new Creatomate.TextScaleCenterVertical(),
  // new Creatomate.TextScaleDown(),
  // new Creatomate.TextScaleLeft(),
  // new Creatomate.TextScaleRight(),
  // new Creatomate.TextScaleUp(),

  // Text Appear and variants
  new Creatomate.TextAppear(),
  // new Creatomate.TextAppearLetterByLetter(),
  // new Creatomate.TextAppearLetterByLetterHighlighting(),
  // new Creatomate.TextAppearLetterByLetterRandomly(),
  // new Creatomate.TextAppearLineByLine(),
  // new Creatomate.TextAppearLineByLineHighlighting(),
  // new Creatomate.TextAppearLineByLineRandomly(),
  // new Creatomate.TextAppearWordByWord(),
  // new Creatomate.TextAppearWordByWordHighlighting(),
  // new Creatomate.TextAppearWordByWordRandomly(),

  // Text Reveal and variants
  new Creatomate.TextReveal(),
  // new Creatomate.TextRevealCenter(),
  // new Creatomate.TextRevealCenterHorizontal(),
  // new Creatomate.TextRevealCenterVertical(),
  // new Creatomate.TextRevealDown(),
  // new Creatomate.TextRevealLeft(),
  // new Creatomate.TextRevealRight(),
  // new Creatomate.TextRevealUp(),

  // Text Spin and variants
  new Creatomate.TextSpin(),
  // new Creatomate.TextSpinLetters(),
  // new Creatomate.TextSpinLettersChaotic(),
  // new Creatomate.TextSpinLettersChaoticRandomly(),
  // new Creatomate.TextSpinLettersDown(),
  // new Creatomate.TextSpinLettersLeft(),
  // new Creatomate.TextSpinLettersRight(),
  // new Creatomate.TextSpinLettersUp(),

  // Text Fly and variants
  new Creatomate.TextFly(),
  // new Creatomate.TextFlyInLetterByLetter(),
  // new Creatomate.TextFlyInLineByLine(),
  // new Creatomate.TextFlyInWordByWord(),

  // Text Wave and variants
  new Creatomate.TextWave(),
  // new Creatomate.TextWaveInLetterByLetter(),
  // new Creatomate.TextWaveInLetterByLetterAlternative(),
  // new Creatomate.TextWaveInLetterByLetterRandomly(),
  // new Creatomate.TextWaveInLineByLine(),
  // new Creatomate.TextWaveInLongWavelength(),
  // new Creatomate.TextWaveInWordByWord(),

  // Text Typewriter and variants
  new Creatomate.TextTypewriter(),
  // new Creatomate.TextTypewriterFixedDuration(),
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
