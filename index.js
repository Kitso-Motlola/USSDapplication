// Libraries:
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Database URL:
const database_url = 'mongodb+srv://user:password@cluster0.qnb0r.mongodb.net/Database?retryWrites=true&w=majority';

// Mongoose Models:
const user = require('./models/user')
const driver = require('./models/driver')
const transaction = require('./models/transaction')


//Express app
const app = express();
const PORT = 8000

var charge = 0; // holds taxi fare

// Establish connection to database:
mongoose.connect(database_url);
const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err)
})
db.once('open', () => {
    console.log('Database connection successful.')
})


//Body parser; Adapted from Javascript King, url: https://www.youtube.com/watch?v=qijcCcM4XfU&t=335s
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Successful implementation.")

});

app.post('/', (req, res) => {
    const { phoneNumber, text, sessionId } = req.body;
    let response;
    let array = text.split('*');

    if (array[0] === '') { // First menu
        response = 'CON Welcome, please select the service you would like to use:\n 1. Use Taxi Service. \n 2. Register for taxi service.\n 3. Account Details.\n'
        charge = 0;
    }

    //************************************************************************ USE TAXI SERVICES ***********************************************************************************:

    else if ((array[0] === '1') && (array.length === 1)) {

        user.countDocuments({ phoneNumber: phoneNumber }, function (err, data) {
            if (err) {
                console.log(err);
                response = 'END Network error, please try again later. \n';
            }
            else {
                console.log(data);
                if (data > 0) {
                    response = 'CON Please select your destination:\n 1. Stellenbosch Central \n 2. Idasvalley \n 3. Cloetesville \n'; // user registered.                
                }
                else {
                    response = 'END You may not be a registered user. \n'; // user not registered throw ERROR!!!
                }
            }
        })
    }
    //_____________ Chosen destination __________________:

    else if ((array[0] === '1') && (array[1] === '1') && (array.length === 2)) {
        response = 'CON A fare of 10 rands will be charged to your account:\n 1. Pay\n 2. Cancel payment';
        charge = 10;
    }
    else if ((array[0] === '1') && (array[1] === '2') && (array.length === 2)) {
        response = 'CON A fare of 20 rands will be charged to your account:\n 1. Pay\n 2. Cancel payment';
        charge = 20;
    }
    else if ((array[0] === '1') && (array[1] === '3') && (array.length === 2)) {
        response = 'CON A fare of 25 rands will be charged to your account:\n 1. Pay\n 2. Cancel payment';
        charge = 25;
    }

    //_____________________ Pays ________________:

    else if ((array[0] === '1') && (array[1] === '1') && (array[2] === '1') && (array.length === 3)) {

        user.findOne({ phoneNumber: phoneNumber }, function (err, data) {
            if (err) {
                console.log("Error completing payment: " + err);
            }
            else {
                var balance = data.Acc_balance;
                balance = balance - charge;
                user.findOneAndUpdate({ phoneNumber: phoneNumber }, { $set: { Acc_balance: balance } }, function (err) {
                    if (err) {
                        console.log("Error completing payment :" + err);
                        response = 'END Payment could not be completed. Try again later. \n'; // throw error.

                    }
                    else {
                        response = 'END Thank you for using our service. \n'; // payment completing 
                        //record transaction:  

                        let pay = new transaction();
                        pay.type = 'payment';
                        pay.source = phoneNumber;
                        pay.recipient = 'test_taxi';
                        pay.amount = charge;
                        //Get date
                        var now = new Date();
                        var datum = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
                        var time = now.getHours() + ":" + now.getSeconds();
                        pay.date = datum;
                        pay.time = time;
                        pay.save(function (err, data) {
                            if (err) {
                                console.log("Error saving transaction record: " + err);
                            }
                            else {
                                console.log("transaction recorded");
                            }
                        })

                    }
                })
            }
        })
    }
    else if ((array[0] === '1') && (array[1] === '2') && (array[2] === '1') && (array.length === 3)) {

        user.findOne({ phoneNumber: phoneNumber }, function (err, data) {
            if (err) {
                console.log("Error completing payment: " + err);
            }
            else {
                var balance = data.Acc_balance;
                balance = balance - charge;
                user.findOneAndUpdate({ phoneNumber: phoneNumber }, { $set: { Acc_balance: balance } }, function (err) {
                    if (err) {
                        console.log("Error completing payment :" + err);
                        response = 'END Payment could not be completed. Try again later. \n'; // throw error.

                    }
                    else {
                        response = 'END Thank you for using our service. \n'; // payment completing 
                        //record transaction:  

                        let pay = new transaction();
                        pay.type = 'payment';
                        pay.source = phoneNumber;
                        pay.recipient = 'test_taxi';
                        pay.amount = charge;
                        //Get date
                        var now = new Date();
                        var datum = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
                        var time = now.getHours() + ":" + now.getSeconds();
                        pay.date = datum;
                        pay.time = time;
                        pay.save(function (err, data) {
                            if (err) {
                                console.log("Error saving transaction record: " + err);
                            }
                            else {
                                console.log("transaction recorded");
                            }
                        })

                    }
                })
            }
        })
    }
    else if ((array[0] === '1') && (array[1] === '3') && (array[2] === '1') && (array.length === 3)) {

        user.findOne({ phoneNumber: phoneNumber }, function (err, data) {
            if (err) {
                console.log("Error completing payment: " + err);
            }
            else {
                var balance = data.Acc_balance;
                balance = balance - charge;
                user.findOneAndUpdate({ phoneNumber: phoneNumber }, { $set: { Acc_balance: balance } }, function (err) {
                    if (err) {
                        console.log("Error completing payment :" + err);
                        response = 'END Payment could not be completed. Try again later. \n'; // throw error.

                    }
                    else {
                        response = 'END Thank you for using our service. \n'; // payment completing 
                        //record transaction:  

                        let pay = new transaction();
                        pay.type = 'payment';
                        pay.source = phoneNumber;
                        pay.recipient = 'test_taxi';
                        pay.amount = charge;
                        //Get date
                        var now = new Date();
                        var datum = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
                        var time = now.getHours() + ":" + now.getSeconds();
                        pay.date = datum;
                        pay.time = time;
                        pay.save(function (err, data) {
                            if (err) {
                                console.log("Error saving transaction record: " + err);
                            }
                            else {
                                console.log("transaction recorded");
                            }
                        })

                    }
                })
            }
        })
    }

    //_________________ Cancels _______________:

    else if ((array[0] === '1') && (array[1] === '1') && (array[2] === '2') && (array.length === 3)) {
        response = 'END Please disembark Taxi or restart the service. Thank you.';

    }
    else if ((array[0] === '1') && (array[1] === '2') && (array[2] === '2') && (array.length === 3)) {
        response = 'END Please disembark Taxi or restart the service. Thank you.';

    }
    else if ((array[0] === '1') && (array[1] === '3') && (array[2] === '2') && (array.length === 3)) {
        response = 'END Please disembark Taxi or restart the service. Thank you.';

    }

    //************************************************************************ REGISTER ***********************************************************************************:

    else if ((array[0] === '2') && (array.length === 1)) {
        user.countDocuments({ phoneNumber: phoneNumber }, function (err, data) {
            if (err) {
                console.log(err);
                response = 'END Network error, please try again later. \n';
            }
            else {
                console.log(data);
                if (data == 0) {
                    response = 'CON Please enter your South African ID number:\n'; // register user.                
                }
                else {
                    response = 'END User already registered. \n'; // user already registered throw ERROR!!!
                }
            }
        })
    }
    else if ((array[0] === '2') && (array[1] != '') && (array.length === 2)) {
        response = 'CON Please enter your full name:\n';
    }
    else if ((array[0] === '2') && (array[2] != '') && (array.length === 3)) {
        response = 'CON Please input your WiFi MAC address:'
    }
    else if ((array[0] === '2') && (array[3] != '') && (array.length === 4)) {
        response = 'CON Please input your Bluetooth MAC address:'
    }
    else if ((array[0] === '2') && (array[4] != '') && (array.length === 5)) {
        response = 'CON An account will be setup in your name:\n 1. Proceed.\n 2. Terminate process.\n';
    }
    else if ((array[0] === '2') && (array[5] === '1') && (array.length === 6)) {
        let data = new user();
        data.id_number = array[1];
        data.fullname = array[2];
        data.phoneNumber = phoneNumber;
        data.WiFi_MAC_addrs = array[3];
        data.Bluetooth_MAC_addrs = array[4];
        data.Acc_balance = 0;
        data.save(function (err, data) {
            if (err) {
                console.log("Error saving data: " + err);
                response = 'END User NOT registered, please try again later. \n'; // could not save data.
            }
            else {
                response = 'END registration successful.'; // successful registration.
            }
        })
    }
    else if ((array[0] === '2') && (array[5] === '2') && (array.length === 6)) {
        response = 'END registration process terminated.'; // user terminated registration.
    }

    //************************************************************************ ACCOUNT DETAILS ***********************************************************************************:
    else if ((array[0] === '3') && (array.length === 1)) {
        user.countDocuments({ phoneNumber: phoneNumber }, function (err, data) {
            if (err) {
                console.log(err);
                response = 'END Network error, please try again later. \n';
            }
            else {
                console.log(data);
                if (data > 0) {
                    response = 'CON Please select the menu item you would like to review:\n 1. Account Balance.\n 2. View Transactions.\n'; // user is registered.                
                }
                else {
                    response = 'END You may not be a registered user. \n'; // user not registered throw ERROR!!!
                }
            }
        })
    }
    else if ((array[0] === '3') && (array[1] === '1') && (array.length === 2)) {
        user.findOne({ phoneNumber: phoneNumber }, function (err, data) {
            if (err) {
                console.log("Error retrieving balance: " + err);
                response = 'END Network error, please try again later.';
            }
            else {
                console.log('Balance successfully retrieved');
                if (parseInt(data.Acc_balance) < 0) {
                    var temp = parseInt(data.Acc_balance) * -1;
                    response = 'END Virtual-wallet balance: R - ' + temp + ',00. \n';
                }
                else {
                    response = 'END Virtual-wallet balance: R' + data.Acc_balance + ',00. \n';
                }


            }
        })

    }
    else if ((array[0] === '3') && (array[1] === '2') && (array.length === 2)) {
        response = 'CON Which kind of payments would you like to review:\n 1. In going\n 2. Out going \n';
    }
    else if ((array[0] === '3') && (array[1] === '2')&& (array[2] === '1') && (array.length === 3)) {
        response = 'END Still under development \n';
    }
    else if ((array[0] === '3') && (array[1] === '2')&& (array[2] === '2') && (array.length === 3)) {
        response = 'END Still under development \n';
    }



    setTimeout(() => {
        res.send(response);
        res.end
    }, 3000);
})

app.listen(PORT, () => {
    console.log('application running on port ' + PORT)
})