const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/places-controller");

const createPlaceValidations = [
  check("title").not().isEmpty(),
  check("description").isLength({ min: 5 }),
  check("address").not().isEmpty(),
];

router.get("/:pid", getPlaceById);
router.get("/user/:uid", getPlacesByUserId);
router.post("/", createPlaceValidations, createPlace);
router.patch("/:pid", updatePlace);
router.delete("/:pid", deletePlace);

module.exports = router;
