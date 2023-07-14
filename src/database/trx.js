const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  walletId: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet" },
  amount: { type: Number },
  currency: { type: String, enum: ["USD", "EUR", "ARS"] },
  sourceCurrency: { type: String, enum: ["USD", "EUR", "ARS"] },
  targetCurrency: { type: String, enum: ["USD", "EUR", "ARS"] },
  type: {
    type: String,
    enum: ["deposit", "exchange", "withdraw"],
  },
  createAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
