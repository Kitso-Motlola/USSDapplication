// Libraries:
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Database URL:
const database_url = 'mongodb+srv://Kitso:Sun19971214@cluster0.qnb0r.mongodb.net/TaxiService?retryWrites=true&w=majority';

// Mongoose Models:
const user = require('./models/user')
const driver = require('./models/driver')
const transaction = require('./models/transaction')


//Express app
const app = express();
const PORT = 8000

// Establish connecvtion to database:
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
    var charge = 0;

    let response;
    let array = text.split('*');

    if (array[0] === '') { // First menu
        response = 'CON Welcome, please select the service you would like to use:\n 1. Use Taxi Service. \n 2. Register for taxi service.\n 3. Account Details.\n'
    }

    //************************************************************************ USE TAXI SERVICES ***********************************************************************************:

    else if ((array[0] === '1') && (array.length === 1)) {
        var validation = false;
        //retrieve location destinations
        user.countDocuments({phoneNumber:phoneNumber},function(err,data){
            if(err){
                console.log(err);
                response = 'END Network error, please try again later. \n';
            }
            else{
                console.log(data);
                if(data>0){
                    validation = true;
                }
            }
        })
        // Check whether user is registered
        if (validation) {
            response = 'CON Please select your destination:\n 1. Stellenbosch Central \n 2. Idasvalley \n 3. Cloetesville \n'; // return possible destinations
        }
        else {
            response = 'END You may not be a registered user. \n';
        }
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
        response = 'END Thank you for using our service.';
    }
    else if ((array[0] === '1') && (array[1] === '2') && (array[2] === '1') && (array.length === 3)) {
        response = 'END Thank you for using our service.';
    }
    else if ((array[0] === '1') && (array[1] === '3') && (array[2] === '1') && (array.length === 3)) {
        response = 'END Thank you for using our service.';
    }

    //_________________ Cancels _______________:

    else if ((array[0] === '1') && (array[1] === '1') && (array[2] === '2') && (array.length === 3)) {
        response = 'END Please disembark Taxi or restart the service. Thank you.';
        charge = 0;
    }
    else if ((array[0] === '1') && (array[1] === '2') && (array[2] === '2') && (array.length === 3)) {
        response = 'END Please disembark Taxi or restart the service. Thank you.';
        charge = 0;
    }
    else if ((array[0] === '1') && (array[1] === '3') && (array[2] === '2') && (array.length === 3)) {
        response = 'END Please disembark Taxi or restart the service. Thank you.';
        charge = 0;
    }

    //************************************************************************ REGISTER ***********************************************************************************:

    else if ((array[0] === '2') && (array.length === 1)) {
        response = 'CON Please enter your South African ID number:\n';
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

        data.save(() => {
            response = 'END registration successful.';
        })
    }
    else if ((array[0] === '2') && (array[5] === '2') && (array.length === 6)) {
        response = 'END registration process terminated.';
    }

    //************************************************************************ ACCOUNT DETAILS ***********************************************************************************:



    setTimeout(() => {
        res.send(response);
        res.end
    }, 3000);
})

app.listen(PORT, () => {
    console.log('application running on port ' + PORT)
})