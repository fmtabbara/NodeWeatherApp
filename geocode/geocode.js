const request = require('request');

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  request(
    {
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=GAzAWmoxwqipHCz3DIW47edftuGbs59z&location=${encodedAddress}`,
      json: true
    },
    (err, res, body) => {
      if (err || res.statusCode !== 200 || body === undefined) {
        callback('Unable to get a server response');
      } else {
        const { lat, lng } = body.results[0].locations[0].displayLatLng;
        callback(undefined, { encodedAddress, lat, lng });
      }
    }
  );
};

module.exports = { geocodeAddress };
