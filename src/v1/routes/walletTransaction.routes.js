const express = require("express");
const { body, params } = require("express-validator");

const { transaction } = require("../../controllers");
const validateRequest = require("../../middlewares/validationRequest");

const router = express.Router();

router
  .post("/", transaction.deposit)
  .get("/:id", transaction.printBalance)
  .put("/:id", transaction.withdraw)
  .put("/:id", transaction.exchange);

module.exports = router;
