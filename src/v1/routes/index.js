const express = require("express");
const walletRouter = require("./wallet.routes");
const transactionRouter = require("./walletTransaction.routes");

function routesApi(app) {
  const router = express.Router();
  app.use("/v1", router);
  router.use("/wallet", walletRouter);
  router.use("/transaction", transactionRouter);
}

module.exports = routesApi;
