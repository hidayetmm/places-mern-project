const express = require("express");
const app = express();

const placesRoutes = require("./routes/places-routes");

app.use(placesRoutes);

app.listen(7070);
