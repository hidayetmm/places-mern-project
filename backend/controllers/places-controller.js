const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const { getCoordinatesForAddress } = require("../util/location");

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
    creator: "u1",
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

const getPlacesByUserId = (req, res, next) => {
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
  const { title, description, address, creator } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const errorInputs = errors.errors.map((input) => input.param);
    throw new HttpError(`Invalid input of ${errorInputs}`, 422);
  }

  const createdPlace = {
    id: uuid(),
    title,
    description,
    address,
    creator,
  };

  getCoordinatesForAddress(address).then((response) => {
    if (
      response &&
      response.meta.code === 200 &&
      response.addresses.length > 0
    ) {
      const identifiedAddress = response.addresses[0];
      const createdPlace = {
        id: uuid(),
        title,
        description,
        address: identifiedAddress.formattedAddress,
        coordinates: {
          latitude: identifiedAddress.latitude,
          longitude: identifiedAddress.longitude,
        },
        creator,
      };

      DUMMY_PLACES.push(createdPlace);
      console.log(response);
      res.status(201).json({ place: createdPlace });
    } else {
      res.status(400).json({ message: "Please enter a valid address." });
    }
  });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorInputs = errors.errors.map((input) => input.param);
    throw new HttpError(`Invalid input of ${errorInputs}`, 422);
  }
  const placeId = req.params.pid;
  const { title, description } = req.body;

  const updatedPlace = {
    ...DUMMY_PLACES.find((place) => place.id === placeId),
  };
  updatedPlace.title = title;
  updatedPlace.description = description;

  const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === placeId);
  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  const deletedPlace = DUMMY_PLACES.find((place) => place.id === placeId);
  if (!deletedPlace) {
    return res
      .status(404)
      .json({ message: "Could not find a place with that id." });
  } else {
    DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== placeId);
    res.status(200).json({ message: "Place is deleted." });
  }
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
