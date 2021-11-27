const express = require("express");
const router = express.Router();

const {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
  updatePlace,
} = require("../controllers/places-controller");

router.get("/:pid", getPlaceById);
router.get("/user/:uid", getPlaceByUserId);
router.post("/", createPlace);
router.patch("/:pid", updatePlace);

module.exports = router;
