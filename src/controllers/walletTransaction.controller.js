const TransactionFactory = require("../services/walletMethods/factoryWallet.service");
const CustomError = require("../services/Error/errorHandler.service.js");

const methods = new TransactionFactory();

const deposit = async (req, res) => {
  try {
    const { id } = req.params;
    const { currency, amount } = req.body;

    const deposit = methods.createTransaction("deposit");
    const wallet = await deposit.createDeposit(id, amount, currency, "deposit");

    if (wallet.hasOwnProperty("status") && wallet.status != 200)
      throw new CustomError(wallet.message, wallet.status);

    return res.status(200).json(wallet);
  } catch (error) {
    return res.status(error.status || 500).json(error);
  }
};
const withdraw = async (req, res) => {
  try {
    const { id } = req.params;
    const { currency, amount } = req.body;

    const withdraw = methods.createTransaction("withdraw");
    const wallet = await withdraw.createWithdraw(
      id,
      amount,
      currency,
      "withdraw"
    );
    if (wallet.hasOwnProperty("status") && wallet.status != 200)
      throw new CustomError(wallet.message, wallet.status);

    return res.status(200).json(wallet);
  } catch (error) {
    return res.status(error.status || 500).json(error);
  }
};
const exchange = async (req, res) => {
  try {
    const { id } = req.params;
    const { sourceCurrency, targetCurrency, amount } = req.body;
    const exchangeService = methods.createTransaction("exchange");
    const wallet = await exchangeService.createExchange(
      id,
      amount,
      sourceCurrency,
      targetCurrency,
      "exchange"
    );
    if (wallet.hasOwnProperty("status") && wallet.status != 200)
      throw new CustomError(wallet.message, wallet.status);

    return res.status(200).json(wallet);
  } catch (error) {
    return res.status(error.status || 500).json(error);
  }
};
const printBalance = async (req, res) => {
  try {
    const { id } = req.params;
    const printBalance = methods.createTransaction("printBalance");
    const USD = await printBalance.getBalance(id, "USD");
    const EUR = await printBalance.getBalance(id, "EUR");
    const ARS = await printBalance.getBalance(id, "ARS");
    const lastTrx = await printBalance.getTrx(id);
    if (
      (USD.hasOwnProperty("status") && USD.status != 200) ||
      (EUR.hasOwnProperty("status") && EUR.status != 200) ||
      (ARS.hasOwnProperty("status") && ARS.status != 200) ||
      (lastTrx.hasOwnProperty("status") && lastTrx.status != 200)
    )
      throw new CustomError(wallet.message, wallet.status);

    return res.status(200).json({ ARS, lastTrx });
  } catch (error) {
    return res.status(error.status || 500).json(error);
  }
};

module.exports = {
  deposit,
  withdraw,
  exchange,
  printBalance,
};
