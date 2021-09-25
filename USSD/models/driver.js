const mongoose = require('mongoose');
const driverSchema = mongoose.Schema({
    id_number: { type: String, unique : true, required : true},
    fullname: String,
    phoneNumber: String,
    Vehicle_Reg_No: String,
    Taxi_Code: String,
    Acc_balance: Number
})

const driver = mongoose.model('driver',driverSchema);
module.exports = driver;