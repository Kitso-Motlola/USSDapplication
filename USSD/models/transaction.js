const mongoose = require('mongoose');
const transactionSchema = mongoose.Schema({
    type: { type: String, required : true},
    source: { type: String, required : true},
    recipient: { type: String, required : true},
    amount: { type: Number, required : true},
    date: { type: Date, required : true},
})

const transaction = mongoose.model('transaction',transactionSchema);
module.exports = transaction;