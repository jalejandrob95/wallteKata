const CustomError = require("./Error/errorHandler.service");
const Wallet = require("../database/wallet");

class WalletService {
  constructor() {
    this.wallet = Wallet;
  }
  async get() {
    try {
      const wallets = await this.wallet.find();
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
      console.error(error);
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
      console.error(error);
    }
  }
  async updateOne(id, email) {
    try {
      const updateEmail = {};
      const findEmail = await this.wallet.findOne({ email });
      if (findEmail) throw new Error("Email already exists");
      if (email) updateEmail.email = email;
      const updateWallet = await this.wallet.findByIdAndUpdate(id, {
        $set: updateEmail,
      });
      if (!updateWallet) throw new CustomError("Wallet not updated");
      return updateWallet;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = WalletService;
