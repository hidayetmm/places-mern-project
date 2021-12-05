const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const getCoordinatesForAddress = require("../util/location");
const Place = require("../models/place");

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

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }
  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided place id.",
      404
    );
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again.",
      494
    );
    return next(error);
  }
  if (!places) {
    return next(
      new HttpError("Could not find a place with that user id.", 404)
    );
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const { title, description, address, creator } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const errorInputs = errors.errors.map((input) => input.param);
    next(new HttpError(`Invalid input of ${errorInputs}`, 422));
  }

  let coordinates;
  try {
    coordinates = await getCoordinatesForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://www.edreams.com/blog/wp-content/uploads/sites/3/2013/07/shutterstock_168497345.jpg",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
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
