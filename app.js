const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weatherRequest = require('./weatherRequest/weatherRequest');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h').argv;

// geocode.geocodeAddress(argv.a, (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(JSON.stringify(res, undefined, 2));
//   }
// });

weatherRequest.getWeather(51.5072, 0.1275, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(res, undefined, 2));
  }
});
