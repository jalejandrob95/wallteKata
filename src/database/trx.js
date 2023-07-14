const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  walletId: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet" },
  amount: { type: Number, required: true },
  currency: { type: String, required: true, enum: ["USD", "EUR", "ARS"] },
  type: {
    type: String,
    required: true,
    enum: ["deposit", "exchange", "withdraw"],
  },
  createAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
