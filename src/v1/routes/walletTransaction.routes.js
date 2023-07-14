const express = require("express");
const { body, param } = require("express-validator");

const {
  deposit,
  withdraw,
  exchange,
  printBalance,
} = require("../../controllers/walletTransaction.controller");

const validateRequest = require("../../middlewares/validationRequest");

const router = express.Router();

router
  .post(
    "/deposit/:id",
    param("id").isMongoId().notEmpty().withMessage("id is required"),
    body("currency").notEmpty().withMessage("currency is required"),
    body("amount").notEmpty().withMessage("amount is required"),
    validateRequest,
    deposit
  )
  .get(
    "/report/:id",
    param("id").isMongoId().notEmpty().withMessage("id is required"),
    validateRequest,
    printBalance
  )
  .put(
    "/withdraw/:id",
    param("id").isMongoId().notEmpty().withMessage("id is required"),
    body("currency").notEmpty().withMessage("currency is required"),
    body("amount").notEmpty().withMessage("amount is required"),
    validateRequest,
    withdraw
  )
  .put(
    "/exchange/:id",
    param("id").isMongoId().notEmpty().withMessage("id is required"),
    body("targetCurrency").notEmpty().withMessage("currency is required"),
    body("sourceCurrency").notEmpty().withMessage("currency is required"),
    body("amount").notEmpty().withMessage("amount is required"),
    validateRequest,
    exchange
  );

module.exports = router;
