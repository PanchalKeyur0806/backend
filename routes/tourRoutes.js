const express = require("express");
const tourController = require("../controller/tourController");

const routes = express.Router();

routes
  .route("/")
  .get(tourController.getTours)
  .post(tourController.uploadImages, tourController.createTour);
routes
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.uploadImages, tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = routes;
