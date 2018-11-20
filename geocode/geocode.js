const request = require('request');

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  request(
    {
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=GAzAWmoxwqipHCz3DIW47edftuGbs59z&location=${encodedAddress}`,
      json: true
    },
    (err, res, body) => {
      if (err) {
        callback('Unable to get a server response');
      } else if (body.info.statuscode === 400) {
        callback(body.info.messages[0]);
      } else {
        callback(undefined, {
          encodedAddress,
          result: body.results[0].locations[0].displayLatLng
        });
      }
    }
  );
};

module.exports = { geocodeAddress };
