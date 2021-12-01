const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/places-controller");

const placeInputs = {
  title: "title",
  description: "description",
  address: "address",
};
const { title, description, address } = placeInputs;

const createPlaceValidations = [
  check(title).notEmpty(),
  check(description).isLength({ min: 5 }),
  check(address).notEmpty(),
];

const updatePlaceValidations = [
  check(placeInputs.title).notEmpty(),
  check(placeInputs.description).isLength({ min: 5 }),
];

router.get("/:pid", getPlaceById);
router.get("/user/:uid", getPlacesByUserId);
router.post("/", createPlaceValidations, createPlace);
router.patch("/:pid", updatePlaceValidations, updatePlace);
router.delete("/:pid", deletePlace);

module.exports = router;
