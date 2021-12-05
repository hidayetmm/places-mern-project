require("dotenv").config();
const express = require("express");
const HttpError = require("./models/http-error");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use(() => {
  const error = new HttpError("Could not found this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured." });
});

mongoose
  .connect(process.env.ATLAS_CLUSTER_CONNECTION_STRING)
  .then(() => {
    console.log("Database connection established.");
    app.listen(7070);
  })
  .catch((error) => console.log(error));
