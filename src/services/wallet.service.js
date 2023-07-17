const CustomError = require("./Error/errorHandler.service");
const Wallet = require("../database/wallet");

class WalletService {
  constructor() {
    this.wallet = Wallet;
  }

  async get() {
    try {
      const wallets = await this.wallet.find();

      if (!wallets || wallets.length === 0)
        throw new CustomError("Wallets not found", 404);

      return wallets;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const wallet = await this.wallet.findById(id);

      if (!wallet) throw new CustomError("Wallet not found", 404);

      return wallet;
    } catch (error) {
      return error;
    }
  }

  async create(email) {
    try {
      const wallet = await this.wallet.create({
        email,
        currentAmount: {
          USD: 0,
          EUR: 0,
          ARS: 0,
        },
      });

      if (!wallet) throw new CustomError("Wallet not created", 500);

      return wallet;
    } catch (error) {
      return error;
    }
  }

  async updateOne(id, email) {
    try {
      const updateEmail = {};
      const findEmail = await this.wallet.findOne({ email });

      if (findEmail) throw new CustomError("Email already exists", 400);

      if (email) updateEmail.email = email;
      const updateWallet = await this.wallet.findByIdAndUpdate(id, {
        $set: updateEmail,
      });

      if (!updateWallet) throw new CustomError("Wallet not updated", 500);

      return updateWallet;
    } catch (error) {
      return error;
    }
  }

  async deleteOne(id) {
    try {
      const findWallet = await this.wallet.findById(id);

      if (!findWallet) throw new CustomError("Wallet not found", 404);

      const deleteWallet = await this.wallet.findByIdAndDelete(id);

      if (!deleteWallet) throw new CustomError("Wallet not deleted", 500);

      return deleteWallet;
    } catch (error) {
      return error;
    }
  }
}

module.exports = WalletService;
