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
  /**
   * @openapi
   * /v1/transaction/deposit/{id}:
   *   post:
   *     description: Deposit money to wallet
   *     tags:
   *       - Transaction
   *     responses:
   *       '200':
   *         description: Success
   *       '400':
   *         description: Bad request
   *       '500':
   *         description: Internal server error
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the wallet
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               currency:
   *                 type: string
   *                 description: Currency of the wallet
   *               amount:
   *                 type: number
   *                 description: Amount to deposit
   *             required:
   *               - currency
   *               - amount
   */
  .post(
    "/deposit/:id",
    param("id").isMongoId().notEmpty().withMessage("id is required"),
    body("currency").notEmpty().withMessage("currency is required"),
    body("amount").notEmpty().withMessage("amount is required"),
    validateRequest,
    deposit
  )
  /**
   * @openapi
   * /v1/transaction/report/{id}:
   *   get:
   *     description: Get report of wallet
   *     tags:
   *       - Transaction
   *     responses:
   *       '200':
   *         description: Success
   *       '400':
   *         description: Bad request
   *       '500':
   *         description: Internal server error
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the wallet
   */
  .get(
    "/report/:id",
    param("id").isMongoId().notEmpty().withMessage("id is required"),
    validateRequest,
    printBalance
  )
  /**
   * @openapi
   * /v1/transaction/withdraw/{id}:
   *   put:
   *     description: Withdraw money from wallet
   *     tags:
   *       - Transaction
   *     responses:
   *       '200':
   *         description: Success
   *       '400':
   *         description: Bad request
   *       '500':
   *         description: Internal server error
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the wallet
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               currency:
   *                 type: string
   *                 description: Currency of the wallet
   *               amount:
   *                 type: number
   *                 description: Amount to withdraw
   *             required:
   *               - currency
   *               - amount
   */
  .put(
    "/withdraw/:id",
    param("id").isMongoId().notEmpty().withMessage("id is required"),
    body("currency").notEmpty().withMessage("currency is required"),
    body("amount").notEmpty().withMessage("amount is required"),
    validateRequest,
    withdraw
  )
  /**
   * @openapi
   * /v1/transaction/exchange/{id}:
   *   put:
   *     description: Exchange money from wallet
   *     tags:
   *       - Transaction
   *     responses:
   *       '200':
   *         description: Success
   *       '400':
   *         description: Bad request
   *       '500':
   *         description: Internal server error
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the wallet
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               targetCurrency:
   *                 type: string
   *                 description: Currency of the target wallet
   *               sourceCurrency:
   *                 type: string
   *                 description: Currency of the source wallet
   *               amount:
   *                 type: number
   *                 description: Amount to exchange
   *             required:
   *               - targetCurrency
   *               - sourceCurrency
   *               - amount
   */
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
