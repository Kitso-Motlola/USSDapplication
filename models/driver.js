const mongoose = require('mongoose');
const driverSchema = mongoose.Schema({
    id_number: { type: String, unique : true, required : true},
    fullname: { type: String,  required : true},
    phoneNumber: { type: String, unique : true, required : true},
    Vehicle_Reg_No: { type: String, unique : true, required : true},
    Taxi_Code: { type: String, unique : true, required : true}, // ties edge device with driver
    Acc_balance: { type: Number, required : true}
})

const driver = mongoose.model('driver',driverSchema);
module.exports = driver;