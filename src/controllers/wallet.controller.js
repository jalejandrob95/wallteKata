const WalletService = require("../services/wallet.service");
const CustomError = require("../services/Error/errorHandler.service.js");
const walletService = new WalletService();

const get = async (req, res) => {
  try {
    const wallets = await walletService.get();
    if (!wallets || wallets.length === 0)
      throw new CustomError("Wallets not found", 404);
    return res.status(200).json({ message: "success", data: wallets });
  } catch (error) {
    return res.status(error.status || 500).json(error);
  }
};
const getById = async (req, res) => {
  try {
    res.status(200).json({ message: "Hello world" });
  } catch (error) {}
};
const create = async (req, res) => {
  try {
    res.status(200).json({ message: "Hello world" });
  } catch (error) {}
};
const updateOne = async (req, res) => {
  try {
    res.status(200).json({ message: "Hello world" });
  } catch (error) {}
};
const deleteOne = async (req, res) => {
  try {
    res.status(200).json({ message: "Hello world" });
  } catch (error) {}
};

module.exports = {
  get,
  getById,
  create,
  updateOne,
  deleteOne,
};
