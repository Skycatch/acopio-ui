'use strict';

var _ = require('lodash');
// var Result = require('./result');
var request = require('request');


function Address(address) {
  this.address = address;
  this.url = 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' + encodeURIComponent(this.address) + '&key=AIzaSyCkgia4tuZ_tZBjxNYPx0gn-0JZr9SdI18';
}

_.extend(Address.prototype, {
  buildResult: function(body) {
    body = body || {};

    if (body && body.results) {
      body = body.results[0];
    }

    var country = _resultAddressComponent(body, 'country');
    var postalCode = _resultAddressComponent(body, 'postal_code');
    var region = _resultAddressComponent(body, 'administrative_area_level_1');
    var city = _resultAddressComponent(body, 'locality');
    var neighborhood = _resultAddressComponent(body, 'neighborhood');
    var streetNumber = _resultAddressComponent(body, 'street_number');
    var street = _resultAddressComponent(body, 'route');
    var county = _resultAddressComponent(body, 'administrative_area_level_2');

    return {
      countryCode: country.short_name,
      country: country.long_name,
      regionCode: region.short_name,
      region: region.long_name,
      city: city.long_name,
      postalCode: postalCode.long_name,
      lat: body.geometry.location.lat,
      lng: body.geometry.location.lng,

      streetNumber: streetNumber.long_name,
      street: street.long_name,
      neighborhood: neighborhood.long_name,
      county: county.long_name
    };
  },

});

function _resultAddressComponent(body, componentName) {
  let components = body.address_components || {};

  return _.find(components, function(component) {
    return _.includes(component.types, componentName);
  }) || {};
}

const locate = function(address, callback) {
  let locator;
  let opts;

  locator = new Address(address);

  opts = {
    method: 'GET',
    url: locator.url,
    json: true
  };

  request(opts, function(err, res, body) {

    if (err) {
      return callback(err);
    }

    if (body.error_message) {
      console.error(body.error_message);
      return callback(body.error_message);
    }

    callback(null, locator.buildResult(body));
  });
};



module.exports = { locate };