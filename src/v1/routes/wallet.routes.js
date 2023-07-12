const express = require("express");
const { body, param } = require("express-validator");
const validateRequest = require("../../middlewares/validationRequest");
const {
  get,
  getById,
  create,
  updateOne,
  deleteOne,
} = require("../../controllers/wallet.controller");

const router = express.Router();

router
  .get("/", validateRequest, get)
  .get(
    "/",
    param("id").isMongoId().notEmpty().withMessage("id is required"),
    validateRequest,
    getById
  )
  .post(
    "/",
    body("email").normalizeEmail().notEmpty().withMessage("email is required"),
    validateRequest,
    create
  )
  .put(
    "/:id",
    param("id").isMongoId().notEmpty().withMessage("id is required"),
    validateRequest,
    updateOne
  )
  .delete(
    "/:id",
    param("id").isMongoId().notEmpty().withMessage("id is required"),
    validateRequest,
    deleteOne
  );

module.exports = router;
