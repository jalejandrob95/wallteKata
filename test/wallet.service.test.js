require("dotenv").config();
const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;
const CustomError = require("../src/services/Error/errorHandler.service");
const Wallet = require("../src/database/wallet");
const { connect } = require("../src/database/db");
const WalletService = require("../src/services/wallet.service");

describe("WalletService", () => {
  let sandbox;
  let walletService;

  before(async () => {
    await connect();
    sandbox = sinon.createSandbox();
    walletService = new WalletService();
  });

  after(() => {
    sandbox.restore();
  });

  describe("get", () => {
    afterEach(() => {
      sandbox.restore();
    });

    it("should return wallets when found", async () => {
      const wallets = [{ id: 1, email: "test@example.com" }];
      sandbox.stub(Wallet, "find").resolves(wallets);

      const result = await walletService.get();

      expect(result).to.deep.equal(wallets);
      expect(Wallet.find.calledOnce).to.be.true;
    });

    it("should throw CustomError when wallets not found", async () => {
      sandbox.stub(Wallet, "find").resolves([]);

      try {
        await walletService.get();
      } catch (error) {
        expect(error).to.be.an.instanceOf(CustomError);
        expect(error.message).to.equal("Wallets not found");
        expect(error.statusCode).to.equal(404);
      }
    });

    it("should return error when an exception occurs", async () => {
      const error = new Error("Internal Server Error");
      sandbox.stub(Wallet, "find").rejects(error);

      const result = await walletService.get();

      expect(result).to.equal(error);
    });
  });

  describe("getById", () => {
    afterEach(() => {
      sandbox.restore();
    });

    it("should return wallet when found", async () => {
      const wallet = { id: 1, email: "test@example.com" };
      const findByIdStub = sandbox.stub(Wallet, "findById").resolves(wallet);

      const result = await walletService.getById(1);

      expect(result).to.deep.equal(wallet);
      expect(findByIdStub.calledOnceWith(1)).to.be.true;
    });

    it("should throw CustomError when wallet not found", async () => {
      sandbox.stub(Wallet, "findById").resolves(null);

      try {
        await walletService.getById(1);
      } catch (error) {
        expect(error).to.be.an.instanceOf(CustomError);
        expect(error.message).to.equal("Wallet not found");
        expect(error.statusCode).to.equal(404);
      }
    });

    it("should return error when an exception occurs", async () => {
      const error = new Error("Internal Server Error");
      sandbox.stub(Wallet, "findById").rejects(error);

      const result = await walletService.getById(1);

      expect(result).to.equal(error);
    });
  });

  describe("create", () => {
    afterEach(() => {
      sandbox.restore();
    });

    it("should create a wallet", async () => {
      const walletData = {
        email: "test@example.com",
        currentAmount: {
          USD: 0,
          EUR: 0,
          ARS: 0,
        },
      };
      sandbox.stub(Wallet, "create").resolves(walletData);

      const result = await walletService.create("test@example.com");

      expect(result).to.deep.equal(walletData);
      expect(Wallet.create.calledOnceWith(walletData)).to.be.true;
    });

    it("should throw CustomError when wallet not created", async () => {
      sandbox.stub(Wallet, "create").resolves(null);

      try {
        await walletService.create("test@example.com");
      } catch (error) {
        expect(error).to.be.an.instanceOf(CustomError);
        expect(error.message).to.equal("Wallet not created");
        expect(error.statusCode).to.equal(500);
      }
    });

    it("should return error when an exception occurs", async () => {
      const error = new Error("Internal Server Error");
      sandbox.stub(Wallet, "create").rejects(error);

      const result = await walletService.create("test@example.com");

      expect(result).to.equal(error);
    });
  });

  describe("updateOne", () => {
    afterEach(() => {
      sandbox.restore();
    });

    it("should update wallet email", async () => {
      const wallet = { id: 1, email: "old@example.com" };
      const updateWallet = { id: 1, email: "new@example.com" };
      const findOneStub = sandbox.stub(Wallet, "findOne").resolves(null);
      const findByIdAndUpdateStub = sandbox
        .stub(Wallet, "findByIdAndUpdate")
        .resolves(updateWallet);

      const result = await walletService.updateOne(1, "new@example.com");

      expect(result).to.deep.equal(updateWallet);
      expect(findOneStub.calledOnceWith({ email: "new@example.com" })).to.be
        .true;
      expect(
        findByIdAndUpdateStub.calledOnceWith(1, {
          $set: { email: "new@example.com" },
        })
      ).to.be.true;
    });

    it("should throw CustomError when email already exists", async () => {
      const wallet = { id: 1, email: "old@example.com" };
      sandbox.stub(Wallet, "findOne").resolves(wallet);

      try {
        await walletService.updateOne(1, "old@example.com");
      } catch (error) {
        expect(error).to.be.an.instanceOf(CustomError);
        expect(error.message).to.equal("Email already exists");
        expect(error.statusCode).to.equal(400);
      }
    });

    it("should return error when an exception occurs", async () => {
      const error = new Error("Internal Server Error");
      sandbox.stub(Wallet, "findOne").rejects(error);

      const result = await walletService.updateOne(1, "new@example.com");

      expect(result).to.equal(error);
    });
  });

  describe("deleteOne", () => {
    afterEach(() => {
      sandbox.restore();
    });

    it("should delete a wallet", async () => {
      const wallet = { id: 1, email: "test@example.com" };
      sandbox.stub(Wallet, "findById").resolves(wallet);
      sandbox.stub(Wallet, "findByIdAndDelete").resolves(wallet);

      const result = await walletService.deleteOne(1);

      expect(result).to.deep.equal(wallet);
      expect(Wallet.findById.calledOnceWith(1)).to.be.true;
      expect(Wallet.findByIdAndDelete.calledOnceWith(1)).to.be.true;
    });

    it("should throw CustomError when wallet not found", async () => {
      sandbox.stub(Wallet, "findById").resolves(null);

      try {
        await walletService.deleteOne(1);
      } catch (error) {
        expect(error).to.be.an.instanceOf(CustomError);
        expect(error.message).to.equal("Wallet not found");
        expect(error.statusCode).to.equal(404);
      }
    });

    it("should return error when an exception occurs", async () => {
      const error = new Error("Internal Server Error");
      sandbox.stub(Wallet, "findById").rejects(error);

      const result = await walletService.deleteOne(1);

      expect(result).to.equal(error);
    });
  });
});
