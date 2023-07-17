const { expect } = require("chai");
const sinon = require("sinon");
const TransactionMethods = require("../src/services/walletMethods/methods.service");
const Wallet = require("../src/database/wallet");
const { connect } = require("../src/database/db");

describe("TransactionMethods", () => {
  let transactionMethods;
  let sandbox;

  before(async () => {
    await connect();
  });

  beforeEach(() => {
    transactionMethods = new TransactionMethods();
    sandbox = sinon.createSandbox();
  });

  describe("transformCurrency", () => {
    it("should throw an error if conversion is not found", async () => {
      const convertCurrencyMock = sinon.mock().resolves(null);

      transactionMethods.convertCurrency = convertCurrencyMock;

      const sourceCurrency = "USD";
      const targetCurrency = "EUR";
      const amount = 100;

      try {
        await transactionMethods.transformCurrency(
          sourceCurrency,
          targetCurrency,
          amount
        );
      } catch (error) {
        expect(error.message).to.equal("Conversion not found");
        expect(error.statusCode).to.equal(404);
      }
    });
  });

  describe("validateWallet", () => {
    afterEach(() => {
      sandbox.restore();
    });
    it("should call Wallet.findById with the correct walletId", async () => {
      const walletId = "123";

      const findByIdStub = sandbox
        .stub(Wallet, "findById")
        .resolves({ walletId });

      await transactionMethods.validateWallet(walletId);

      expect(findByIdStub.calledOnceWithExactly(walletId)).to.be.true;
    });

    it("should throw an error if wallet is not found", async () => {
      const walletId = "123";

      const findByIdStub = sandbox.stub(Wallet, "findById").resolves(null);

      try {
        await transactionMethods.validateWallet(walletId);
      } catch (error) {
        expect(error.message).to.equal("Wallet not found");
        expect(error.statusCode).to.equal(404);
      }
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
