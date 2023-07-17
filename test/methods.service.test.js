const { expect } = require("chai");
const sinon = require("sinon");
const TransactionMethods = require("../src/services/walletMethods/methods.service");
const Wallet = require("../src/database/wallet");
const Transaction = require("../src/database/trx");
const { connect } = require("../src/database/db");

describe("TransactionMethods", () => {
  let transactionMethods;
  let sandbox;

  beforeEach(async () => {
    await connect();
    transactionMethods = new TransactionMethods();
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("validateWithdraw", () => {
    it("should validate wallet and check if funds are sufficient for withdrawal", async () => {
      const walletId = "123";
      const amount = 100;
      const currency = "USD";

      const walletData = {
        _id: walletId,
        currentAmount: {
          USD: 200,
        },
      };

      const findByIdStub = sandbox
        .stub(Wallet, "findById")
        .resolves(walletData);

      const result = await transactionMethods.validateWithdraw(
        walletId,
        amount,
        currency
      );

      expect(findByIdStub.calledOnceWithExactly(walletId)).to.be.true;
      expect(result).to.deep.equal(walletData);
    });

    it("should throw an error if wallet is not found", async () => {
      const walletId = "123";
      const amount = 100;
      const currency = "USD";

      const findByIdStub = sandbox.stub(Wallet, "findById").resolves(null);

      try {
        await transactionMethods.validateWithdraw(walletId, amount, currency);
      } catch (error) {
        expect(error.message).to.equal("Wallet not found");
        expect(error.statusCode).to.equal(404);
      }
    });

    it("should throw an error if funds are insufficient for withdrawal", async () => {
      const walletId = "123";
      const amount = 100;
      const currency = "USD";

      const walletData = {
        _id: walletId,
        currentAmount: {
          USD: 50,
        },
      };

      const findByIdStub = sandbox
        .stub(Wallet, "findById")
        .resolves(walletData);

      try {
        await transactionMethods.validateWithdraw(walletId, amount, currency);
      } catch (error) {
        expect(error.message).to.equal("Insufficient funds");
        expect(error.statusCode).to.equal(400);
      }
    });
  });

  describe("updateBalance", () => {
    it("should throw an error if no transactions are found", async () => {
      const walletId = "123";
      const currency = "USD";

      const findByIdStub = sandbox.stub(Transaction, "find").resolves([]);
      const updateByIdStub = sandbox
        .stub(Wallet, "findByIdAndUpdate")
        .resolves(null);

      try {
        await transactionMethods.updateBalance(walletId, currency);
      } catch (error) {
        expect(error.message).to.equal("Transactions not found");
        expect(error.statusCode).to.equal(404);
      }
    });
  });

  describe("getLastTrx", () => {
    it("should throw an error if no transactions are found", async () => {
      const walletId = "123";

      const findStub = sandbox.stub(Transaction, "find").resolves([]);

      try {
        await transactionMethods.getLastTrx(walletId);
      } catch (error) {
        expect(error.message).to.equal("Transactions not found");
        expect(error.statusCode).to.equal(404);
      }
    });
  });
});
