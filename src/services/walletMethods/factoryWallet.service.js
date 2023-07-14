const { Deposit, Withdraw, Exchange } = require("./transactions.service");
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
