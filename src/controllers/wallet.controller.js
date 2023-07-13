const WalletService = require("../services/wallet.service");
const CustomError = require("../services/Error/errorHandler.service.js");
const walletService = new WalletService();

const get = async (req, res) => {
  try {
    const wallets = await walletService.get();
    if (wallets.status != 200)
      throw new CustomError(wallets.message, wallets.status);
    return res.status(200).json({ message: "success", data: wallets });
  } catch (error) {
    return res.status(error.status || 500).json(error);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const wallet = await walletService.getById(id);
    if (wallet.status != 200)
      throw new CustomError(wallet.message, wallet.status);
    res.status(200).json({ message: "success", data: wallet });
  } catch (error) {
    return res.status(error.status || 500).json(error);
  }
};
const create = async (req, res) => {
  try {
    const { email } = req.body;
    const wallet = await walletService.create(email);
    if (wallet.status != 200)
      throw new CustomError(wallet.message, wallet.status);
    res.status(200).json({ message: "success", data: wallet });
  } catch (error) {}
};
const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const wallet = await walletService.updateOne(id, email);
    if (wallet.status != 200)
      throw new CustomError(wallet.message, wallet.status);
    res.status(200).json({ message: "success", data: wallet });
  } catch (error) {
    return res.status(error.status || 500).json(error);
  }
};
const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const wallet = await walletService.deleteOne(id);
    if (!wallet) throw new CustomError("Wallet not deleted", 500);
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
