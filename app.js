const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weatherRequest = require('./weatherRequest/weatherRequest');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for. Example -a="My Location"',
      string: true
    }
  })
  .help()
  .alias('help', 'h').argv;

geocode.geocodeAddress(argv.a, (err, geoRes) => {
  if (err) {
    console.log(err);
  } else {
    weatherRequest.getWeather(geoRes.lat, geoRes.lng, (err, weatherRes) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`It's currently ${weatherRes.temperature} in ${geoRes.encodedAddress}. It feels like ${weatherRes.apparentTemperature}`);
      }
    });
  }
});
