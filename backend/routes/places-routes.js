const express = require("express");
const HttpError = require("../models/http-error");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous skyscrapers in the world.",
    location: {
      lat: 40.748817,
      lng: -73.985428,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const userPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  if (userPlaces.length < 1) {
    return next(
      new HttpError("Could not find a place with that user id.", 404)
    );
  }
  res.json({ userPlaces });
});

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    throw new HttpError("Could not find a place with that place id.", 404);
  }
  res.json({ place });
});

module.exports = router;
