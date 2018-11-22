const yargs = require('yargs');
const axios = require('axios');

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

const encodedAddress = encodeURIComponent(argv.address);

const geocodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=GAzAWmoxwqipHCz3DIW47edftuGbs59z&location=${encodedAddress}`;

axios
  .get(geocodeURL)
  .then(response => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address');
    }
    const { lat, lng } = response.data.results[0].locations[0].displayLatLng;
    const weatherURL = `https://api.darksky.net/forecast/dc2adddb4e51aaea4ac818a98d016452/${lat},${lng}`;

    return axios.get(weatherURL);
  })
  .then(response => {
    const temp = response.data.currently.temperature;
    const apparentTemp = response.data.currently.apparentTemperature;
    console.log(
      `It's currently ${temp} in ${argv.address}. It feels like ${apparentTemp}`
    );
  })
  .catch(err => {
    if (err.code === 'ENOTFOUND') {
      return console.log('Unable to connect to the mapquestapi servers...');
    } else {
      return console.log(err.message);
    }
  });
