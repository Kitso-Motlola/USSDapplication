// Libraries:
const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Database URL:
const database_url = 'mongodb+srv://user:password@cluster0.qnb0r.mongodb.net/Database?retryWrites=true&w=majority';

// Mongoose Models:
const user = require('./models/user');
const driver = require('./models/driver');
const transaction = require('./models/transaction');

// Establish connecvtion to database:
mongoose.connect(database_url);
const db = mongoose.connection;
db.on('error',(err)=>{
    console.log(err)
});
db.once('open',()=>{
    console.log('Database connection successful.')
});


var client = new user({id_number: "6902295412082" ,fullname: "Ashley Prowse", phoneNumber: "+27766831385", WiFi_MAC_addrs:"1B:12:C1:38:A9:F3", Bluetooth_MAC_addrs: "10:71:B2:F3:8F:A1", Acc_balance: "760"});

client.save(function(err,data){
    if(err){
        console.log("Data not saved, error detected:"+ err);
    }
    else{
        console.log("Data successfully saved.");
    }
});




