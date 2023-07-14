const Wallet = require("../database/wallet");
const Transaction = require("../database/trx");
const convertCurrency = require("../api/currencyApi");
const CustomError = require("./Error/errorHandler.service");

//abstract class
class TransactionMethods {
  async transformCurrency(sourceCurrency, targetCurrency, amount) {
    try {
      const conversion = await convertCurrency(
        sourceCurrency,
        targetCurrency,
        amount
      );

      return conversion;
    } catch (error) {
      return error;
    }
  }
  async sumTransaction(walletId, currency) {
    try {
      //sum all amount of transactions whit type deposit
      const wallet = await Wallet.findById(walletId);
      if (!wallet) throw new CustomError("Wallet not found", 404);
      const transactions = await Transaction.find({
        walletId,
        type: "deposit",
        currency,
      });
      if (!transactions) throw new CustomError("Transactions not found", 404);
      const sumTransactions = transactions.reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0);
      const updateSum = await Wallet.findByIdAndUpdate(
        walletId,
        {
          currentAmount: {
            ...wallet.currentAmount,
            [currency]: sumTransactions.toFixed(2),
          },
        },
        { new: true }
      );
      if (!updateSum) throw new CustomError("Wallet not updated", 500);
      return updateSum;
    } catch (error) {
      return error;
    }
  }
  async subtractTransaction(walletId, currency) {
    try {
      //subtract all amount of transactions whit type withdraw
      const wallet = await Wallet.findById(walletId);
      if (!wallet) throw new CustomError("Wallet not found", 404);
      const transactions = await Transaction.find({
        walletId,
        type: "withdraw",
        currency,
      });
      if (!transactions) throw new CustomError("Transactions not found", 404);
      const subTransactions = transactions.reduce((acc, transaction) => {
        if (acc < 0) throw new CustomError("Insufficient funds", 400);
        return acc - transaction.amount;
      }, 0);
      const updateSum = await Wallet.findByIdAndUpdate(
        walletId,
        {
          currentAmount: {
            ...wallet.currentAmount,
            [currency]: subTransactions.toFixed(2),
          },
        },
        { new: true }
      );
      console.log(updateSum);
      if (!updateSum) throw new CustomError("Wallet not updated", 500);
      return updateSum;
    } catch (error) {
      return error;
    }
  }
}

//product class
class Deposit extends TransactionMethods {
  constructor() {
    super();
  }
  async createDeposit(walletId, amount, currency, type) {
    try {
      const wallet = await Wallet.findById(walletId);
      if (!wallet) throw new CustomError("Wallet not found", 404);
      const transaction = new Transaction({
        walletId,
        amount,
        currency,
        type,
      });
      await transaction.save();
      if (!transaction) throw new CustomError("Transaction not created", 500);
      const updateWallet = await this.sumTransaction(walletId, currency);
      if (!updateWallet) throw new CustomError("Wallet not updated", 500);
      return updateWallet;
    } catch (error) {
      return error;
    }
  }
}
class Withdraw extends TransactionMethods {
  constructor() {
    super();
  }
  async createWithdraw(walletId, amount, currency, type) {
    try {
      const wallet = await Wallet.findById(walletId);
      if (!wallet) throw new CustomError("Wallet not found", 404);
      const transaction = new Transaction({
        walletId,
        amount,
        currency,
        type,
      });
      await transaction.save();
      if (!transaction) throw new CustomError("Transaction not created", 500);
      const updateWallet = await this.subtractTransaction(walletId, currency);
      if (!updateWallet) throw new CustomError("Wallet not updated", 500);
      return updateWallet;
    } catch (error) {
      return error;
    }
  }
}
class Exchange extends TransactionMethods {
  constructor() {
    super();
  }
}

//factory class
class TransactionFactory {
  constructor() {}
  createTransaction(type) {
    switch (type) {
      case "deposit":
        return new Deposit();
      case "withdraw":
        return new Withdraw();
      case "exchange":
        return new Exchange();
      default:
        throw new Error("Invalid transaction type");
    }
  }
}

module.exports = TransactionFactory;
