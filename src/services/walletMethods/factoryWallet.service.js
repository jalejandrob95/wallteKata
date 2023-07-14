const {
  Deposit,
  Withdraw,
  Exchange,
  Balance,
} = require("./transactions.service");
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
      case "printBalance":
        return new Balance();
      default:
        throw new Error("Invalid transaction type");
    }
  }
}

module.exports = TransactionFactory;
