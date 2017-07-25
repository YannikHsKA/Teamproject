var express = require("express");
var app = express();
var path = require('path');
var client = require('twilio')('ACc4221e14d1d0540a89ec756b685ae93b','1b5bbdebb51c9059ef3dd8ddb5db2a1b');
var admin = require("firebase-admin");
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var oauth = require('xoauth2');
var smtpTransport = require('nodemailer-smtp-transport');

var smtpTransport = nodemailer.createTransport(smtpTransport({
  service: "Gmail",
    auth:
    {
    user : "lidlsmartshopping@gmail.com",
    pass :  "lidlsmartshopping123",
  }
}));

var mailOptions = {
  from: "lidlsmartshopping@gmail.com",
  to: "domenik.fox@gmail.com",
  subject: "Willkommen bei LIDL Smart Shopping!",
  generateTextFromHTML: true,
  html: "<b>Hallo!</b> Dein Verification Key lautet"
};


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var serviceAccount = require("./firebasekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lidl-smart.firebaseio.com"
});



/* serves main page */
app.get("/", function(req, res) {
   res.sendfile(path.resolve('../frontend/index.html'))
});


/* DEPRECATED!!! Normal SMS Sending */
app.get("/send", function(req, res) {
   client.sendMessage({
     to: '+4915787295695',
     from: '+4915735984837',
     body: 'Hello World'
   }, function(err, data){
     if(err){
       console.log(err);
     }
     else{
       console.log(data);
     }
   });
   res.status(200).send("Success");
});


/* Subscribe to the App */
app.post("/subscribe", function(req, res)
{
  /* Read POST Request */
  var body = req.body;
  console.log(body);
  var phonenumber = body.number;

  /* Save Number into Firebase */
  var db = admin.database();
  var ref = db.ref("user");

  /* Generate Random setting_key */
  var settingkey1 = Math.random() * (90000 - 10000) + 10000;
  var settingkey2 = Math.floor(settingkey1);

  /* Write User into Firebase */
  ref.update(
  {
    [phonenumber]:
    {
      Whatsapp: 0,
      SMS: 1,
      setting_key : settingkey2
    }
  });


/*Send Notification Email with Setting Key and Voucher */
  smtpTransport.sendMail(mailOptions, function(error, response){
    if (error) {
       console.log(error);
     } else {
       console.log(response);
     }
     smtpTransport.close();
   });


/* Send Notification SMS with Settingkey and Voucher */
   client.sendMessage({
     to: phonenumber,
     from: '+4915735984837',
     body: "Willkommen bei LIDL Smart Shopping!!! Dein Setting Key lautet... " + settingkey2 + " Viel Erfolg "
   }, function(err, data){
     if(err){
       console.log(err);
       res.status(500).send("Failure");
     }
     else{
       console.log("Success!");
       console.log(data);
       res.status(200).send("Success");
     }
   });

 });

/* Start Server */
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
