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

//______________________________________________ Initial menu : __________________________________________________________________

    if(array[0]===''){
        response = 'CON Welcome, please select the Drivers service you would like to use:\n 1 . Register.\n';
    }

//______________________________________________ Registration : ___________________________________________________________________

    else if((array[0]==='1')&&(array.length===1)){
        response = 'CON Please enter your fullname:\n';
    }
    else if((array[0]==='1')&&(array[1]!='')&&(array.length===2)){
        response = 'CON Please enter your SA ID number:\n';
    }
    else if((array[0]==='1')&&(array[2]!='')&&(array.length===3)){
        response = 'CON Please enter your vehicle registration number:\n';
    }
    else if((array[0]==='1')&&(array[3]!='')&&(array.length===4)){
        response = 'CON Please enter your taxi code as shown on your edge device:\n';
    }
    else if((array[0]==='1')&&(array[4]!='')&&(array.length===5)){
        let data = new driver();
        data.id_number = array[2];
        data.fullname = array[1];
        data.phoneNumber = phoneNumber;
        data.Vehicle_Reg_No = array[3];
        data.Taxi_Code = array[4];
        data.Acc_balance = 0;
        // save data
        data.save(function(err){
            if(err){
                console.log("Error saving data: " + err);
                response = 'END Network error, please try again later. \n';
            }
            else{
                response = 'END Data successfully saved. \n';
            }
        })
    }

    setTimeout(() => {
        res.send(response);
        res.end
    }, 3000);
});


app.listen(PORT, () => {
    console.log('application running on port ' + PORT)
})