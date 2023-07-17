const { expect } = require("chai");
const sinon = require("sinon");
const {
  Deposit,
  Withdraw,
  Exchange,
  Balance,
} = require("../src/services/walletMethods/transactions.service");
const Wallet = require("../src/database/wallet");
const CustomError = require("../src/services/Error/errorHandler.service");

describe("Deposit", () => {
  let deposit;

  beforeEach(() => {
    deposit = new Deposit();
  });

  describe("createDeposit", () => {
    it("should call validateWallet with the correct walletId", async () => {
      const walletId = "123";
      const validateWalletStub = sinon
        .stub(deposit, "validateWallet")
        .resolves({ walletId });
      const amount = 100;
      const currency = "USD";
      const type = "deposit";

      sinon.stub(deposit, "createTransaction");
      sinon.stub(deposit, "updateBalance");

      await deposit.createDeposit(walletId, amount, currency, type);

      expect(validateWalletStub.calledOnceWithExactly(walletId)).to.be.true;
    });

    it("should call createTransaction with the correct arguments", async () => {
      const walletId = "123";
      const wallet = { walletId };
      const amount = 100;
      const currency = "USD";
      const type = "deposit";

      sinon.stub(deposit, "validateWallet").resolves(wallet);
      sinon.stub(deposit, "updateBalance");
      const createTransactionStub = sinon.stub(deposit, "createTransaction");

      await deposit.createDeposit(walletId, amount, currency, type);

      expect(
        createTransactionStub.calledOnceWithExactly(
          walletId,
          amount,
          currency,
          type
        )
      ).to.be.true;
    });
  });
});

describe("Withdraw", () => {
  let withdraw;

  beforeEach(() => {
    withdraw = new Withdraw();
  });

  describe("createWithdraw", () => {
    it("should call validateWallet with the correct walletId", async () => {
      const walletId = "123";
      const validateWalletStub = sinon
        .stub(withdraw, "validateWallet")
        .resolves({ walletId });
      const amount = 100;
      const currency = "USD";
      const type = "withdraw";

      sinon.stub(withdraw, "validateWithdraw");
      sinon.stub(withdraw, "createTransaction");
      sinon.stub(withdraw, "updateBalance");

      await withdraw.createWithdraw(walletId, amount, currency, type);

      expect(validateWalletStub.calledOnceWithExactly(walletId)).to.be.true;
    });
  });
});

describe("Exchange", () => {
  let exchange;

  beforeEach(() => {
    exchange = new Exchange();
  });

  describe("createExchange", () => {
    it("should call validateWallet with the correct walletId", async () => {
      const walletId = "123";
      const validateWalletStub = sinon
        .stub(exchange, "validateWallet")
        .resolves({ walletId });
      const amount = 100;
      const sourceCurrency = "USD";
      const targetCurrency = "EUR";
      const type = "exchange";

      sinon.stub(exchange, "validateWithdraw");
      sinon.stub(exchange, "transformCurrency");
      sinon.stub(exchange, "createTrxExchange");
      sinon.stub(exchange, "createTransaction");
      sinon.stub(exchange, "updateBalance");

      await exchange.createExchange(
        walletId,
        amount,
        sourceCurrency,
        targetCurrency,
        type
      );

      expect(validateWalletStub.calledOnceWithExactly(walletId)).to.be.true;
    });
  });
});

describe("Balance", () => {
  let balance;

  beforeEach(() => {
    balance = new Balance();
  });

  describe("getBalance", () => {
    it("should call updateBalance with the correct walletId and currency", async () => {
      const walletId = "123";
      const currency = "USD";

      const updateBalanceStub = sinon.stub(balance, "updateBalance");

      await balance.getBalance(walletId, currency);

      expect(updateBalanceStub.calledOnceWithExactly(walletId, currency)).to.be
        .true;
    });
  });

  describe("getTrx", () => {
    it("should call getLastTrx with the correct walletId", async () => {
      const walletId = "123";

      const getLastTrxStub = sinon.stub(balance, "getLastTrx");

      await balance.getTrx(walletId);

      expect(getLastTrxStub.calledOnceWithExactly(walletId)).to.be.true;
    });
  });
});
