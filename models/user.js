const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    fullname: { type: String, required : true},
    phoneNumber: { type: String, unique : true, required : true},
    WiFi_MAC_addrs: { type: String, unique : true},
    Bluetooth_MAC_addrs: { type: String, unique : true},
    Acc_balance: { type: Number, required : true}
})

const User = mongoose.model('User',userSchema);
module.exports = User;