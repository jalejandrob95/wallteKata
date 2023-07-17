const { expect } = require("chai");
const {
  Deposit,
  Withdraw,
  Exchange,
  Balance,
} = require("../src/services/walletMethods/transactions.service");
const TransactionFactory = require("../src/services/walletMethods/factoryWallet.service");

describe("TransactionFactory", () => {
  describe("createTransaction", () => {
    it("should return a new Deposit instance when type is 'deposit'", () => {
      const factory = new TransactionFactory();
      const transaction = factory.createTransaction("deposit");
      expect(transaction).to.be.an.instanceOf(Deposit);
    });

    it("should return a new Withdraw instance when type is 'withdraw'", () => {
      const factory = new TransactionFactory();
      const transaction = factory.createTransaction("withdraw");
      expect(transaction).to.be.an.instanceOf(Withdraw);
    });

    it("should return a new Exchange instance when type is 'exchange'", () => {
      const factory = new TransactionFactory();
      const transaction = factory.createTransaction("exchange");
      expect(transaction).to.be.an.instanceOf(Exchange);
    });

    it("should return a new Balance instance when type is 'printBalance'", () => {
      const factory = new TransactionFactory();
      const transaction = factory.createTransaction("printBalance");
      expect(transaction).to.be.an.instanceOf(Balance);
    });

    it("should throw an error when type is invalid", () => {
      const factory = new TransactionFactory();
      expect(() => {
        factory.createTransaction("invalidType");
      }).to.throw("Invalid transaction type");
    });
  });
});
