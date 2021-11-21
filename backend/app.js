const express = require("express");
const HttpError = require("./models/http-error");
const app = express();

app.use(express.json());

const placesRoutes = require("./routes/places-routes");

app.use("/api/places", placesRoutes);

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

app.listen(7070);
