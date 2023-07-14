const TransactionMethods = require("./methods.service");
const CustomError = require("../Error/errorHandler.service");

//product class
class Deposit extends TransactionMethods {
  constructor() {
    super();
  }
  async createDeposit(walletId, amount, currency, type) {
    try {
      const wallet = await this.validateWallet(walletId);
      if (wallet.hasOwnProperty("status") && wallet.status != 200)
        return new CustomError(wallet.message, wallet.status);

      const transaction = await this.createTransaction(
        walletId,
        amount,
        currency,
        type
      );

      if (!transaction) throw new CustomError("Transaction not created", 500);
      const updateWallet = await this.updateBalance(walletId, currency);

      if (!updateWallet) throw new CustomError("Wallet not updated", 500);
      return updateWallet;
    } catch (error) {
      console.error(error);
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
      const wallet = await this.validateWallet(walletId);
      if (wallet.hasOwnProperty("status") && wallet.status != 200)
        return new CustomError(wallet.message, wallet.status);

      const validateWithdraw = await this.validateWithdraw(
        walletId,
        amount,
        currency
      );
      if (
        validateWithdraw.hasOwnProperty("status") &&
        validateWithdraw.status != 200
      )
        return new CustomError(
          validateWithdraw.message,
          validateWithdraw.status
        );

      const transaction = await this.createTransaction(
        walletId,
        amount,
        currency,
        type
      );
      if (transaction.hasOwnProperty("status") && transaction.status != 200)
        return new CustomError(transaction.message, transaction.status);

      const updateWallet = await this.updateBalance(walletId, currency);
      if (updateWallet.hasOwnProperty("status") && updateWallet.status != 200)
        return new CustomError(updateWallet.message, updateWallet.status);

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

  async createExchange(walletId, amount, sourceCurrency, targetCurrency, type) {
    try {
      const wallet = await this.validateWallet(walletId);
      if (wallet.hasOwnProperty("status") && wallet.status != 200)
        return new CustomError(wallet.message, wallet.status);

      const validateWithdraw = await this.validateWithdraw(
        walletId,
        amount,
        sourceCurrency
      );
      if (
        validateWithdraw.hasOwnProperty("status") &&
        validateWithdraw.status != 200
      )
        return new CustomError(
          validateWithdraw.message,
          validateWithdraw.status
        );

      const sourceAmount = await this.transformCurrency(
        sourceCurrency,
        targetCurrency,
        amount
      );
      if (sourceAmount.hasOwnProperty("status") && sourceAmount.status != 200)
        return new CustomError(sourceAmount.message, sourceAmount.status);

      const transactionExange = await this.createTrxExchange(
        walletId,
        amount,
        sourceCurrency,
        targetCurrency,
        type
      );
      if (
        transactionExange.hasOwnProperty("status") &&
        transactionExange.status != 200
      )
        return new CustomError(
          transactionExange.message,
          transactionExange.status
        );

      const transactionDeposit = await this.createTransaction(
        walletId,
        sourceAmount.price,
        targetCurrency,
        "deposit"
      );
      if (
        transactionDeposit.hasOwnProperty("status") &&
        transactionDeposit.status != 200
      )
        return new CustomError(
          transactionDeposit.message,
          transactionDeposit.status
        );

      const transactionWithdraw = await this.createTransaction(
        walletId,
        amount,
        sourceCurrency,
        "withdraw"
      );
      if (
        transactionWithdraw.hasOwnProperty("status") &&
        transactionWithdraw.status != 200
      )
        return new CustomError(
          transactionWithdraw.message,
          transactionWithdraw.status
        );

      const updateTargetCurrency = await this.updateBalance(
        walletId,
        targetCurrency
      );
      if (
        updateTargetCurrency.hasOwnProperty("status") &&
        updateTargetCurrency.status != 200
      )
        return new CustomError(
          updateTargetCurrency.message,
          updateTargetCurrency.status
        );

      const updateSourceCurrency = await this.updateBalance(
        walletId,
        sourceCurrency
      );
      if (
        updateSourceCurrency.hasOwnProperty("status") &&
        updateSourceCurrency.status != 200
      )
        return new CustomError(
          updateSourceCurrency.message,
          updateSourceCurrency.status
        );
      return updateTargetCurrency;
    } catch (error) {
      return error;
    }
  }
}

class Balance extends TransactionMethods {
  async getBalance(walletId, currency) {
    try {
      const updateCurrencies = await this.updateBalance(walletId, currency);
      if (
        updateCurrencies.hasOwnProperty("status") &&
        updateCurrencies.status != 200
      )
        return new CustomError(
          updateCurrencies.message,
          updateCurrencies.status
        );
    } catch (error) {
      return error;
    }
  }
}
module.exports = { Deposit, Withdraw, Exchange, Balance };
