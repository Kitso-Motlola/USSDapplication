const mongoose = require('mongoose');
const transactionSchema = mongoose.Schema({
    type: String,
    source: String,
    recipient: String,
    amount: Number,
    date: Date,
})

const transaction = mongoose.model('transaction',transactionSchema);
module.exports = transaction;