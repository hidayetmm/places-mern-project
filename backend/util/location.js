const axios = require("axios");
const HttpError = require("../models/http-error");
const API_KEY = "prj_test_sk_e8c2d329589a9ace835d049c619cfe741a81f0f4";

async function getCoordinatesForAddress(address) {
  const url = "https://api.radar.io/v1/geocode/forward";
  const config = {
    headers: {
      authorization: API_KEY,
    },
    params: { query: address },
  };
  const response = await axios.get(url, config);
  const data = response.data;
  if (!data || data.addresses.length < 1) {
    throw new HttpError(
      "Could not find location for the specified address.",
      422
    );
  }

  const identifiedAddress = data.addresses[0];
  const coordinates = {
    latitude: identifiedAddress.latitude,
    longitude: identifiedAddress.longitude,
  };
  return coordinates;
}

module.exports = getCoordinatesForAddress;
