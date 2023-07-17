const Wallet = require("../../database/wallet");
const convertCurrency = require("../../api/currencyApi");
const Transaction = require("../../database/trx");
const CustomError = require("../Error/errorHandler.service");

class TransactionMethods {
  async transformCurrency(sourceCurrency, targetCurrency, amount) {
    try {
      const conversion = await convertCurrency(
        sourceCurrency,
        targetCurrency,
        amount
      );
      if (!conversion) throw new CustomError("Conversion not found", 404);
      return conversion;
    } catch (error) {
      return error;
    }
  }

  async validateWallet(walletId) {
    try {
      const wallet = await Wallet.findById(walletId);
      if (!wallet) throw new CustomError("Wallet not found", 404);
      return wallet;
    } catch (error) {
      return error;
    }
  }

  async createTransaction(walletId, amount, currency, type) {
    try {
      const transaction = new Transaction({
        walletId,
        amount,
        currency,
        type,
      });
      await transaction.save();
      if (!transaction) throw new CustomError("Transaction not created", 500);
      return transaction;
    } catch (error) {
      return error;
    }
  }

  async createTrxExchange(
    walletId,
    amount,
    sourceCurrency,
    targetCurrency,
    type
  ) {
    try {
      const transaction = new Transaction({
        walletId,
        amount,
        sourceCurrency,
        targetCurrency,
        type,
      });
      await transaction.save();
      if (!transaction) throw new CustomError("Transaction not created", 500);
      return transaction;
    } catch (error) {
      return error;
    }
  }

  async validateWithdraw(walletId, amount, currency) {
    try {
      const wallet = await Wallet.findById(walletId);
      if (!wallet) throw new CustomError("Wallet not found", 404);
      if (wallet.currentAmount[currency] < amount)
        throw new CustomError("Insufficient funds", 400);
      return wallet;
    } catch (error) {
      return error;
    }
  }

  async updateBalance(walletId, currency) {
    try {
      const transactions = await Transaction.find({
        walletId,
        currency,
      });

      if (!transactions) throw new CustomError("Transactions not found", 404);

      const sumTransactions = transactions.filter(
        (find) => find.type === "deposit"
      );
      const totalSum = sumTransactions.reduce((acc, transaction) => {
        return acc + (transaction.amount || 0);
      }, 0);

      const restTransactions = transactions.filter(
        (find) => find.type === "withdraw"
      );
      const totalRest = restTransactions.reduce((acc, transaction) => {
        return acc + (transaction.amount || 0);
      }, 0);
      const wallet = await Wallet.findByIdAndUpdate(walletId, {
        $set: {
          [`currentAmount.${currency}`]: totalSum - totalRest,
        },
      });

      if (!wallet) throw new CustomError("Wallet not updated", 500);

      const updateWallet = await Wallet.findById(walletId);
      if (!updateWallet) throw new CustomError("Wallet not found", 404);

      return updateWallet;
    } catch (error) {
      return error;
    }
  }

  async getLastTrx(walletId) {
    try {
      const trx = await Transaction.find({ walletId })
        .sort({ createdAt: -1 })
        .limit(10);
      if (!trx) throw new CustomError("Transactions not found", 404);
      return trx;
    } catch (error) {
      return error;
    }
  }
}

module.exports = TransactionMethods;
