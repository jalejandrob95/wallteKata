const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  email: { type: String, required: true },
  currentAmount: { type: Object, required: true },
  createAt: { type: Date, default: Date.now },
});
const Wallet = mongoose.model("Wallet", WalletSchema);
module.exports = Wallet;
