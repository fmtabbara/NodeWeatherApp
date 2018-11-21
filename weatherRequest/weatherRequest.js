const request = require('request');

const getWeather = (lat, lon, callback) => {
  request(`https://api.darksky.net/forecast/dc2adddb4e51aaea4ac818a98d016452/${lat},${lon}`, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      callback('Unable to fetch weather from the Forecast.io servers');
    } else {
      const {
        currently: { temperature, apparentTemperature }
      } = JSON.parse(body);
      callback(undefined, { temperature, apparentTemperature });
    }
  });
};

module.exports = { getWeather };
