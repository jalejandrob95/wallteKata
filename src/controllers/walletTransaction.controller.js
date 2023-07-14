const TransactionFactory = require("../services/transactions.service");
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
    res.status(200).json({ message: "Hello world" });
  } catch (error) {}
};
const printBalance = async (req, res) => {
  try {
    res.status(200).json({ message: "Hello world" });
  } catch (error) {}
};

module.exports = {
  deposit,
  withdraw,
  exchange,
  printBalance,
};
