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
  /**
   * @openapi
   * /v1/wallet/:
   *  get:
   *   description: Get all wallets
   *   tags:
   *    - Wallet
   *   responses:
   *    '200':
   *     description: Success
   *    '400':
   *     description: Bad request
   *    '500':
   *     description: Internal server error
   */
  .get("/", validateRequest, get)
  /**
   * @openapi
   * /v1/wallet/{id}:
   *   get:
   *     description: Get wallet by ID
   *     tags:
   *       - Wallet
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the wallet
   *     responses:
   *       '200':
   *         description: Success
   *       '400':
   *         description: Bad request
   *       '500':
   *         description: Internal server error
   */
  .get(
    "/:id",
    param("id").isMongoId().notEmpty().withMessage("id is required"),
    validateRequest,
    getById
  )
  /**
   * @openapi
   * /v1/wallet/:
   *   post:
   *     description: Create a new wallet
   *     tags:
   *       - Wallet
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *             example:
   *               email: jalejandrobb@gmail.com
   *     responses:
   *       '200':
   *         description: Success
   *       '400':
   *         description: Bad request
   *       '500':
   *         description: Internal server error
   */
  .post(
    "/",
    body("email")
      .isEmail()
      .normalizeEmail()
      .notEmpty()
      .withMessage("email is required"),
    validateRequest,
    create
  )
  /**
   * @openapi
   * /v1/wallet/{id}:
   *   put:
   *     description: Update a wallet
   *     tags:
   *       - Wallet
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
   *               email:
   *                 type: string
   *             example:
   *               email: jalejandrob955@gmail.com
   *     responses:
   *       '200':
   *         description: Success
   *       '400':
   *         description: Bad request
   *       '500':
   *         description: Internal server error
   */
  .put(
    "/:id",
    param("id").isMongoId().notEmpty().withMessage("id is required"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .notEmpty()
      .withMessage("email is required"),
    validateRequest,
    updateOne
  )
  /**
   * @openapi
   * /v1/wallet/{id}:
   *   delete:
   *     description: Delete a wallet
   *     tags:
   *       - Wallet
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the wallet
   *     responses:
   *       '200':
   *         description: Success
   *       '400':
   *         description: Bad request
   *       '500':
   *         description: Internal server error
   */
  .delete(
    "/:id",
    param("id").isMongoId().notEmpty().withMessage("id is required"),
    validateRequest,
    deleteOne
  );

module.exports = router;
