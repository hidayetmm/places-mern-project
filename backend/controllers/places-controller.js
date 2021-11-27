const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous skyscrapers in the world.",
    coordinates: {
      lat: 40.748817,
      lng: -73.985428,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building 2",
    description: "One of the most famous skyscrapers in the world.",
    coordinates: {
      lat: 40.748817,
      lng: -73.985428,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u2",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    throw new HttpError("Could not find a place with that place id.", 404);
  }
  res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const userPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  if (userPlaces.length < 1) {
    return next(
      new HttpError("Could not find a place with that user id.", 404)
    );
  }
  res.json({ userPlaces });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    title,
    description,
    coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const placeId = req.params.pid;
  const { title, description, coordinates, address } = req.body;

  const updatedPlaces = DUMMY_PLACES.map((place) => {
    if (place.id === placeId) {
      return { ...place, title, description, coordinates, address };
    }
    return place;
  });

  DUMMY_PLACES = updatedPlaces;
  const updatedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  res.status(201).json({ place: updatedPlace });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
